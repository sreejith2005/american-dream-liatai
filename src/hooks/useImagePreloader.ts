/**
 * useImagePreloader.ts
 *
 * Two-phase singleton preloader:
 *   Phase 1 — startCriticalPreload(): loads frames 1–86 (Clip 1) in batches of 20.
 *   Phase 2 — startPreload():         loads all 428 frames in batches of 30.
 *
 * Both are triggered from HeroSection on mount so frames are ready
 * long before the user reaches Section 3.
 *
 * Frames are stored in a module-level array so any component can access them
 * without re-fetching.  No ScrollTrigger.refresh() is ever called.
 */

import { useState, useEffect } from 'react'

// ── Frame config ────────────────────────────────────────────────────────────
export const TOTAL_FRAMES = 428
const CRITICAL_FRAMES = 86 // Clip 1 (Entry) — first 86 frames
const BASE_PATH = '/assets/section3frames'
const BATCH_SIZE = 30
const CRITICAL_BATCH_SIZE = 20

export function getFramePath(frameNumber: number): string {
  const padded = String(frameNumber).padStart(3, '0')
  return `${BASE_PATH}/${padded}.jpg`
}

// ── Module-level singleton state ────────────────────────────────────────────

const _images: HTMLImageElement[] = new Array(TOTAL_FRAMES)
let _loadedCount = 0
let _isReady = false
let _started = false
let _criticalStarted = false
let _criticalResolve: (() => void) | null = null
let _criticalPromise: Promise<void> | null = null
const _listeners = new Set<() => void>()

function notifyListeners() {
  _listeners.forEach((fn) => fn())
}

/** Load a single image — always resolves (errors counted, never hangs) */
function loadSingleImage(index: number): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = getFramePath(index + 1) // frames are 1-indexed
    const onDone = () => {
      _images[index] = img
      _loadedCount++
      if (_loadedCount === TOTAL_FRAMES) {
        _isReady = true
      }
      notifyListeners()
      resolve()
    }
    img.onload = onDone
    img.onerror = onDone
  })
}

/**
 * Phase 1 — Load only the first 86 frames (Clip 1: Entry) in batches of 20.
 * Returns a promise that resolves when all critical frames are loaded.
 * Safe to call multiple times — only runs once.
 */
export function startCriticalPreload(): Promise<void> {
  if (_criticalStarted) return _criticalPromise!
  _criticalStarted = true

  _criticalPromise = (async () => {
    for (let batchStart = 0; batchStart < CRITICAL_FRAMES; batchStart += CRITICAL_BATCH_SIZE) {
      const batchEnd = Math.min(batchStart + CRITICAL_BATCH_SIZE, CRITICAL_FRAMES)
      const batch: Promise<void>[] = []
      for (let i = batchStart; i < batchEnd; i++) {
        batch.push(loadSingleImage(i))
      }
      await Promise.all(batch)
    }
    _criticalResolve?.()
  })()

  return _criticalPromise
}

/**
 * Phase 2 — Load all 428 frames in batches of 30.
 * Safe to call multiple times — only runs once.
 * Skips frames already loaded by startCriticalPreload().
 * Does NOT call ScrollTrigger.refresh().
 */
export async function startPreload(): Promise<void> {
  if (_started) return
  _started = true

  for (let batchStart = 0; batchStart < TOTAL_FRAMES; batchStart += BATCH_SIZE) {
    const batchEnd = Math.min(batchStart + BATCH_SIZE, TOTAL_FRAMES)
    const batch: Promise<void>[] = []
    for (let i = batchStart; i < batchEnd; i++) {
      // Skip frames already loaded by critical preload
      if (_images[i]?.complete) continue
      batch.push(loadSingleImage(i))
    }
    if (batch.length > 0) await Promise.all(batch)
  }
}

/**
 * Get the module-level images array.
 * Entries may be undefined until loading completes.
 */
export function getPreloadedImages(): HTMLImageElement[] {
  return _images
}

// ── React hook ──────────────────────────────────────────────────────────────

interface PreloaderHookResult {
  /** 0–100 */
  loadingProgress: number
  isReady: boolean
}

export function useImagePreloader(): PreloaderHookResult {
  const [, forceRender] = useState(0)

  useEffect(() => {
    const listener = () => forceRender((n) => n + 1)
    _listeners.add(listener)

    // If already finished, trigger a re-render so consumer sees isReady=true
    listener()

    return () => {
      _listeners.delete(listener)
    }
  }, [])

  return {
    loadingProgress: Math.round((_loadedCount / TOTAL_FRAMES) * 100),
    isReady: _isReady,
  }
}

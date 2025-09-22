// Minimal in-memory store to avoid external deps.
export interface AppState {
    count: number
}

type Listener = (state: AppState) => void

const state: AppState = { count: 0 }
const listeners: Set<Listener> = new Set()

export function getState(): AppState {
    return { ...state }
}

export function subscribe(listener: Listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

function notify() {
    for (const l of listeners) l(getState())
}

export function inc() {
    state.count += 1
    notify()
}

export function dec() {
    state.count -= 1
    notify()
}

'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { increment, decrement, incrementByAmount, reset } from '@/store/counterSlice'

export function CounterDemo() {
    const count = useAppSelector((state) => state.counter.count)
    const dispatch = useAppDispatch()

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Redux Counter Demo</h2>

            <div className="text-center mb-6">
                <span className="text-4xl font-bold text-blue-600">{count}</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
                <button onClick={() => dispatch(increment())} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    +1
                </button>

                <button onClick={() => dispatch(decrement())} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    -1
                </button>

                <button onClick={() => dispatch(incrementByAmount(5))} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    +5
                </button>

                <button onClick={() => dispatch(reset())} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                    Reset
                </button>
            </div>
        </div>
    )
}

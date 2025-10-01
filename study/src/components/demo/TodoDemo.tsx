'use client'

import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addTodo, toggleTodo, removeTodo, setFilter, clearCompleted } from '@/store/todoSlice'

export function TodoDemo() {
    const [inputText, setInputText] = useState('')

    // Lấy state từ Redux
    const { todos, filter } = useAppSelector((state) => state.todo)
    const dispatch = useAppDispatch()

    // Xử lý thêm todo
    const handleAddTodo = () => {
        if (inputText.trim()) {
            dispatch(addTodo({ text: inputText.trim() }))
            setInputText('')
        }
    }

    // Lọc todos theo filter
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
    })

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Redux Todo Demo</h2>

            {/* Input thêm todo */}
            <div className="flex gap-2 mb-4">
                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()} className="flex-1 px-3 py-2 border rounded" placeholder="Add todo..." />
                <button onClick={handleAddTodo} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Add
                </button>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2 mb-4">
                {(['all', 'active', 'completed'] as const).map((filterOption) => (
                    <button key={filterOption} onClick={() => dispatch(setFilter(filterOption))} className={`px-3 py-1 rounded text-sm ${filter === filterOption ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                        {filterOption}
                    </button>
                ))}
            </div>

            {/* Todo list */}
            <div className="space-y-2 mb-4">
                {filteredTodos.map((todo) => (
                    <div key={todo.id} className="flex items-center gap-2 p-2 border rounded">
                        <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id))} />
                        <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.text}</span>
                        <button onClick={() => dispatch(removeTodo(todo.id))} className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Clear completed */}
            <button onClick={() => dispatch(clearCompleted())} className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Clear Completed ({todos.filter((t) => t.completed).length})
            </button>

            <div className="mt-4 text-center text-sm text-gray-600">
                Total: {todos.length} | Active: {todos.filter((t) => !t.completed).length}
            </div>
        </div>
    )
}

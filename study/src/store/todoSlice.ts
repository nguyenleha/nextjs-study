import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 1. Định nghĩa types
interface Todo {
    id: string
    text: string
    completed: boolean
}

interface TodoState {
    todos: Todo[]
    filter: 'all' | 'active' | 'completed'
}

// 2. State ban đầu
const initialState: TodoState = {
    todos: [],
    filter: 'all',
}

// 3. Tạo slice
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // Action không có payload
        clearCompleted: (state) => {
            state.todos = state.todos.filter((todo) => !todo.completed)
        },

        // Action có payload đơn giản
        setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
            state.filter = action.payload
        },

        // Action có payload phức tạp
        addTodo: (state, action: PayloadAction<{ text: string }>) => {
            const newTodo: Todo = {
                id: Date.now().toString(),
                text: action.payload.text,
                completed: false,
            }
            state.todos.push(newTodo)
        },

        // Action với id
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find((todo) => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },

        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
    },
})

// 4. Export actions và reducer
export const { addTodo, toggleTodo, removeTodo, clearCompleted, setFilter } = todoSlice.actions
export default todoSlice.reducer

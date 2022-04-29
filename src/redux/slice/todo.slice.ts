// Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITodo {
	id: number
	title: string
	isCompleted: boolean
}

export interface ITodoState {
	todo_isLoading: boolean
	todo_list: ITodo[]
}

const initialState: ITodoState = {
	todo_isLoading: false,
	todo_list: [
		{
			id: 1,
			title: 'Learn React',
			isCompleted: false
		}
	]
}

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		todo_SET_LOADING: (state, action: PayloadAction<boolean>) => {
			state.todo_isLoading = action.payload
		},
		todo_SET_TODO: (state, action: PayloadAction<string>) => {
			state.todo_list = [
				...state.todo_list,
				{ id: Math.random(), title: action.payload, isCompleted: false }
			]
		}
	}
})

// Actions creator are generated for each case reducer function
export const { todo_SET_LOADING, todo_SET_TODO } = todoSlice.actions

export default todoSlice.reducer

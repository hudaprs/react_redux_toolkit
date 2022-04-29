// Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Interface
import { ITodoState } from '../interface/todo.interface'

// Api
import {
	todo_create,
	todo_delete,
	todo_fetchList,
	todo_update
} from '../api/todo.api'

const initialState: ITodoState = {
	todo_isLoading: false,
	todo_list: []
}

const todo = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		todo_SET_LOADING: (state, { payload }: PayloadAction<boolean>) => {
			state.todo_isLoading = payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(todo_fetchList.fulfilled, (state, { payload }) => {
				state.todo_list = payload
			})
			.addCase(todo_create.fulfilled, (state, { payload }) => {
				state.todo_list = [...state.todo_list, payload]
			})
			.addCase(todo_update.fulfilled, (state, { payload }) => {
				state.todo_list = state.todo_list.map(todo =>
					todo.id === payload.id ? payload : todo
				)
			})
			.addCase(todo_delete.fulfilled, (state, { payload }) => {
				state.todo_list = state.todo_list.filter(todo => todo.id !== payload)
			})
	}
})

export const { todo_SET_LOADING } = todo.actions

export default todo.reducer

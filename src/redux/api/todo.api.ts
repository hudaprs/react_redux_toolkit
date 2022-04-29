// Redux Toolkit
import { createAsyncThunk } from '@reduxjs/toolkit'

// Interface
import { ITodo } from '../interface/todo.interface'

// Reducer
import { todo_SET_LOADING } from '../reducer/todo.reducer'

// Axios
import _axios from 'axios'

const axios = _axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/todos'
})

/**
 * @description Fetch todo list
 *
 */
export const todo_fetchList = createAsyncThunk<ITodo[]>(
	'todo/todo_fetchList',
	async (_, thunkAPI) => {
		thunkAPI.dispatch(todo_SET_LOADING(true))

		try {
			const { data } = await axios.get('', {
				params: {
					_limit: 5
				}
			})

			return data
		} finally {
			thunkAPI.dispatch(todo_SET_LOADING(false))
		}
	}
)

/**
 * @description Create todo
 *
 * @param {string} title
 *
 */
export const todo_create = createAsyncThunk<ITodo, string>(
	'todo/todo_create',
	async (title: string, thunkAPI) => {
		thunkAPI.dispatch(todo_SET_LOADING(true))

		try {
			const { data } = (await axios.post('', {
				id: Math.random(),
				title,
				completed: false
			})) as {
				data: ITodo
			}

			return data
		} finally {
			thunkAPI.dispatch(todo_SET_LOADING(false))
		}
	}
)

/**
 * @description Delete todo
 *
 * @param {number} id
 *
 */
export const todo_delete = createAsyncThunk<number, number>(
	'todo/todo_delete',
	async (id: number, thunkAPI) => {
		thunkAPI.dispatch(todo_SET_LOADING(true))

		try {
			await axios.delete(`/${id}`)

			return id
		} finally {
			thunkAPI.dispatch(todo_SET_LOADING(false))
		}
	}
)

/**
 * @description Update todo
 *
 * @param {object} payload
 *
 */
export const todo_update = createAsyncThunk<ITodo, ITodo>(
	'todo/todo_update',
	async (payload: ITodo, thunkAPI) => {
		thunkAPI.dispatch(todo_SET_LOADING(true))

		try {
			const { data } = (await axios.put(`/${payload.id}`, {
				id: payload.id,
				title: payload.title,
				completed: payload.completed
			})) as { data: ITodo }

			return data
		} finally {
			thunkAPI.dispatch(todo_SET_LOADING(false))
		}
	}
)

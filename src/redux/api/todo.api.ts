// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Interface
import { ITodo } from '../interface/todo.interface'

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
	reducerPath: 'todoApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com/todos/'
	}),
	endpoints: builder => ({
		getTodoById: builder.query<ITodo, string>({
			query: id => id
		})
	})
})

// Export hooks for usage in functional components, which are
// auto-generated based on defined endpoints
export const { useGetTodoByIdQuery } = todoApi

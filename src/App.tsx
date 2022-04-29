// React
import { MouseEvent, ChangeEvent, useCallback, useState } from 'react'

// Actions
import { todo_SET_TODO } from './redux/slice/todo.slice'

// Hook
import { useAppSelector, useAppDispatch } from './hooks'

const App = () => {
	// Hook
	const [title, setTitle] = useState<string>('')
	const todo_list = useAppSelector(state => state.todo.todo_list)
	const dispatch = useAppDispatch()

	/**
	 * @description Watch any change inside title input
	 *
	 * @param {ChangeEvent<HTMLInputElement>} event
	 *
	 * @return {void} void
	 */
	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
	}, [])

	/**
	 * @description Add Todo
	 *
	 * @param {MouseEvent} event
	 *
	 * @return {void} void
	 */
	const addTodo = useCallback(
		(event: MouseEvent<HTMLFormElement>): void => {
			event.preventDefault()

			dispatch(todo_SET_TODO(title))

			setTitle('')
		},
		[title, dispatch]
	)

	return (
		<div>
			<form onSubmit={addTodo}>
				<label htmlFor='title'>Title</label>
				<input type='text' id='title' value={title} onChange={onChange} />
				<button type='submit'>Add Todo</button>
			</form>

			<br />
			<br />

			<ul>
				{todo_list.map(todo => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
		</div>
	)
}

export { App }

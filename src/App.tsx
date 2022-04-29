// React
import {
	MouseEvent,
	ChangeEvent,
	useCallback,
	useState,
	useEffect
} from 'react'

// Hook
import { useAppDispatch, useAppSelector } from './hooks/store.hook'

// Api
import {
	todo_fetchList,
	todo_create,
	todo_delete,
	todo_update
} from './redux/api/todo.api'

const App = () => {
	// Hook
	const [title, setTitle] = useState<string>('')
	const [current, setCurrent] = useState<{ id: number | null; title: string }>({
		id: null,
		title: ''
	})
	const dispatch = useAppDispatch()
	const todo_isLoading = useAppSelector(state => state.todo.todo_isLoading)
	const todo_list = useAppSelector(state => state.todo.todo_list)

	useEffect(() => {
		dispatch(todo_fetchList())
	}, [dispatch])

	/**
	 * @description Watch any change inside title input
	 *
	 * @param {ChangeEvent<HTMLInputElement>} event
	 * @param {boolean} isUpdate
	 *
	 * @return {void} void
	 */
	const onChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>, isUpdate?: boolean) => {
			if (isUpdate) {
				setCurrent(prev => ({ ...prev, title: event.target.value }))
			} else {
				setTitle(event.target.value)
			}
		},
		[]
	)

	/**
	 * @description Add Todo
	 *
	 * @param {MouseEvent} event
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const addTodo = useCallback(
		async (event: MouseEvent<HTMLFormElement>): Promise<void> => {
			event.preventDefault()

			try {
				await dispatch(todo_create(title)).unwrap()
			} finally {
				setTitle('')
			}
		},
		[dispatch, title]
	)

	/**
	 * @description Update todo
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const updateTodo = useCallback(async (): Promise<void> => {
		try {
			await dispatch(
				todo_update({ id: current.id!, title: current.title, completed: false })
			).unwrap()
		} finally {
			setCurrent({ id: null, title: '' })
		}
	}, [dispatch, current])

	/**
	 * @description Delete todo
	 *
	 * @param {number} id
	 *
	 * @return {void} void
	 */
	const onDelete = useCallback(
		(id: number): void => {
			dispatch(todo_delete(id))
		},
		[dispatch]
	)

	return (
		<div>
			<form onSubmit={addTodo}>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					id='title'
					value={title}
					onChange={onChange}
					readOnly={todo_isLoading}
				/>
				<button type='submit' disabled={todo_isLoading}>
					Add Todo
				</button>
			</form>

			<br />
			<br />

			{todo_isLoading && 'Loading...'}

			<br />

			<ul>
				{todo_list.map(todo => (
					<li
						key={todo.id}
						style={{ display: 'flex', gap: 5, alignItems: 'center' }}
					>
						<p
							style={{ margin: 0 }}
							onClick={() => {
								setCurrent({
									id: todo.id,
									title: todo.title
								})
							}}
						>
							{current.id === todo.id ? (
								<input
									type='text'
									id='title'
									value={current.title}
									onChange={event => onChange(event, true)}
									onBlur={() => updateTodo()}
								/>
							) : (
								todo.title
							)}
						</p>
						<span
							onClick={() => onDelete(todo.id)}
							style={{ cursor: 'pointer', color: 'coral' }}
						>
							Delete
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export { App }

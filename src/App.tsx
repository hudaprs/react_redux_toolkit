// Api
import { useGetTodoByIdQuery } from './redux/api/todo.api'

const App = () => {
	// Hook
	const { data, error, isLoading } = useGetTodoByIdQuery('1')

	return (
		<div>
			{isLoading ? (
				'Loading...'
			) : error ? (
				'Error'
			) : (
				<div>
					<p>Title: {data?.title}</p>
					<p>Completed: {data?.completed?.toString()}</p>
				</div>
			)}
		</div>
	)
}

export { App }

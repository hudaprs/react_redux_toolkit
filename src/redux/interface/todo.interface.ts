export interface ITodo {
	id: number
	title: string
	completed: boolean
}

export interface ITodoState {
	todo_isLoading: boolean
	todo_list: ITodo[]
}

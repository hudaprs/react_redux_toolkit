import React from 'react'
import ReactDOM from 'react-dom/client'

// Components
import { App } from './App'

// React Redux
import { Provider } from 'react-redux'

// Store
import { store } from './redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Provider } from './utils/GlobalContext'

import { CheckoutForm, Home, Return } from './pages'

import './styles/index.scss'

const router = createBrowserRouter([
	{
		path: '*',
		element: <Home />
	},
	{
		path: '/checkout',
		element: <CheckoutForm />
	},
	{
		path: '/return',
		element: <Return />
	}
])

function App() {
	return (
		<Provider >
			<div className='main-container' >
				<RouterProvider router={router} />
			</div >
		</Provider >
	)
}

export default App

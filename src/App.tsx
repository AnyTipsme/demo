import { createHashRouter, RouterProvider } from 'react-router-dom'

import { Provider } from './utils/GlobalContext'

import { Home, Success } from './pages'
import { Heading } from './components'

import './styles/index.scss'

const router = createHashRouter([
	{
		path: '*',
		element: <Home />
	},
	{
		path: '/success',
		element: <Success />
	}
])

function App() {
	return (
		<Provider >
			<div className='main-container' >
				<Heading />
				<RouterProvider router={router} />
			</div >
		</Provider >
	)
}

export default App

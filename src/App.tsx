import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Home, TypeInTips, Success } from './pages'
import { Heading, PoweredBy } from './components'
import { Provider } from './utils/GlobalContext'
import './styles/index.scss'

const router = createHashRouter([
	{
		path: '*',
		element: <Home />
	},
	{
		path: '/type-in-tips',
		element: <TypeInTips />
	},
	{
		path: '/success',
		element: <Success />
	}
])

function App() {
	return (
		<Provider>
			<div className='main-container'>
				<Heading />
				<RouterProvider router={router} />
				<PoweredBy />
			</div>
		</Provider>
	)
}

export default App

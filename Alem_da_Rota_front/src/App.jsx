import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

/** Disponibiliza as rotas configuradas para toda a aplicação. */
function App() {
  return <RouterProvider router={router} />
}

export default App

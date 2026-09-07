import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import CadastroPage from './pages/CadastroPage'
import DestinosPage from './pages/DestinosPage'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'

// Cada objeto associa um caminho da URL ao componente exibido na tela.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cadastrar', element: <CadastroPage /> },
      { path: 'destinos', element: <DestinosPage /> },
    ],
  },
])

import { Link, useRouteError } from 'react-router-dom'
import styles from './Pages.module.css'

export default function ErrorPage() {
  const erro = useRouteError()

  return (
    <main className={styles.errorPage}>
      <span>404</span>
      <h1>Página não encontrada</h1>
      <p>{erro?.statusText || 'O endereço informado não existe.'}</p>
      <Link to="/">Voltar para o início</Link>
    </main>
  )
}

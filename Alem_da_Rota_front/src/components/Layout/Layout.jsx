import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import styles from '../../App.module.css'

/** Estrutura fixa que envolve todas as páginas configuradas no Router. */
export default function Layout() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <span>Além da Rota</span>
        <p>Projeto acadêmico de turismo</p>
      </footer>
    </div>
  )
}

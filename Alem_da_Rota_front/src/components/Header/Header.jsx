import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

/** Menu compartilhado entre todas as páginas da aplicação. */
export default function Header() {
  function definirClasse({ isActive }) {
    return isActive ? styles.active : undefined
  }

  return (
    <header className={styles.header}>
      <Link className={styles.brand} to="/">
        <span>▲</span> Além da Rota
      </Link>

      <nav aria-label="Navegação principal">
        <NavLink className={definirClasse} to="/cadastrar">
          Cadastrar
        </NavLink>
        <NavLink className={definirClasse} to="/destinos">
          Destinos
        </NavLink>
      </nav>
    </header>
  )
}

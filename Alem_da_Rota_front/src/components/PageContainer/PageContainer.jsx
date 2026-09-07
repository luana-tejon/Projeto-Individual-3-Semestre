import styles from './PageContainer.module.css'

/**
 * Componente de composição: children representa todo o conteúdo colocado
 * entre <PageContainer> e </PageContainer>.
 */
export default function PageContainer({ titulo, subtitulo, children }) {
  return (
    <section className={styles.page}>
      <header className={styles.heading}>
        <span>ALÉM DA ROTA</span>
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>
      </header>
      {children}
    </section>
  )
}

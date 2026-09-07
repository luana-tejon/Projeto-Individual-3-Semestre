import styles from './DestinoList.module.css'

// Formatador criado uma única vez para todos os cards.
const formatadorDeMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

/** Renderiza os estados de carregamento, erro, lista vazia ou sucesso. */
export default function DestinoList({
  destinos,
  carregando,
  erro,
  onTentarNovamente,
}) {
  return (
    <div className={styles.section} id="destinos">
      <span className={styles.kicker}>SEU GUIA PESSOAL</span>

      <div className={styles.heading}>
        <div>
          <h2>Destinos salvos</h2>
          <p>Lugares que estão esperando por você.</p>
        </div>
        <span>
          {destinos.length} {destinos.length === 1 ? 'lugar' : 'lugares'}
        </span>
      </div>

      {carregando && (
        <div className={styles.feedback} role="status">
          <i /> Buscando destinos...
        </div>
      )}

      {!carregando && erro && (
        <div className={`${styles.feedback} ${styles.error}`} role="alert">
          <strong>Ops!</strong>
          <p>{erro}</p>
          <button onClick={onTentarNovamente}>Tentar novamente</button>
        </div>
      )}

      {!carregando && !erro && destinos.length === 0 && (
        <div className={styles.feedback}>
          <b className={styles.emptyIcon}>⌖</b>
          <strong>Seu guia ainda está vazio</strong>
          <p>Cadastre o primeiro destino usando o formulário ao lado.</p>
        </div>
      )}

      {!carregando && destinos.length > 0 && (
        <div className={styles.grid}>
          {/* map transforma cada destino recebido da API em um card JSX. */}
          {destinos.map((destino) => (
            <article className={styles.card} key={destino.id}>
              <div className={styles.cardTop}>
                <span>{destino.categoria}</span>
                <b>{destino.estado}</b>
              </div>

              <div className={styles.cardBody}>
                <h3>{destino.nome}</h3>
                <p className={styles.place}>
                  ● {destino.cidade}, {destino.estado}
                </p>
                <p className={styles.description}>{destino.descricao}</p>

                <div className={styles.meta}>
                  <span>
                    <small>MELHOR ÉPOCA</small>
                    {destino.melhorEpoca}
                  </span>
                  <span>
                    <small>CUSTO MÉDIO</small>
                    {formatadorDeMoeda.format(destino.valorMedio)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

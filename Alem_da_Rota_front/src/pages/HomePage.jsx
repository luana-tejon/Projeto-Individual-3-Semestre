import { Link } from 'react-router-dom'
import globoViagem from '../assets/globo-viagem.png'
import styles from '../App.module.css'

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.eyebrow}>DESCUBRA • PLANEJE • VIVA</span>
        <h1>
          Seu próximo destino começa <em>além da rota.</em>
        </h1>
        <p>
          Guarde lugares incríveis, organize suas ideias e monte um guia com
          destinos que realmente valem a viagem.
        </p>
        <Link to="/cadastrar" className={styles.heroButton}>
          Adicionar destino
        </Link>
      </div>

      <div className={styles.visual}>
        <img
          src={globoViagem}
          alt="Ilustração de um avião viajando ao redor do mundo"
        />
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DestinoList from '../components/DestinoList/DestinoList'
import PageContainer from '../components/PageContainer/PageContainer'
import { listarDestinos } from '../services/destinoService'
import styles from './Pages.module.css'

export default function DestinosPage() {
  const [destinos, setDestinos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const location = useLocation()

  async function carregarDestinos() {
    setCarregando(true)
    setErro('')

    try {
      const destinosCadastrados = await listarDestinos()
      setDestinos(destinosCadastrados)
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
   
    carregarDestinos()
    
  }, [])

  return (
    <PageContainer
      titulo="Destinos salvos"
      subtitulo="Todos os lugares exibidos abaixo foram consultados diretamente na API."
    >
      {/* useLocation recupera o state temporário enviado após o cadastro. */}
      {location.state?.mensagem && (
        <div className={styles.sucesso} role="status">
          ✓ {location.state.mensagem}
        </div>
      )}

      <DestinoList
        destinos={destinos}
        carregando={carregando}
        erro={erro}
        onTentarNovamente={carregarDestinos}
      />
    </PageContainer>
  )
}

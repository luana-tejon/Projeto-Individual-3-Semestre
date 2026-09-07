import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DestinoForm from '../components/DestinoForm/DestinoForm'
import PageContainer from '../components/PageContainer/PageContainer'
import { cadastrarDestino } from '../services/destinoService'

export default function CadastroPage() {
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  async function salvarDestino(dadosDoFormulario) {
    setErro('')

    try {
      const novoDestino = await cadastrarDestino(dadosDoFormulario)

      // Após o POST, navega para a consulta levando uma mensagem temporária.
      navigate('/destinos', {
        state: { mensagem: `${novoDestino.nome} foi adicionado ao seu guia!` },
      })

      return true
    } catch (error) {
      setErro(error.message)
      return false
    }
  }

  return (
    <PageContainer
      titulo="Cadastre um destino"
      subtitulo="Compartilhe os dados de um lugar que merece entrar no seu guia pessoal."
    >
      <DestinoForm onSubmit={salvarDestino} erro={erro} />
    </PageContainer>
  )
}

import { useState } from 'react'
import {
  CATEGORIAS,
  DESTINO_INICIAL,
  EPOCAS_DO_ANO,
} from '../../constants/destinoOptions'
import styles from './DestinoForm.module.css'

/**
 * Formulário controlado responsável pelo cadastro de destinos.
 * As props são recebidas por desestruturação: { onSubmit, mensagem }.
 */
export default function DestinoForm({ onSubmit, erro }) {
  const [formulario, setFormulario] = useState(DESTINO_INICIAL)
  const [enviando, setEnviando] = useState(false)
  const [erroFormulario, setErroFormulario] = useState('')

  // Uma única função atualiza todos os campos por meio do atributo "name".
  function alterarCampo({ target }) {
    setErroFormulario('')
    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [target.name]: target.value,
    }))
  }

  async function enviarFormulario(event) {
    event.preventDefault()

    // Verifica se existe algum campo vazio antes de chamar a API.
    const possuiCampoVazio = Object.values(formulario).some(
      (valor) => String(valor).trim() === '',
    )

    if (possuiCampoVazio) {
      setErroFormulario('Todos os campos devem ser preenchidos.')
      return
    }

    setErroFormulario('')
    setEnviando(true)

    const salvou = await onSubmit(formulario)

    if (salvou) {
      setFormulario(DESTINO_INICIAL)
    }

    setEnviando(false)
  }

  return (
    <div className={styles.panel} id="cadastro">
      <span className={styles.kicker}>NOVO LUGAR</span>
      <h2>Cadastre um destino</h2>
      <p className={styles.intro}>
        Preencha as informações para adicionar uma nova inspiração ao guia.
      </p>

      {/* O operador && exibe o erro somente quando ele existe. */}
      {erro && (
        <div className={styles.erro} role="alert">
          {erro}
        </div>
      )}

      <form onSubmit={enviarFormulario} noValidate>
        <label className={styles.full}>
          Nome do destino
          <input
            name="nome"
            value={formulario.nome}
            onChange={alterarCampo}
            placeholder="Ex.: Chapada Diamantina"
            required
            maxLength="100"
          />
        </label>

        <div className={styles.row}>
          <label>
            Cidade
            <input
              name="cidade"
              value={formulario.cidade}
              onChange={alterarCampo}
              placeholder="Lençóis"
              required
              maxLength="80"
            />
          </label>
          <label className={styles.uf}>
            UF
            <input
              name="estado"
              value={formulario.estado}
              onChange={alterarCampo}
              placeholder="BA"
              required
              maxLength="2"
            />
          </label>
        </div>

        <div className={styles.row}>
          <label>
            Categoria
            <select
              name="categoria"
              value={formulario.categoria}
              onChange={alterarCampo}
              required
            >
              <option value="">Selecione</option>
              {CATEGORIAS.map((categoria) => (
                <option key={categoria}>{categoria}</option>
              ))}
            </select>
          </label>

          <label>
            Melhor época
            <select
              name="melhorEpoca"
              value={formulario.melhorEpoca}
              onChange={alterarCampo}
              required
            >
              <option value="">Selecione</option>
              {EPOCAS_DO_ANO.map((epoca) => (
                <option key={epoca}>{epoca}</option>
              ))}
            </select>
          </label>
        </div>

        <label className={styles.full}>
          Custo médio por pessoa (R$)
          <input
            name="valorMedio"
            type="number"
            min="0"
            step="0.01"
            value={formulario.valorMedio}
            onChange={alterarCampo}
            placeholder="1500,00"
            required
          />
        </label>

        <label className={styles.full}>
          Descrição
          <textarea
            name="descricao"
            value={formulario.descricao}
            onChange={alterarCampo}
            placeholder="Conte o que torna esse lugar especial..."
            required
            maxLength="500"
            rows="4"
          />
        </label>

        {erroFormulario && (
          <p className={styles.avisoFormulario} role="alert">
            {erroFormulario}
          </p>
        )}

        {/* O ternário escolhe o texto do botão de acordo com o estado. */}
        <button type="submit" disabled={enviando}>
          {enviando ? 'Salvando...' : 'Adicionar ao guia →'}
        </button>
      </form>
    </div>
  )
}

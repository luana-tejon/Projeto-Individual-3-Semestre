const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/destinos'

async function verificarResposta(resposta) {
  if (!resposta.ok) {
    const dados = await resposta.json()
    const mensagem = dados.erros
      ? dados.erros.join('. ')
      : dados.mensagem

    throw new Error(mensagem)
  }

  return resposta.json()
}

export async function listarDestinos() {
  try {
    const resposta = await fetch(API_URL)
    return verificarResposta(resposta)
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Não foi possível conectar à API. Verifique se o back-end está ligado.')
    }

    throw error
  }
}

export async function cadastrarDestino(destino) {
  try {
    const dados = {
      ...destino,
      valorMedio: Number(destino.valorMedio),
    }

    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    })

    return verificarResposta(resposta)
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Não foi possível conectar à API. Verifique se o back-end está ligado.')
    }

    throw error
  }
}

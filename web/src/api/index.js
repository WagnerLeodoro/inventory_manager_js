const API_URL = 'http://localhost:3333';

export const getProdutos = async (searchValue = "") => {
    const response = await fetch(`${API_URL}/produtos?nome=${encodeURIComponent(searchValue)}`, {
    })
   return response.json()
}

export async function getProdutoPorId(id) {
    const response = await fetch(`${API_URL}/produtos/${id}`);
    if (!response.ok) throw new Error('Produto não encontrado');
    return response.json();
  }
  

export const deletarProdutos = async (id) => {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
   return response.json()
}

export const cadastrarProdutos = async (nome, preco) => {
    const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        body: JSON.stringify({ nome, preco }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
   return response.json()
}

export async function atualizarProduto(id, data) {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) throw new Error('Erro ao atualizar produto');
    return response.json();
  }

  export async function login(email, password) {
    const response = await fetch(`${API_URL}/sessions/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({email, password}),
      });
      return response.json()
  }

  export const getProfile = async () => {
    const response = await fetch(`${API_URL}/sessions/profile`, {
      method: 'GET',
      credentials: 'include'  // Envia o cookie da sessão automaticamente
    });
  
    return response.json();
  };
  
  export async function logout() {
    const response = await fetch(`${API_URL}/sessions/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      return response.json()
  }
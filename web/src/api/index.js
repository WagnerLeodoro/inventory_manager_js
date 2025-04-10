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
    credentials: "include",
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
    body: JSON.stringify({ email, password }),
  });

  const user = await response.json()
  sessionStorage.setItem('user', JSON.stringify(user));

  return user
}

export const getProfile = async () => {
  const response = await fetch(`${API_URL}/sessions/profile`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'  // Envia o cookie da sessão automaticamente
  });

  const user = await response.json();

  sessionStorage.setItem('user', JSON.stringify(user));

  return user;
};

export async function logout() {
  await fetch(`${API_URL}/sessions/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  sessionStorage.removeItem('user');
}
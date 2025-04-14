const API_URL = 'http://localhost:3333';

export const fetchProdutos = async (searchValue = "") => {
    const response = await fetch(`${API_URL}/produtos?nome=${encodeURIComponent(searchValue)}`)
    return response.json()
}

export async function fetchProdutoPorId(id) {
    const response = await fetch(`${API_URL}/produtos/${id}`);
    if (!response.ok) throw new Error('Produto não encontrado');
    return response.json();
}


export const fetchDeletarProdutos = async (id) => {
    try {
        const response = await fetch(`${API_URL}/produtos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        return response.json()
    } catch (error) {
        alert(error.message)
    }
}

export const fetchCadastrarProdutos = async (nome, preco) => {
    const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        body: JSON.stringify({nome, preco}),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
    })
    return response.json()
}

export async function fetchAtualizarProduto(id, data) {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Erro ao atualizar produto');
    return response.json();
}

export async function fetchLogin(email, password) {
    try {
        const response = await fetch(`${API_URL}/sessions/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({email, password}),
        });

        const user = await response.json()
        console.log(user)
        sessionStorage.setItem('user', JSON.stringify(user));

        return user
    } catch (error) {
        return error.message
    }
}

export const fetchGetProfile = async () => {
    const response = await fetch(`${API_URL}/sessions/profile`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });

    const user = await response.json();

    sessionStorage.setItem('user', JSON.stringify(user));

    return user;
};

export async function fetchLogout() {
    await fetch(`${API_URL}/sessions/logout`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
    sessionStorage.removeItem('user');
}

export async function fetchUsuarios(searchValue = "") {
    try {
        const response = await fetch(`${API_URL}/users?nome=${encodeURIComponent(searchValue)}`, {
            credentials: 'include'
        })
        return response.json()
    } catch (e) {
        return e.message
    }
}

export const fetchCadastrarUsuarios = async (nome, email, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    body: JSON.stringify({nome, email, password}),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
  })
  return response.json()
}
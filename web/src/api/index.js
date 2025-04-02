const API_URL = 'http://localhost:3333';

export const getProdutos = async () => {
    const response = await fetch(`${API_URL}/produtos`)
   return response.json()
}
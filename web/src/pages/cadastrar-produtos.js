import { fetchAtualizarProduto, fetchCadastrarProdutos, fetchProdutoPorId } from "../api";
import {navegarPara} from "../router/index.js";

export default async function CadastrarProdutos() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    let produto = { name: "", price: "" };
  
    if (id) {
      produto = await fetchProdutoPorId(id);
    }
  
    return `
        <h2>${id ? 'Editar Produto' : 'Cadastrar Produto'}</h2>
        <div class="container">
            <form id="cadastrar-produto-form">
                <div class="mb-3">
                    <label for="nome" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="nome" required value="${id ? produto.nome : ""}">
                </div>
                <div class="mb-3">
                    <label for="preco" class="form-label">Preço</label>
                    <input type="decimal"  class="form-control" id="preco" required value="${id ? produto.preco : ""}">
                </div>
                <button type="submit" class="btn btn-primary">${id ? 'Atualizar' : 'Cadastrar'}</button>
            </form>
        </div>
    `;
}

export async function submitData() {
    const form = document.getElementById('cadastrar-produto-form');
    const nomeInput = document.getElementById('nome');
    const precoInput = document.getElementById('preco');
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = nomeInput.value;
        const preco = parseFloat(precoInput.value);

        try {
            if(id) {
               const response = await fetchAtualizarProduto(id, { nome, preco });
                alert(response.message);
                navegarPara('/produtos');
            } else {
                const response = await fetchCadastrarProdutos(nome, preco);
                alert(response.message);
                navegarPara('/produtos');
            }
        } catch (error) {
            alert(error);
        }
    });
}
import { atualizarProduto, cadastrarProdutos, getProdutoPorId } from "../api";

export default async function CadastrarProdutos() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    let produto = { name: "", price: "" };
  
    if (id) {
      produto = await getProdutoPorId(id);
    }
  
    return `
        <h2>${id ? 'Editar Produto' : 'Cadastrar Produto'}</h2>
        <div class="container">
            <h1>Cadastrar Produto</h1>
            <form id="cadastrar-produto-form">
                <div class="mb-3">
                    <label for="nome" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="nome" required>
                </div>
                <div class="mb-3">
                    <label for="preco" class="form-label">Preço</label>
                    <input type="decimal"  class="form-control" id="preco" required>
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
                await atualizarProduto(id, { nome, preco });
                alert('Produto atualizado com sucesso!');
                window.location.href = '/produtos';
            } else {

                await cadastrarProdutos(nome, preco);
                alert('Produto cadastrado com sucesso!');
                window.location.href = '/produtos';
            }
        } catch (error) {
            alert('Erro ao cadastrar produto: ' + error.message);
        }
    });
}
import {fetchDeletarProdutos, fetchProdutos} from "../api/index.js";
import {navegarPara} from "../router/index.js";

export default async function Produtos() {

    return `
        <div class="d-flex w-100 m-0 p-0 justify-content-between">
            <form class="d-flex w-75">
                <input id="search" class="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Pesquisar">
                <button id="search-btn" class="btn btn-outline-success" type="button">Pesquisar</button>
            </form>
            <button id="cadastrar" class="btn btn-primary">
                Cadastrar
            </button>
        </div>
        <div class="container-fluid table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Produto</th>
                    <th scope="col">Preço</th>
                    <th scope="col" colspan="2">Ações</th>
                    </tr>
                </thead>
                <tbody id="lista-produtos">
                </tbody>
            </table>
        </div>
    `
}

export async function setup() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search');

    searchBtn.addEventListener('click', async () => {
        const searchValue = searchInput.value;
        await carregarProdutos(searchValue);
    });

    document.getElementById('cadastrar').addEventListener('click', () => {
        navegarPara('/produtos/cadastro')
    })

    await carregarProdutos();
}

async function carregarProdutos(searchValue = '') {
    const produtos = await fetchProdutos(searchValue);
    const tableBody = document.getElementById('lista-produtos');

    if (!tableBody) {
        console.error('Elemento tbody não encontrado.');
        return;
    }

    if (!produtos.length) {
        return tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">Nenhum produto cadastrado!</td>
            </tr>
        `;
    } else {
        tableBody.innerHTML = produtos.map((produto, index) => `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>
                    <button id="edit-btn" data-id="${produto.id}">Editar</button>
                </td>
                <td>
                    <button id="delete-btn" data-id="${produto.id}">Excluir</button>
                </td>
            </tr>
        `
        ).join('')



        document.querySelectorAll('#edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                const productId = e.target.dataset.id;
                navegarPara(`/produtos/cadastro?id=${productId}`);
            });
        });

        document.querySelectorAll('#delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault()
                const productId = e.target.dataset.id;

                const response = await fetchDeletarProdutos(productId);
                alert(response.message);

                await carregarProdutos(searchValue);
            });
        });
    }

}
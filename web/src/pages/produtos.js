import { getProdutos } from "../api"

export default async function Produtos() {
    const produtos = await getProdutos()

    return `
        <div class="d-flex w-100 m-0 p-0">
    <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Pesquisar">
        <button class="btn btn-outline-success" type="button">Pesquisar</button>
    </form>
    <button class="btn btn-primary">
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
          <tbody>
          ${produtos.map((produto, index) => {
            index++
            return `
                <tr>
                    <th scope="row">${index}</th>
                    <td>${produto.nome}</td>
                    <td>R$ ${produto.preco}</td>
                    <td>
                        <button>Editar</button>
                    </td>
                    <td>
                        <button>Excluir</button>
                    </td>
                </tr>
            `
          }).join('')}
          </tbody>
    </table>
</div>
    `
}
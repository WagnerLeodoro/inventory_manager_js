import {navegarPara} from "../router/index.js";
import {fetchDeletarUsuarios, fetchGetProfile, fetchUsuarios} from "../api/index.js";

export default async function Usuarios() {
    return `
        <div class="d-flex w-100 m-0 p-0 justify-content-between">
            <form class="d-flex w-75">
                <input id="search" class="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Pesquisar">
                <button id="search-user-btn" class="btn btn-outline-success" type="button">Pesquisar</button>
            </form>
            <button id="cadastrar-usuario" class="btn btn-primary">
                Cadastrar
            </button>
        </div>
        <div class="container-fluid table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col" colspan="2">Ações</th>
                    </tr>
                </thead>
                <tbody id="lista-usuarios">
                </tbody>
            </table>
        </div>
    `
}

export async function setupUsuarios() {
    const searchBtn = document.getElementById('search-user-btn');
    const searchInput = document.getElementById('search');

    searchBtn.addEventListener('click', async () => {
        const estaLogado = await fetchGetProfile()
        let searchValue = searchInput.value;
        if (estaLogado) {
            await carregarUsuarios(searchValue);
        } else {
            alert("Faça login primeiro")
        }
    });

    document.getElementById('cadastrar-usuario').addEventListener('click', (e) => {
        e.preventDefault()
        navegarPara('/usuarios/cadastro')
    })

    await carregarUsuarios();
}

async function carregarUsuarios(searchValue = '') {
    try {
        const usuarios = await fetchUsuarios(searchValue);

        const tableBody = document.getElementById('lista-usuarios');

        if (!tableBody) {
            console.error('Elemento tbody não encontrado.');
            return;
        }

        if (!usuarios.length) {
            return tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">Nenhum usuario encontrado!</td>
            </tr>
        `;
        } else {
            tableBody.innerHTML = usuarios.map((usuario, index) => `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>
                    <button id="edit-user-btn" data-id="${usuario.id}">Editar</button>
                </td>
                <td>
                    <button id="delete-user-btn" data-id="${usuario.id}">Excluir</button>
                </td>
            </tr>
        `
            ).join('')
        }


        document.querySelectorAll('#edit-user-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const usuarioId = e.target.dataset.id;
                navegarPara(`/usuarios/cadastro?id=${usuarioId}`);
            });
        });

        document.querySelectorAll('#delete-user-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const usuarioId = e.target.dataset.id;

                const response = await fetchDeletarUsuarios(usuarioId);
                alert(response.message)

                await carregarUsuarios(searchValue);
            });
        });
    } catch (error) {
        alert(error.message)
    }
}
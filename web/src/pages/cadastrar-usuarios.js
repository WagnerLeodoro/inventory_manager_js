import {navegarPara} from "../router/index.js";
import {fetchAtualizarUsuario, fetchCadastrarUsuarios, fetchUsuarioPorId} from "../api/index.js";

export default async function CadastrarUsuarios() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    let usuario = { nome: "", email: "" };

    if (id) {
      usuario = await fetchUsuarioPorId(id);
    }
  
    return `
        <h2>${id ? 'Editar Usuario' : 'Cadastrar Usuario'}</h2>
        <div class="container">
            <form id="cadastrar-usuario-form">
                <div class="mb-3">
                    <label for="nome" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="nome" required value="${id ? usuario.nome : ""}">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email"  class="form-control" id="email" required value="${id ? usuario.email : ""}">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Senha</label>
                    <input type="password"  class="form-control" id="password" required min="6" value="${id ? usuario.email : ""}">
                </div>
                <button type="submit" class="btn btn-primary">${id ? 'Atualizar' : 'Cadastrar'}</button>
            </form>
        </div>
    `;
}

export async function submitUserData() {
    const form = document.getElementById('cadastrar-usuario-form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');


    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        const nome = nomeInput.value;
        const email = emailInput.value;
        const password = passwordInput.value

        try {
            if(id) {
               const response = await fetchAtualizarUsuario(id, { nome, email, password });
                alert(response);
                navegarPara('/usuarios');
            } else {
                const response = await fetchCadastrarUsuarios(nome, email, password);
                alert(response);
                navegarPara('/usuarios');
            }
        } catch (error) {
            alert(error);
        }
    });
}
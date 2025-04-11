import { getProfile, login } from "../api";
import Header from "../components/Header";
import { navegarPara } from '../router'

export default function Login() {
    return `
        <div class="container card w-50 bg-light">
            <form class="container p-4" id="login-form">
                <div class="mb-3">
                    <label for="email" class="form-label">Email: </label>
                    <input type="email" class="form-control" id="email" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Senha: </label>
                    <input type="password"  class="form-control" id="password" required>
                </div>
                <div class="d-flex justify-content-center">
                    <button id="login-btn" type="button" class="w-50 btn btn-success">Entrar</button>
                </div>
            </form>
             <p id="message"></p>
    </div>
    `
}
export async function setupLogin() {
    await carregarPaginaLogin()
}


async function carregarPaginaLogin() {
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const loginBtn = document.getElementById('login-btn')

    // Login do usuário
    loginBtn.addEventListener('click', async () => {
        const email = emailInput.value
        const password = passwordInput.value
        await login(email, password);
        alert("Login realizado com sucesso")
        navegarPara("/home")
        Header()
    })
};


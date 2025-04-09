import { getProfile, login } from "../api";
import {navegarPara} from '../router'

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
                    <button type="submit" class="w-50 btn btn-success">Entrar</button>
                </div>
            </form>
             <p id="message"></p>
    </div>
    `
}

// Login do usuário
window.handleLogin = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    await login(email, password);
    alert("Login realizado com sucesso")
    navegarPara("/home")

  };
  
  window.handleProfile = async () => {
    const response = await getProfile();
    document.getElementById('message').textContent = response.user 
      ? `Logado como: ${response.user.email}` 
      : 'Não autenticado';
  };
  
  // Logout do usuário
  window.handleLogout = async () => {
    await logout();
    alert('Logout realizado!');
  };
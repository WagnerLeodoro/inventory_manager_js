import {fetchLogout} from "../api/index.js";
import {navegarPara} from "../router/index.js";

export default function Header() {
    const header = document.getElementById('header')
    header.innerHTML = ''

    const user = JSON.parse(sessionStorage.getItem("user"))


    header.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img class="logo" src="./logo.png" alt="logo" />
                </a>
                
                <div class="d-block mx-auto text-center">
                    ${user ? `<span class="fw-bold">Bem-vindo, ${user.nome}!</span>` : 'Olá Visitante'}
                </div>   
                      
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="/" onclick="navegarPara('/'); return false;" >Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/produtos" onclick="navegarPara('/produtos'); return false;" >Produtos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/usuarios" onclick="navegarPara('/usuarios'); return false;">Usuarios</a>
                        </li>
                       <li class="nav-item">
                                <a class="nav-link">
                                    <button type="button" id="auth-btn" class="nav-link p-0 m-0">
                                    ${user ? "Logout" : "Login" }
                                    </button>
                                </a>
                            </li>
                    </ul>
                </div>
            </div>
        </nav>
    `

    document.getElementById("auth-btn").addEventListener("click", async () => {
        if (user) {
            await fetchLogout();
            await Header()
            navegarPara("/login");  // Redireciona para a página de login
        } else {
            navegarPara("/login");  // Redireciona para a página de login
        }
    });
}
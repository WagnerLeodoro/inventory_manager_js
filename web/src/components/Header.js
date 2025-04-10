import { logout } from "../api"
export default function Header() {
    const user = JSON.parse(sessionStorage.getItem("user"))
    return `
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="" alt="logo" />
                </a>            
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
                        ${!user ?
                            `<li class="nav-item">
                            <a class="nav-link" href="/login" onclick="navegarPara('/login'); return false;">Login</a>
                        </li>`
                         : `<li class="nav-item">
                        <a class="nav-link">
                            <button type="button" id="logout-btn" class="nav-link">
                            Logout
                            </button>
                        </a>
                    </li>`}
                    </ul>
                </div>
            </div>
        </nav>
    `
}
window.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById('logout-btn')
    if(logoutBtn) {
        logoutBtn.addEventListener('click', logout)
        alert("Logout realizado com sucesso!")
    }
    return null
})   
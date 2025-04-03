const routes = {
    '/': 'home',
    '/usuarios': 'usuarios',
    '/produtos': 'produtos',
    '/login': 'login'
}

const carregarPaginas = async () => {
    const path = window.location.pathname; 
    const pageName = routes[path] || 'home'

    const pageModule = await import(`../pages/${pageName}.js`)

    document.getElementById('app').innerHTML = await pageModule.default()
}

export const navegarPara = (path) => {
    window.history.pushState({}, '', path)
    carregarPaginas()
}

window.addEventListener('popstate', carregarPaginas)
document.addEventListener('DOMContentLoaded', carregarPaginas)
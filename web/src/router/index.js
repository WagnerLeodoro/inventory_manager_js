import Produtos, { setup } from "../pages/produtos";

const routes = {
    '/': 'home',
    '/usuarios': 'usuarios',
    '/produtos': 'produtos',
    '/login': 'login',
    '/produtos/cadastro': 'cadastrar-produtos',
}

const carregarPaginas = async () => {
    const path = window.location.pathname; 
    const pageName = routes[path] || 'home'

    const app = document.getElementById('app');

  if (pageName === 'produtos') {
    app.innerHTML = await Produtos();
    await setup();
  } else if (pageName === 'cadastrar-produtos') {
    const pageModule = await import('../pages/cadastrar-produtos.js');
    app.innerHTML = await pageModule.default();
    await pageModule.submitData(); // Chama a função de submitData após carregar o módulo

  } 
  else {
    const pageModule = await import(`../pages/${pageName}.js`);
    app.innerHTML = await pageModule.default();
  }
}

export const navegarPara = (path) => {
    window.history.pushState({}, '', path)
    carregarPaginas()
}

window.addEventListener('popstate', carregarPaginas)
document.addEventListener('DOMContentLoaded', carregarPaginas)
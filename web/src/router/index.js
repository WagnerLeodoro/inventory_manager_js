import Login, { setupLogin } from "../pages/login.js";
import Produtos, { setup } from "../pages/produtos";
import Usuarios, {setupUsuarios} from "../pages/usuarios.js";

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

  }else if(pageName === 'login') {
    app.innerHTML = Login()
    await setupLogin()
  } else if (pageName === 'usuarios') {
      app.innerHTML = await Usuarios();
      await setupUsuarios()
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
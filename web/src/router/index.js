import Login, { setupLogin } from "../pages/login.js";
import Produtos, { setup } from "../pages/produtos";
import Usuarios, {setupUsuarios} from "../pages/usuarios.js";
import CadastrarProdutos, {submitData} from "../pages/cadastrar-produtos.js";
import CadastrarUsuarios, {submitUserData} from "../pages/cadastrar-usuarios.js";
import Header from "../components/Header.js";

const routes = {
    '/': 'home',
    '/usuarios': 'usuarios',
    '/produtos': 'produtos',
    '/login': 'login',
    '/produtos/cadastro': 'cadastrar-produtos',
    '/usuarios/cadastro': 'cadastrar-usuarios',

}

const carregarPaginas = async () => {
    const path = window.location.pathname;
    const pageName = routes[path] || 'home'

    const app = document.getElementById('app');

  if (pageName === 'produtos') {
    app.innerHTML = await Produtos();
    await setup();
  } else if (pageName === 'cadastrar-produtos') {
    app.innerHTML = await CadastrarProdutos();
    await submitData(); // Chama a função de submitData após carregar o módulo
  } else if(pageName === 'login') {
    app.innerHTML = Login()
    await setupLogin()
  } else if (pageName === 'usuarios') {
      app.innerHTML = await Usuarios();
      await setupUsuarios()
  } else if (pageName === 'cadastrar-usuarios') {
      app.innerHTML = await CadastrarUsuarios();
      await submitUserData()
  } else {
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
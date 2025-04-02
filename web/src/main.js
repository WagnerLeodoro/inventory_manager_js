import Header from "./components/Header.js";
import Produtos from "./pages/produtos.js";

document.getElementById('header').innerHTML = Header()

document.getElementById('app').innerHTML = await Produtos()
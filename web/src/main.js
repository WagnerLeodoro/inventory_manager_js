import { getProdutos } from "./api/index.js";
import Header from "./components/Header.js";

console.log(await getProdutos());


document.getElementById('header').innerHTML = Header()
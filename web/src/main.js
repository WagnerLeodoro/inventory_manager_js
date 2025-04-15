import Header from "./components/Header.js";
import {navegarPara} from './router/index.js'

document.addEventListener('DOMContentLoaded', async () => {
    await Header();
    navegarPara();
  });
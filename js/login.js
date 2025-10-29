import { login } from "./funcs/auth.js";

const loginBtn = document.querySelector('#loginBtn')

loginBtn.addEventListener('click', event => {
    event.preventDefault()
    login()
})

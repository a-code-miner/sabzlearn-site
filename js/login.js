import { getMe, login } from "./funcs/auth.js";

const loginBtn = document.querySelector('#loginBtn')

console.log(getMe())

loginBtn.addEventListener('click', event => {
    event.preventDefault()
    login()
})

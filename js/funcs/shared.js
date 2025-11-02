import { getMe } from "./auth.js"
import { getToken } from "./utils.js"

const showUsernameOnNavbar = () => {
    const token = getToken()
    const navbarProfileBox = document.querySelector('.main-header__profile')

    if (token) {
        getMe().then(data => {
            if (data && data.name) {
                navbarProfileBox.setAttribute('href', 'index.html')
                navbarProfileBox.innerHTML = `<span class="main-header__profile-text">${data.name}</span>`
            } else {
                // اگر درخواست خطا داد یا توکن نامعتبر بود
                navbarProfileBox.setAttribute('href', 'login.html')
                navbarProfileBox.innerHTML = `<span class="main-header__profile-text">ورود / ثبت نام</span>`
            }
        }).catch(() => {
            // اگر خطایی در ارتباط با سرور پیش آمد
            navbarProfileBox.setAttribute('href', 'login.html')
            navbarProfileBox.innerHTML = `<span class="main-header__profile-text">ورود / ثبت نام</span>`
        })
    } else {
        navbarProfileBox.setAttribute('href', 'login.html')
        navbarProfileBox.innerHTML = `<span class="main-header__profile-text">ورود / ثبت نام</span>`
    }
}

export { showUsernameOnNavbar }



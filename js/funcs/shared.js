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

const renderTopBarMenus = async () => {
    const topBarList = document.querySelector('.top-bar__right')
    const response = await fetch(`http://localhost:4000/v1/menus/topbar`)
    const topBarMenus = await response.json()
    console.log(topBarMenus)
    topBarList.innerHTML = ''
    const shuffledArray = topBarMenus.sort((a, b) => 0.5 - Math.random())
    shuffledArray.slice(0, 7).map(menu => {
        topBarList.innerHTML += `<li class="top-bar__item"><a href=${menu.href} class="top-bar__link">${menu.title}</a></li>`
    })
}

export { showUsernameOnNavbar, renderTopBarMenus }



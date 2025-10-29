import { showSwal } from "./utils.js"
import { saveIntoLocalStorage } from "./utils.js"

const register = () => {
    const nameInput = document.querySelector('#name')
    const usernameInput = document.querySelector('#username')
    const emailInput = document.querySelector('#email')
    const phoneInput = document.querySelector('#phone')
    const passwordInput = document.querySelector('#password')

    const newUserInfo = {
        name: nameInput.value.trim(),
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value.trim(),
        confirmPassword: passwordInput.value.trim()
    }

    fetch('http://localhost:4000/v1/auth/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo)
    })
        .then(async (res) => {
            // Try to parse JSON response body (some error responses still return JSON)
            let data = null
            try {
                data = await res.json()
            } catch (e) {
                // ignore parse errors, leave data = null
            }

            console.log('register response', res, data)

            if (res.ok) {
                // Expect server to return accessToken (e.g. { accessToken: '...' })
                const token = data && data.accessToken
                saveIntoLocalStorage('user', { token: token || null })
                showSwal("ثبت نام با موفقیت انجام شد.", "success", true, "ورود به پنل",
                    () => { location.href = 'index.html' })
            } else if (res.status === 409) {
                // Conflict (username/email already used)
                const message = (data && data.message) ? data.message : "نام کاربری یا ایمیل قبلا استفاده شده است."
                showSwal(message, "error", true, "تصحیح اطلاعات", () => { })
            } else {
                const message = (data && data.message) ? data.message : 'خطایی در ثبت نام رخ داد.'
                showSwal(message, "error", true, "باشه", () => { })
            }
        })
        .catch((err) => {
            console.error('register fetch error', err)
            showSwal('خطا در ارتباط با سرور. لطفا اتصال خود را بررسی کنید.', 'error', true, 'باشه', () => { })
        })
}

const login = () => {
    const identifierInput = document.querySelector('#identifier')
    const passwordInput = document.querySelector('#password')

    const userInfos = {
        identifier: identifierInput.value.trim(),
        password: passwordInput.value.trim()
    }

    fetch('http://localhost:4000/v1/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfos)
    })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(result => {
            console.log(result)
        })
}

export { register, login }

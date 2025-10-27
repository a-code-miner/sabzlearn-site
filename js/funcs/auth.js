import { showSwal } from "./utils.js"

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
        .then((res) => {
            console.log(res)
            if (res.status === 201) {
                showSwal("ثبت نام با موفقیت انجام شد.", "success", true, "ورود به پنل",
                    () => { location.href = 'index.html' })
            } else if (res.status === 409) {
                showSwal("نام کاربری یا ایمیل قبلا استفاده شده است.", "error", true, "تصحیح اطلاعات")
            }
        })
        .then(result => console.log(result))
}

export { register }

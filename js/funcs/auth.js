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
                Swal.fire({
                    title: "ثبت نام با موفقیت انجام شد.",
                    icon: "success",
                    showConfirmButton: true,
                    confirmButtonText: "ورود به پنل"
                })
                    .then(() => {
                        // console.log(result) // if user clicked on button it's true otherwise false
                        location.href = 'index.html'
                    })
            } else if (res.status === 409) {
                Swal.fire({
                    title: "نام کاربری یا ایمیل قبلا استفاده شده است.",
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonText: "تصحیح اطلاعات"
                })
            }
        })
        .then(result => console.log(result))
}

export { register }

const showSwal = (title, icon, showConfirmButton, confirmButtonText, callback) => {
    Swal.fire({
        title,
        icon,
        showConfirmButton,
        confirmButtonText,
    })
        .then(result => callback(result))
}

const saveIntoLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    try {
        return JSON.parse(raw)
    } catch (e) {
        // If value is not JSON, return raw string
        return raw
    }
}

const getToken = () => {
    const raw = localStorage.getItem('user')
    if (!raw) return null
    try {
        const obj = JSON.parse(raw)
        return obj ? obj.token : null
    } catch (e) {
        return null
    }
}

const isLogin = () => {
    const userInfo = getFromLocalStorage('user')
    return userInfo ? true : false
}

const getUrlParam = (key) => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(key)
}

const searchInArray = (array, searchProperty, searchValue) => {
    let outputArray = array.filter(item => item[searchProperty].toLowerCase().includes(searchValue.toLowerCase()))
    return outputArray
}

export { showSwal, saveIntoLocalStorage, getFromLocalStorage, getToken, isLogin, getUrlParam, searchInArray }

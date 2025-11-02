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

const getAndShowAllCourses = async () => {
    const coursesContainer = document.querySelector('#courses-container')
    const response = await fetch(`http://localhost:4000/v1/courses`)
    const courses = await response.json()
    coursesContainer.innerHTML = ''
    courses.slice(0, 6).map((course) => {
        coursesContainer.insertAdjacentHTML('beforeend', `
                <div class="col-4">
                            <div class="course-box">
                                <a href="#">
                                    <img src="images/courses/jango.png" alt="Course Image" class="course-box__img">
                                </a>
                                <div class="course-box__main">
                                    <a class="course-box__title" href="#">${course.name}</a>
                                    <div class="course-box__rating-teacher">
                                        <div class="course-box__teacher">
                                            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                            <a href="#" class="course-box__teacher-link">${course.creator}</a>
                                        </div>
                                        <div class="course-box__rating">
                                            <img src="images/svgs/star.svg" alt="rating" class="course-box__star">
                                            <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                                            <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                                            <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                                            <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                                        </div>
                                    </div>
                                    <div class="course-box__status">
                                        <div class="course-box__users">
                                            <i class="fas fa-users course-box__users-icon"></i>
                                            <span class="course-box__users-count">${course.registers}</span>
                                        </div>
                                        <span class="course-box__price">${course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div class="course-box__footer">
                                    <a href="#" class="course-box__footer-link">مشاهده اطلاعات</a>
                                    <i class="fas fa-arrow-left course-box__footer-icon"></i>
                                </div>
                            </div>
                        </div>
            `)
    })

    return courses
}

export { showUsernameOnNavbar, renderTopBarMenus, getAndShowAllCourses }



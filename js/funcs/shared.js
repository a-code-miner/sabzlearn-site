import { getMe } from "./auth.js"
import { getToken, getUrlParam } from "./utils.js"

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
                                    <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Image" class="course-box__img">
                                </a>
                                <div class="course-box__main">
                                    <a class="course-box__title" href="#">${course.name}</a>
                                    <div class="course-box__rating-teacher">
                                        <div class="course-box__teacher">
                                            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                            <a href="#" class="course-box__teacher-link">${course.creator}</a>
                                        </div>
                                        <div class="course-box__rating">
                                        ${Array(5 - course.courseAverageScore).fill(0).map((score) => '<img style="margin-left: -3px;" src="images/svgs/star.svg" alt="rating" class="course-box__star">').join('')}
                                        ${Array(course.courseAverageScore).fill(0).map((score) => '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">').join('')}
                                        </div>
                                    </div>
                                    <div class="course-box__status">
                                        <div class="course-box__users">
                                            <i class="fas fa-users course-box__users-icon"></i>
                                            <span class="course-box__users-count">${course.registers}</span>
                                        </div>
                                        <span class="course-box__price">${course.price === 0 ? 'رایگان' : `${course.price.toLocaleString()} افغانی`}</span>
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

const getAndShowAllPopularCourses = async () => {
    const popularCoursesWrapper = document.querySelector('#popular-courses-wrapper')
    const response = await fetch(`http://localhost:4000/v1/courses/popular`)
    const popularCourses = await response.json()
    popularCourses.forEach(course => {
        popularCoursesWrapper.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                            <div class="course-box">
                                <a href="#">
                                    <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Image"
                                        class="course-box__img">
                                </a>
                                <div class="course-box__main">
                                    <a class="course-box__title" href="#">${course.name}</a>
                                    <div class="course-box__rating-teacher">
                                        <div class="course-box__teacher">
                                            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                            <a href="#" class="course-box__teacher-link">${course.creator}</a>
                                        </div>
                                        <div class="course-box__rating">
                                            ${Array(5 - course.courseAverageScore).fill(0).map((score) => '<img style="margin-left: -3px;" src="images/svgs/star.svg" alt="rating" class="course-box__star">').join('')}
                                            ${Array(course.courseAverageScore).fill(0).map((score) => '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">').join('')}
                                        </div>
                                    </div>
                                    <div class="course-box__status">
                                        <div class="course-box__users">
                                            <i class="fas fa-users course-box__users-icon"></i>
                                            <span class="course-box__users-count">${course.registers}</span>
                                        </div>
                                        <span class="course-box__price">${course.price === 0 ? 'رایگان' : `${course.price.toLocaleString()} افغانی`}</span>
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

    // ✅ بعد از render، Swiper را initialize کن
    new Swiper('.swiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    })

    return popularCourses
}

const getAndShowPresellCourses = async () => {
    const presellCoursesWrapper = document.querySelector('#presell-courses-wrapper')
    const response = await fetch(`http://localhost:4000/v1/courses/presell`)
    const presellCourses = await response.json()
    presellCourses.forEach((course) => {
        presellCoursesWrapper.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                            <div class="course-box">
                                <a href="#">
                                    <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course Image"
                                        class="course-box__img">
                                </a>
                                <div class="course-box__main">
                                    <a class="course-box__title" href="#">${course.name}</a>
                                    <div class="course-box__rating-teacher">
                                        <div class="course-box__teacher">
                                            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                            <a href="#" class="course-box__teacher-link">${course.creator}</a>
                                        </div>
                                        <div class="course-box__rating">
                                            ${Array(5 - course.courseAverageScore).fill(0).map((score) => '<img style="margin-left: -3px;" src="images/svgs/star.svg" alt="rating" class="course-box__star">').join('')}
                                            ${Array(course.courseAverageScore).fill(0).map((score) => '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">').join('')}
                                        </div>
                                    </div>
                                    <div class="course-box__status">
                                        <div class="course-box__users">
                                            <i class="fas fa-users course-box__users-icon"></i>
                                            <span class="course-box__users-count">${course.registers}</span>
                                        </div>
                                        <span class="course-box__price">${course.price === 0 ? 'رایگان' : `${course.price.toLocaleString()} افغانی`}</span>
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

    // ✅ بعد از render، Swiper را initialize کن
    new Swiper('.swiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    })

    return presellCourses
}

const getAndShowArticles = async () => {
    const articlesWrapper = document.querySelector('#articles-wrapper')
    const response = await fetch(`http://localhost:4000/v1/articles`)
    const articles = await response.json()

    articles.slice(0, 6).forEach((article) => {
        articlesWrapper.insertAdjacentHTML('beforeend', `
                <div class="col-4">
                        <div class="article-card">
                            <div class="article-card__header">
                                <a href="#" class="article-card__link-img">
                                    <img src=http://localhost:4000/courses/covers/${article.cover} alt="Article Cover" class="article-card__img">
                                </a>
                            </div>
                            <div class="article-card__content">
                                <a href="#" class="article-card__link">
                                    ${article.title}
                                </a>
                                <p class="article-card__text">
                                    ${article.description}
                                </p>
                                <a href="#" class="article-card__btn">بیشتر بخوانید</a>
                            </div>
                        </div>
                    </div>
            `)
    })

    return articles
}

const getAndShowNavbarMenus = async () => {
    const menusWrapper = document.querySelector('#menus-wrapper')
    const response = await fetch(`http://localhost:4000/v1/menus`)
    const menus = await response.json()
    menus.forEach((menu) => (
        menusWrapper.insertAdjacentHTML('beforeend', `
                <li class="main-header__item">
        <a href=category.html?cat=${menu.href} class="main-header__link">${menu.title}
            ${menu.submenus.length !== 0 ? `
            <i class="fas fa-angle-down main-header__link-icon"></i>
            <ul class="main-header__dropdown">
                ${menu.submenus.map(submenu => (
            `<li class="main-header__dropdown-item">
                    <a class="main-header__dropdown-link" href="#">${submenu.title}</a>
                </li>`
        )).join('')}
        </ul>
        ` : ''}
    </a>
</li>
            `)
    ))
    return menus
}

const getAndShowCategoryCourses = async () => {
    const categoryName = getUrlParam('cat')
    const response = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
    const courses = await response.json()

    return courses
}

const insertCourseBoxHTMLTemplate = (courses, showType, parentElement) => {
    parentElement.innerHTML = ''
    if (showType === 'row') {
        // parentElement.innerHTML = ''
        courses.forEach((course) => {
            parentElement.insertAdjacentHTML('beforeend', `
                <div class="col-4">
                        <div class="course-box">
                            <a href="#">
                                <img src="images/courses/js_project.png" alt="Course Image" class="course-box__img">
                            </a>
                            <div class="course-box__main">
                                <a class="course-box__title" href="#">${course.name}</a>
                                <div class="course-box__rating-teacher">
                                    <div class="course-box__teacher">
                                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                        <a href="#" class="course-box__teacher-link">${course.creator}</a>
                                    </div>
                                    <div class="course-box__rating">
                                        ${Array(5 - course.courseAverageScore).fill(0).map((score) => '<img style="margin-left: -3px;" src="images/svgs/star.svg" alt="rating" class="course-box__star">').join('')}
                                            ${Array(course.courseAverageScore).fill(0).map((score) => '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">').join('')}
                                    </div>
                                </div>
                                <div class="course-box__status">
                                    <div class="course-box__users">
                                        <i class="fas fa-users course-box__users-icon"></i>
                                        <span class="course-box__users-count">${course.registers}</span>
                                    </div>
                                    <span class="course-box__price">${course.price === 0 ? 'رایگان' : `${course.price.toLocaleString()} افغانی`}</span>
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

    } else {
        courses.forEach((course) => {
            parentElement.insertAdjacentHTML(
                "beforeend",
                `
      <div class="col-12">
      <div class="course-box">
          <div class="course__box-header">
              <div class="course__box-right">
                  <a class="course__box-right-link" href="#">
                      <img src=http://localhost:4000/courses/covers/${course.cover
                } class="course__box-right-img">
                  </a>
              </div>
              <div class="course__box-left">
                  <div class="course__box-left-top">
                      <a href="#" class="course__box-left-link">${course.name
                }</a>
                  </div>
                  <div class="course__box-left-center">
                      <div class="course__box-left-teacher">
                          <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                          <span class="course__box-left-name">${course.creator
                }</span>
                      </div>
                      <div class="course__box-left-stars">
                        ${Array(5 - course.courseAverageScore)
                    .fill(0)
                    .map(
                        (score) =>
                            '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                    )
                    .join("")}
                        ${Array(course.courseAverageScore)
                    .fill(0)
                    .map(
                        (score) =>
                            '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                    )
                    .join("")}
                      </div>
                  </div>
                  <div class="course__box-left-bottom">
                      <div class="course__box-left-des">
                          <p>امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به قدری
                              که
                              حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla Js پیاده
                              سازی
                              نمی کند و همیشه از کتابخانه ها و فریمورک های موجود استفاده می کند. پس
                              شما هم
                              اگه میخواید یک برنامه نویس عالی فرانت اند باشید، باید کتابخانه های
                              کاربردی
                              که در بازار کار استفاده می شوند را به خوبی بلد باشید</p>
                      </div>
                  </div>
                  <div class="course__box-footer">
                      <div class="course__box-footer-right">
                          <i class="course__box-footer-icon fa fa-users"></i>
                          <span class="course__box-footer-count">${course.registers
                }</span>
                      </div>
                      <span class="course__box-footer-left">${course.price === 0
                    ? "رایگان"
                    : course.price.toLocaleString()
                }</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
      `
            );
        });
    }
}

const coursesSorting = (array, filterMethod) => {
    let outputArray = []

    switch (filterMethod) {
        case 'free': {
            outputArray = array.filter(course => course.price === 0)
            break
        }
        case 'money': {
            outputArray = array.filter(course => course.price !== 0)
            break
        }
        case 'first': {
            outputArray = [...array].reverse()
            break
        }
        case 'last': {
            outputArray = array
            break
        }
        case 'default': {
            outputArray = array
            break
        }
        default:
            outputArray = array
    }

    return outputArray
}

export {
    showUsernameOnNavbar,
    renderTopBarMenus,
    getAndShowAllCourses,
    getAndShowAllPopularCourses,
    getAndShowPresellCourses,
    getAndShowArticles,
    getAndShowNavbarMenus,
    getAndShowCategoryCourses,
    insertCourseBoxHTMLTemplate,
    coursesSorting,
}



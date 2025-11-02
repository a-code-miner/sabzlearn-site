import { getAndShowAllCourses, getAndShowAllPopularCourses, getAndShowArticles, getAndShowPresellCourses } from "./funcs/shared.js"

const $ = document
const landingTitle = $.querySelector('.landing__title')
const landingCoursesCounter = $.querySelector('#courses-counter')
const landingMinutesCounter = $.querySelector('#minutes-counter')
const landingUsersCounter = $.querySelector('#users-counter')



window.addEventListener('load', () => {
    let landingText = 'ما به هر قیمتی آموزشی تولید نمی‌کنیم!'
    let typeIndex = 0

    typeWriter(landingText, typeIndex)
    makeCounter(40, landingCoursesCounter)
    makeCounter(3_320, landingMinutesCounter)
    makeCounter(3_071, landingUsersCounter)

    // console.log(getAndShowAllCourses())
    getAndShowAllCourses()
    getAndShowAllPopularCourses()
    getAndShowPresellCourses()
    getAndShowArticles().then(data => console.log(data))
})

function typeWriter(text, index) {
    if (index < text.length) {
        landingTitle.innerHTML += text[index]
        index++
    }

    setTimeout(() => {
        typeWriter(text, index)
    }, 100);
}

function makeCounter(max, elem) {
    let coursesCounter = 0
    const interval = setInterval(() => {
        if (coursesCounter === max) {
            clearInterval(interval)
        }
        elem.innerHTML = coursesCounter
        coursesCounter++
    }, 1)
}


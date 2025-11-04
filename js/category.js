import { getAndShowCategoryCourses } from "./funcs/shared.js";

window.addEventListener('load', () => {
    getAndShowCategoryCourses().then(responseCourses => {
        let courses = [...responseCourses]
        const categoryCoursesWrapper = document.querySelector('#category-courses-wrapper')
        let coursesShowType = 'row'
        const coursesShowTypeIcons = document.querySelectorAll('.courses-top-bar__icon-parent')

        // Show category courses By row showType
        if (courses.length) {
            courses.forEach((course) => {
                categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
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
            categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
                <div class="alert alert-danger">
                    هیچ دوره‌ای برای این دسته‌بندی وجود ندارد.
                </div>
            `)
        }

        coursesShowTypeIcons.forEach(coursesShowTypeIcon => {
            coursesShowTypeIcon.addEventListener('click', (event) => {
                coursesShowTypeIcons.forEach(icon => icon.classList.remove('courses-top-bar__icon--active'))
                event.currentTarget.classList.add('courses-top-bar__icon--active')
            })
        })
    })
})

import { getAndShowCategoryCourses, insertCourseBoxHTMLTemplate } from "./funcs/shared.js";

window.addEventListener('load', () => {
    getAndShowCategoryCourses().then(responseCourses => {
        let courses = [...responseCourses]
        const categoryCoursesWrapper = document.querySelector('#category-courses-wrapper')
        let coursesShowType = 'row'
        const coursesShowTypeIcons = document.querySelectorAll('.courses-top-bar__icon-parent')

        // Show category courses By row showType
        if (courses.length) {
            insertCourseBoxHTMLTemplate(courses, coursesShowType, categoryCoursesWrapper)
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
                if (String(event.currentTarget.classList).includes('row')) {
                    coursesShowType = 'row'
                    insertCourseBoxHTMLTemplate(courses, coursesShowType, categoryCoursesWrapper)
                } else {
                    coursesShowType = 'column'
                    insertCourseBoxHTMLTemplate(courses, coursesShowType, categoryCoursesWrapper)
                }
            })
        })
    })
})

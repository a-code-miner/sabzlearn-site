import { getAndShowCategoryCourses, insertCourseBoxHTMLTemplate } from "./funcs/shared.js";

window.addEventListener('load', () => {
    getAndShowCategoryCourses().then(responseCourses => {
        let courses = [...responseCourses]
        const categoryCoursesWrapper = document.querySelector('#category-courses-wrapper')
        let coursesShowType = 'row'
        const coursesShowTypeIcons = document.querySelectorAll('.courses-top-bar__icon-parent')
        const coursesFilteringSelections = document.querySelectorAll('.courses-top-bar__selection-item')
        const selectionTitleElem = document.querySelector('.courses-top-bar__selection-title')

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

        // Show category courses By row showType (User selection)
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

        coursesFilteringSelections.forEach(coursesFilteringSelection => {
            coursesFilteringSelection.addEventListener('click', (event) => {
                coursesFilteringSelections.forEach(selectionElem => selectionElem.classList.remove('courses-top-bar__selection-item--active'))
                event.target.classList.add('courses-top-bar__selection-item--active')
                selectionTitleElem.innerHTML = ''
                selectionTitleElem.insertAdjacentHTML('beforeend', `
                            ${event.target.innerHTML}
                            <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
                    `)
            })
        })

    })
})

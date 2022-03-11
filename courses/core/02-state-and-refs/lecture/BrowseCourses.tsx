import { useState } from 'react'
import { Heading } from 'course-platform/Heading'
import { Counter } from './Counter'
import { AddCourse } from './AddCourse'

export function BrowseCourses() {
  const [minLessons, setMinLessons] = useState(0)

  const [courses, setCourses] = useState([
    { id: 1, name: 'React', lessons: 5 },
    { id: 2, name: 'JavaScript', lessons: 4 },
    { id: 3, name: 'CSS', lessons: 3 },
  ])

  const filteredCourses = courses.filter((course) => {
    return course.lessons >= minLessons
  })

  return (
    <div className="card spacing">
      <AddCourse
        onSubmit={(values) => {
          setCourses(courses.concat({ ...values, id: courses.length + 1 }))
        }}
      />
      <hr />
      <div className="flex-split">
        <Heading size={1}>Courses</Heading>
        <div className="text-center spacing">
          <div className="text-small">At least {minLessons} lessons</div>
          {/* <Counter count={minLessons} setCount={(newCount) => { setMinLesson(newCount) }} /> */}
          <Counter count={minLessons} setCount={setMinLessons} />
        </div>
      </div>
      <div className="spacing">
        {filteredCourses.map((course) => {
          return (
            <div key={course.id} className="course-listing flex-split">
              <Heading as="h2" size={3}>
                {course.name}
              </Heading>
              <div>Lessons: {course.lessons}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

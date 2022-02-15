import { Outlet, NavLink } from 'react-router-dom'
import { Icon } from 'course-platform/Icon'
import styles from '../../../../apps/course-platform/AppSubLayouts/AppSubLayouts.module.scss'

export function AppSubLayout() {
  return (
    <div className={styles.component}>
      <header className="flex-split">
        <nav className="horizontal-spacing-large">
          <NavLink to="." end>
            <Icon name="home" />
            <span>All Courses</span>
          </NavLink>
          <NavLink to="add" end>
            <Icon name="createCourse" />
            <span>Add Course</span>
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

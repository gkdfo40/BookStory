import { NavLink } from 'react-router-dom'
import styles from './gnb.module.scss'
import cx from 'classnames'
import { BarChartIcon, BookMarkIcon, HomeIcon, SearchIcon } from 'assets/svgs'

const GNB = () => {
  return (
    <div className={styles.gnb}>
      <ul className={styles.navWrapper}>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <HomeIcon className={styles.navIcon} />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='bookmark' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <BookMarkIcon className={styles.navIcon} />
            <span>BookMark</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='search' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <SearchIcon className={styles.navIcon} />
            <span>Search</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='profile' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <BarChartIcon className={styles.navIcon} />
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default GNB

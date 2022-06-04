import { Routes, Route } from 'react-router-dom'

import HomePage from './HomePage/HomePage'
import BookMarkPage from './BookMarkPage/BookMarkPage'
import SearchPage from './SearchPage/SearchPage'
import ProfilePage from './ProfilePage/ProfilePage'
import BookCardModal from 'components/BookCardModal/BookCardModal'
import GNB from './GNB/GNB'

import styles from './Routes.module.scss'

const App = () => {
  return (
    <div className={styles.container}>
      <main className={styles.mainpage}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='bookmark' element={<BookMarkPage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='profile' element={<ProfilePage />} />
        </Routes>
        <BookCardModal />
      </main>
      <GNB />
    </div>
  )
}

export default App

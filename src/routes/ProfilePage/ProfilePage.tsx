import { useRecoilState } from 'recoil'
import { storedBookMarklist } from 'states/state'

interface chartData {
  x: string
  y: string
}
const ProfilePage = () => {
  const [BookMarkList] = useRecoilState(storedBookMarklist)
  const ChartData: chartData[] = []
  BookMarkList.forEach((book) => {
    ChartData.push({ x: book.categoryName, y: book.title })
  })
  return (
    <div>
      <div>여기는 타이틀 자리</div>
      <div>여기는 차트자리</div>
      <div>여기는 추천 카테고리 베스트 셀러자리</div>
    </div>
  )
}
export default ProfilePage

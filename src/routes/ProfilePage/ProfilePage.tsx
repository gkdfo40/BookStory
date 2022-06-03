import { useRecoilState } from 'recoil'
import { storedBookMarklist } from 'states/state'
import { VictoryPie } from 'victory'

import styles from './profilePage.module.scss'

interface chartData {
  x: string
  y: number
}
const ProfilePage = () => {
  const [BookMarkList] = useRecoilState(storedBookMarklist)
  const dictObj: { [key: string]: number } = {}
  const PieChartData: chartData[] = []

  BookMarkList.forEach((book) => {
    const key = book.categoryName.split('>')[2]
    if (key in dictObj) dictObj[key] += 1
    else dictObj[key] = 1
  })

  for (const [key, value] of Object.entries(dictObj)) {
    PieChartData.push({ x: key, y: value })
  }
  console.log(PieChartData)
  return (
    <div className={styles.container}>
      <div>Profile</div>
      <div>
        <VictoryPie
          style={{ labels: { fill: 'purple' } }}
          innerRadius={100}
          labelRadius={120}
          labels={({ datum }) => `${datum.x}:${datum.y}`}
          data={PieChartData}
        />
      </div>
      <div>Recommend For You</div>
    </div>
  )
}
export default ProfilePage

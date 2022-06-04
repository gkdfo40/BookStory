import { useRecoilState } from 'recoil'
import { storedBookMarklist } from 'states/state'
import { VictoryLegend, VictoryPie } from 'victory'

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

  return (
    <div className={styles.container}>
      <div>Profile</div>
      <div>
        <h1>Summary</h1>
        <VictoryPie
          colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
          width={300}
          height={300}
          style={{ labels: { fill: 'purple' } }}
          innerRadius={80}
          startAngle={90}
          endAngle={-90}
          labels={() => ''}
          data={PieChartData}
        />
      </div>
      <div>Recommend For You</div>
    </div>
  )
}
export default ProfilePage

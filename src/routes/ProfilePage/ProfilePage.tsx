import { useRecoilState } from 'recoil'
import { storedBookMarklist } from 'states/state'
import { VictoryLabel, VictoryLegend, VictoryPie } from 'victory'

import styles from './profilePage.module.scss'

interface chartData {
  x: string
  y: number
}
const ProfilePage = () => {
  const [BookMarkList] = useRecoilState(storedBookMarklist)
  const dictObj: { [key: string]: number } = {}
  const PieChartData: chartData[] = []
  const LabelData: { name: string }[] = []

  BookMarkList.forEach((book) => {
    const key = book.categoryName.split('>')[2]
    if (key in dictObj) dictObj[key] += 1
    else dictObj[key] = 1
  })

  for (const [key, value] of Object.entries(dictObj)) {
    PieChartData.push({ x: key, y: value })
  }
  PieChartData.map((data) => LabelData.push({ name: data.x }))

  return (
    <div className={styles.container}>
      <h1>Summary</h1>
      <div className={styles.chart}>
        <svg viewBox='0 0 360 160' width='360px' height='320px'>
          <VictoryPie
            padding={0}
            width={350}
            height={350}
            standalone={false}
            colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
            innerRadius={130}
            startAngle={90}
            endAngle={-90}
            labels={() => null}
            data={PieChartData}
          />
          <VictoryLabel
            textAnchor='middle'
            verticalAnchor='middle'
            x={175}
            y={145}
            text={`${BookMarkList.length}`}
            style={{ fontSize: 50 }}
          />
        </svg>
        <VictoryLegend
          orientation='vertical'
          centerTitle
          colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
          style={{
            labels: { fontSize: 23, fontWeight: 700 },
          }}
          data={LabelData}
        />
      </div>

      <div>Recommend For You</div>
    </div>
  )
}
export default ProfilePage

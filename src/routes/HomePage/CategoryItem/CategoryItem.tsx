import {
  ActionIcon,
  AdventureIcon,
  AutoBiographyIcon,
  ComedyIcon,
  DramaIcon,
  DystopiaIcon,
  HorrorIcon,
  MysteryIcon,
  RomanceIcon,
  SciFiIcon,
  SelfHelpIcon,
  ThrillerIcon,
} from 'assets/svgs/category'
import cx from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { homePageCategoryState } from 'states/state'
import styles from './categoryItem.module.scss'

interface ItemProps {
  categoryNM: string
}

const CategoryItem = ({ categoryNM }: ItemProps) => {
  const [currentCategoryState, setCurrentCategory] = useRecoilState(homePageCategoryState)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (currentCategoryState === categoryNM) setIsActive(true)
    else setIsActive(false)
  }, [categoryNM, currentCategoryState])

  const IconSymbol = useMemo(() => {
    const iconSymbol =
      {
        action: <ActionIcon className={styles.icon} />,
        adventure: <AdventureIcon className={styles.icon} />,
        autobiography: <AutoBiographyIcon className={styles.icon} />,
        comedy: <ComedyIcon className={styles.icon} />,
        drama: <DramaIcon className={styles.icon} />,
        dystopia: <DystopiaIcon className={styles.icon} />,
        horror: <HorrorIcon className={styles.icon} />,
        mystery: <MysteryIcon className={styles.icon} />,
        romance: <RomanceIcon className={styles.icon} />,
        scifi: <SciFiIcon className={styles.icon} />,
        selfhelp: <SelfHelpIcon className={styles.icon} />,
        thriller: <ThrillerIcon className={styles.icon} />,
      }[categoryNM] ?? null
    return iconSymbol
  }, [categoryNM])
  const onClickCategoryButton = () => {
    setCurrentCategory(categoryNM)
  }
  return (
    <button type='button' className={cx(styles.categoryButton, { isActive })} onClick={onClickCategoryButton}>
      {IconSymbol}
      <p>{categoryNM}</p>
    </button>
  )
}
export default CategoryItem

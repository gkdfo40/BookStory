import { useMemo } from 'react'
import { useRecoilState } from 'recoil'
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
import { homePageCategoryState } from 'states/state'

import styles from './categoryItem.module.scss'

interface ItemProps {
  categoryNM: string
}

const CategoryItem = ({ categoryNM }: ItemProps) => {
  const [, setCurrentCategory] = useRecoilState(homePageCategoryState)

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
    <button type='button' className={styles.categoryButton} onClick={onClickCategoryButton}>
      {IconSymbol}
      <p>{categoryNM}</p>
    </button>
  )
}
export default CategoryItem

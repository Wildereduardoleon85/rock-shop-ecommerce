import { getClassNames } from '../../../utils'
import styles from './SmallLoader.module.scss'

type SmallLoaderProps = {
  className?: string
}

function SmallLoader({ className = '' }: SmallLoaderProps) {
  return <span className={getClassNames([styles.loader, className])} />
}

export default SmallLoader

import styles from "./style.module.css"

type Props = {
  textButton: string
}

export function Button({textButton}: Props){
  return(
    <button className={styles.button} type="button">
      {textButton}
    </button>
  )
}
import styles from "./style.module.css"

type Props = {
  value?: string
  color?: "default" | "correct" | "wrong"
  size?: "default" | "small"
}


export function Letter({value, color = "default", size = "default"}: Props){
  return (
    <div className={`
    ${styles.letter} 
    ${color === "correct" ? styles.letterCorrect : ""}
    ${color === "wrong" ? styles.letterWrong : ""}
    ${size === "small" ? styles.letterSmall : ""}
    `}> 
    <span>{value}</span>
    </div>
  )
}
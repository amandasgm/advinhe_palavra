import styles from "./style.module.css"

type Props = React.ComponentProps<"button"> & {
  textButton: string;
  status: "playing" | "win" | "lose"
}

export function Button({textButton, status, ...rest}: Props){
  return(
    <button className={`${styles.button} ${status === "win" ? styles.win : status === "lose" ? styles.lose : styles.playing}`} type="button" {...rest}>
      {textButton} 
    </button>
  )
}
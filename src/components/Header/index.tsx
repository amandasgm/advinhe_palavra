import logo from "../../assets/logo.png"
import restart from "../../assets/restart.svg"

import styles from "./style.module.css"

type Props = {
  current: number
  maximo: number
  onRestart: () => void
}


export function Header({current, maximo, onRestart}: Props){
  return (
    <div className={styles.container}>
      <img src={ logo } alt="Logo" />
      <header>
        <span>
          <strong>{current}</strong> de {maximo} tentativas
        </span> 
        <button>
          <img src={restart} alt="logo" onClick={() => onRestart()} />
        </button>
      </header>
    </div>
  )
}
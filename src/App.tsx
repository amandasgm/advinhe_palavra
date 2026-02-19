import { Header } from "../src/components/Header/index";
import { Tip } from "../src/components/Tip/index";
import { Button } from "../src/components/Button/index";
import { Input } from "../src/components/Input/index";
import { Letter } from "../src/components/Letter/index";
import { LetterUsed } from "./components/LetterUsed";

import styles from "./app.module.css";

export function App() {
  return (
    <div className={styles.container}>
      <main>
        <Header current={0} maximo={10} onRestart={() => {}}></Header>
        <Tip tip="Uma das linguagens de programação mais utilizadas." />

        <div className={styles.word}>
          <Letter value="R" />
          <Letter value="a" />
          <Letter value="c" />
        </div>

        <div>
          <Input autoFocus maxLength={1} placeholder="?" />
          <Button textButton="Confirmar" />
        </div>
      </main>
    </div>
  );
}

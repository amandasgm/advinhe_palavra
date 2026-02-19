import styles from "./style.module.css";
import { Letter } from "../Letter/index";

export type LetterUsed = {
  value: string;
  correct: boolean; // falso ou verdadeiro
};

type Props = {
  data: LetterUsed[];
};

export function LetterUsed({ data }: Props) {
  return (
    <div className={styles.letterUsed}>
      <h5>Letras usadas</h5>

      <div className={styles.letterSmall}>
        {data.map(({ value, correct }) => (
          <Letter
            value={value}
            color={correct ? "correct" : "wrong"}
            size="small"
          />
        ))}
      </div>
    </div>
  );
}

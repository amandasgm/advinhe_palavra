import { Header } from "../src/components/Header/index";
import { Tip } from "../src/components/Tip/index";
import { Button } from "../src/components/Button/index";
import { Input } from "../src/components/Input/index";
import { Letter } from "../src/components/Letter/index";
import { LetterUsed } from "../src/components/LetterUsed/index";

import { WORDS } from "./utils/words";
import type { Challenge } from "./utils/words";
import type { LetterUsedProps } from "./components/LetterUsed/index";

import { useState, useEffect } from "react";

import styles from "./app.module.css";

export function App() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [letter, setLetter] = useState("");
  const [tip, setTip] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LetterUsedProps[]>([]);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length); // sortear um item aleatório entre os itens de WORDS
    const randomWord = WORDS[index]; // selecionou o objeto do array WORDS
    setChallenge(randomWord); // setou o estado do desafio com o objeto sorteado
    setTip(randomWord.tip); // setou o estado da dica com a dica do objeto sorteado
    setLettersUsed([])
    setScore(0)
  }

  // derived boolean that says whether every letter of the challenge
  // has already been revealed by a correct guess. duplicates are handled
  // because we check the actual word characters, not lettersUsed length.
  const wordComplete = Boolean(
    challenge &&
    challenge.word
      .split("")
      .every((l) =>
        lettersUsed.some(
          (item) =>
            item.value.toLocaleUpperCase() === l.toLocaleUpperCase() &&
            item.correct,
        ),
      ),
  );

  function handleConfirm() {
    if (!challenge) return; // sem desafio não faz nada

    if (wordComplete) {
      // já ganhou, nada mais deve ser processado
      return;
    }

    if (!letter) {
      alert("Digite uma letra!"); // se não tiver letra, mostra um alerta
      return;
    }

    const value = letter.toUpperCase();

    if (value.trim() === "" || !/^[A-Z]$/.test(value)) {
      alert("Digite uma letra válida!");
      setLetter("");
      return;
    }

    const exists = lettersUsed.find(
      (item) => item.value.toLocaleUpperCase() === value,
    ); // compara a letra digitada com as usadas

    if (exists) {
      alert("Letra já usada!");
      setLetter("");
      return;
    }

    const iguais = challenge.word
      .toLocaleUpperCase()
      .split("")
      .filter((l) => l === value).length;

    const correct = iguais > 0;
    // only increment score when the guess is wrong
    const newScore = correct ? score : score + 1;

    // se a letra não existe na palavra e o número de erros (score) já alcançou as tentativas,
    // termina o jogo antes de adicionar a letra usada
    if (!correct && newScore >= Number(challenge.attemps)) {
      alert(`Game Over! A palavra era ${challenge.word}`);
      startGame();
      setLettersUsed([]);
      setScore(0);
      return;
    }

    setLettersUsed((prev) => [...prev, { value, correct }]);
    setLetter("");
    setScore(newScore);

    if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 500); // remove o shake após 500ms
    }
  }

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={score}
          maximo={challenge?.attemps}
          onRestart={() => {startGame()}}
        />
        <Tip tip={tip} />

        <div className={`${styles.word} ${shake && styles.shake}`}>
          {challenge?.word.split("").map((l, index) => {
            // check if this letter has been guessed correctly
            const used = lettersUsed.find(
              (item) =>
                item.value.toLocaleUpperCase() === l.toLocaleUpperCase() &&
                item.correct,
            );

            return <Letter key={index} value={used ? l.toUpperCase() : ""} />;
          })}
        </div>

        <div>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirm();
            }}
            onChange={(e) => setLetter(e.target.value)}
            disabled={wordComplete}
          />
          <Button
            textButton="Confirmar"
            onClick={handleConfirm}
            status={wordComplete ? "win" : "playing"}
          />
        </div>

        <LetterUsed data={lettersUsed} />
      </main>
    </div>
  );
}

export type Challenge = {
  id: number;
  word: string;
  tip: string;
  attemps: string;
};

export const WORDS: Challenge[] = [
  { id: 1, word: "CSS", tip: "Linguagem de estilos", attemps: "5" },
  { id: 2, word: "REACT", tip: "Biblioteca para criar interfaces Web", attemps: "7"},
  { id: 3, word: "HTML", tip: "Linguagem de marcação", attemps: "6"},
  {
    id: 4,
    word: "Javascript",
    tip: "Uma das linguagens de programação mais utilizadas no mundo",
    attemps: "12"
  },
  { id: 5, word: "Typescript", tip: "Para adicionar tipagem no Javascript", attemps: "12" },
];

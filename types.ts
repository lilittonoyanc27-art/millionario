export interface OptionItem {
  key: 'a' | 'b' | 'c' | 'd';
  es: string;
  hy: string;
  isCorrect: boolean;
}

export interface QuestionItem {
  id: number;
  esDialog: {
    speaker1: string;
    speaker2: string;
  };
  hyDialog: {
    speaker1: string;
    speaker2: string;
  };
  options: OptionItem[];
  correctKey: 'a' | 'b' | 'c' | 'd';
  explanation?: string;
  prizeMoney: string;
}

export interface NumberBonusItem {
  id: number;
  number: number;
  spanish: string;
  armenianNote?: string;
}

export type QuestionCardType = {
    el: number,
    question: string,
    type: string,
    setQuestionStates: React.Dispatch<React.SetStateAction<boolean[]>>,
    questionStates: boolean[],
    min: string,
    max: string
};

export type StoreState = {
    questionStates: boolean[],
    moveToNextQuestion: (index: number) => void

}
export const checkIfEssayQuestionEmpty = (questions) => {
    for (var i = 0; i < questions.length; i++){
        if (questions[i] === "") {
            return true;
        }
    }
    return false;
}
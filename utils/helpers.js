export function doesTitleExistInDecks(decks, title) {
    let exists = false
    Object.keys(decks).every((key) => {
            if(decks[key].title === title){
                exists = true
            }
        })
    return exists
}
export function doesQuestionExistInQuestions(questions, question) {
    var results = questions.filter((entry) =>{ return entry.question === question; })
    return results.length > 0
}
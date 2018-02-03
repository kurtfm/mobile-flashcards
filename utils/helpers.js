export function doesTitleExistInDecks(decks, title) {
    let exists = false
    Object.keys(decks).every((key) => {
            if(decks[key].title === title){
                exists = true
            }
        })
    return exists
}
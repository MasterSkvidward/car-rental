export const directSearch = (text:string, word:string):boolean => {
    text = text.toLowerCase();
    word = word.toLowerCase();

    for (let i = 0; i < text.length - word.length + 1; i++) {
        for (let j = 0; j < word.length; j++) {
            if (word[j] !== text[i+j])
                break;
            else if (j === word.length - 1){
                return true;
            }
        }
    }
    return false;
}
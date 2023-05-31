// import { of } from "core-js/core/array";

const letterPool = {'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9, 
            'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1,'R': 6, 'S': 4, 
            'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1}

const create_dict_of_10_letters = () => {
  alphabet_dict = {...letterPool}

  let dict_of_10_letters = {};
  let total_letters_dict = 0;
  while (total_letters_dict < 10) {
      let letter = Object.keys(alphabet_dict)[Math.floor(Math.random()*Object.keys(alphabet_dict).length)]
      if (alphabet_dict.letter < 1) {
          continue
      } else if (letter in dict_of_10_letters) {
          dict_of_10_letters[letter] += 1
          alphabet_dict[letter] -= 1
          total_letters_dict += 1
      } else { 
          dict_of_10_letters[letter] = 1
          alphabet_dict[letter] -= 1
          total_letters_dict += 1
      }
  }
  return dict_of_10_letters
}

export const drawLetters = () => {
  selected_dict = create_dict_of_10_letters()
    list_of_letters = []
    for (const [key, value] of Object.entries(selected_dict)) {
        for (let i = 0; i < value; i++){
          list_of_letters.push(key)
        }
    }
    return list_of_letters
};

export const usesAvailableLetters = (input, lettersInHand) => {
    let listLettersFromWord = input.toUpperCase().split("")

    while (listLettersFromWord.length > 0) {
        let letter = listLettersFromWord[0]
        if (lettersInHand.includes(letter)) {
            let index = lettersInHand.indexOf(letter)
            lettersInHand.splice(index, 1)
            listLettersFromWord.splice(0, 1)
        } else {
            return false
        }
    }
    return true
};

export const scoreWord = word => {
  scoreChart = {
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1, 'D': 2, 'G': 2,'B': 3, 
    'C': 3, 'M': 3, 'P': 3, 'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,'K': 5, 'J': 8, 'X': 8,'Q': 10, 
    'Z': 10}
  let listFromWord = word.toUpperCase().split("")
  totalPoints = 0
  for (const letter of listFromWord) {
    if (letter in scoreChart) {
      totalPoints += scoreChart[letter]
    }
  }
  if (word.length > 6) {
    totalPoints += 8
  }
  return totalPoints
};

const findMaxOf2Tuples = (tuple1, tuple2) => {
    if (tuple1 === null) {
        return tuple2
    }

    const scoreTuple1 = tuple1[1];
    const scoreTuple2 = tuple2[1];
    const lenTuple1 = tuple1[0].length;
    const lenTuple2 = tuple2[0].length;
    if (scoreTuple1 == scoreTuple2 && lenTuple1 == 10){
        return tuple1
    } else if (scoreTuple1 == scoreTuple2 && lenTuple1 < lenTuple2) {
        return tuple1
    } else if (scoreTuple1 == scoreTuple2 && lenTuple1 == lenTuple2) {
        return tuple1
    } else if (scoreTuple1 > scoreTuple2) {
        return tuple1
    } else {
        return tuple2
    }
};

export const highestScoreFrom = (words) => {
    
  let compareScores = [];
  for (const word of words) {
      let scorePerWord = scoreWord(word);
      let smallList = [word, scorePerWord];
      //let tuple = `('${smallList.join("','")}')`
      compareScores.push(smallList)
  }
  // let listEntries = Object.entries(compareScores);
  let sortedTupleScores = compareScores.sort((a, b) => a[1] - b[1]);
  
  let highestScore = null;
  for (let i = 0; i < sortedTupleScores.length; i++) {
      let tupleElement = sortedTupleScores[i]
      let checkHigherScore = findMaxOf2Tuples(highestScore, tupleElement)
      highestScore = checkHigherScore;
  }
  return `{word: ${highestScore[0]} score: ${highestScore[1]}}`
};
console.log(highestScoreFrom(["daniel", "daniela", "tomas"]))
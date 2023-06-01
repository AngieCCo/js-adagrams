
const letterPool = {'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9, 
            'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1,'R': 6, 'S': 4, 
            'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1}

export default class Adagrams {
  // constructor() {}

  createDictOf10Letters = () => {
    const alphabetDict = {...letterPool}
  
    let dictOf10Letters = {};
    let totalLetters = 0;
    while (totalLetters < 10) {
        let letter = Object.keys(alphabetDict)[Math.floor(Math.random()*Object.keys(alphabetDict).length)]
        if (alphabetDict[letter] < 1) {
            continue
        } else if (letter in dictOf10Letters) {
            dictOf10Letters[letter] += 1
            alphabetDict[letter] -= 1
            totalLetters += 1
        } else { 
            dictOf10Letters[letter] = 1
            alphabetDict[letter] -= 1
            totalLetters += 1
        }
    }
    return dictOf10Letters
  }

  drawLetters = () => {
    const selectedDict = this.createDictOf10Letters()
    let listOfLetters = []
    for (const [key, value] of Object.entries(selectedDict)) {
        for (let i = 0; i < value; i++){
          listOfLetters.push(key)
        }
    }
    return listOfLetters
  };

  scoreWord = word => {
    const scoreChart = {
      'A': 1, 'E': 1, 'I': 1, 'O': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1, 'D': 2, 'G': 2,'B': 3, 
      'C': 3, 'M': 3, 'P': 3, 'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,'K': 5, 'J': 8, 'X': 8,'Q': 10, 
      'Z': 10}
    if (word.length === 0) {
      return 0
    }
    let listFromWord = word.toUpperCase().split("")
    let totalPoints = 0
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

  usesAvailableLetters = (input, lettersInHand) => {
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

findMaxOf2Tuples = (tuple1, tuple2) => {
  if (tuple1 === null) {
      return tuple2
  }

  const scoreTuple1 = tuple1[1];
  const scoreTuple2 = tuple2[1];
  const lenTuple1 = tuple1[0].length;
  const lenTuple2 = tuple2[0].length;
  if (scoreTuple1 === scoreTuple2 && lenTuple1 == 10) {
      return tuple1
  } else if (scoreTuple1 == scoreTuple2 && lenTuple2 == 10) {
      return tuple2
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


highestScoreFrom = (words) => {
    
  let compareScores = [];
  for (const word of words) {
      let scorePerWord = this.scoreWord(word);
      let smallList = [word, scorePerWord];
      compareScores.push(smallList)
  }

  let sortedTupleScores = compareScores.sort((a, b) => a[1] - b[1]);
  let highestScore = null;
  for (let i = 0; i < sortedTupleScores.length; i++) {
      let tupleElement = sortedTupleScores[i]
      let checkHigherScore = this.findMaxOf2Tuples(highestScore, tupleElement)
      highestScore = checkHigherScore;
  }
  let resultDict = {'word': highestScore[0], 'score': highestScore[1]}
  return resultDict
};


















}
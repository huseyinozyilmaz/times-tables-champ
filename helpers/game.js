import { URL } from "./leaderboard"

export class Game {

  constructor(level) {
    this.level = level ? level : 3
    this.life = 3
    this.score = 0
    this.matrix = [[]]
    this.questions = []
    this.maxLevel = 12
    this.status = ''
    this.question = {}
    this.counts = { remaining: level * 12, answered: 0, total: level * 12 } 
    this.answers = []
  }

  init(selectedLevel) {
    this.life = 3
    this.score = 0
    this.level = selectedLevel ? selectedLevel : 3
    this.matrix = generateMatrix()
    this.questions = []
    this.maxLevel = 12
    this.question = {}
    this.counts = { remaining: this.level * 12, answered: 0, total: this.level * 12 } 

    /** Testing purposes */
    // this.counts = { remaining: 3, answered: 0, total: 3 } 

    while (this.questions.length < this.counts.total) {
      let newQuestion = this.ask()
      // Only unique questions
      if (!this.questions.find(q => q.id === newQuestion.id)) {
        this.questions.push(newQuestion)
      }
    }
    this.status = 'ready'
  }

  run() {
    if (this.status === 'ready') {
      this.question = this.questions[0]
      this.status = 'running'
    }
  }

  ask () {
    const x = randomInt(1, this.level)
    const y = randomInt(1, this.matrix.length - 1)
    const multipliers = shuffle([x, y])

    return {
      id: `${multipliers[0]}x${multipliers[1]}`,
      multipliers,
      options: generateOptions(x, y, this.matrix)
    }
  }

  async save(player) {
    const data = {
      player,
      score: this.score,
      badges: []
    }
    await $fetch(URL, {
      method: 'POST',
      body: data
    })
  }

  next () {
    this.question = this.questions[this.counts.answered]
  }

  isFinished () {
    return this.counts.remaining === 0
  }

  submit (response) {
    if (this.question.answer) {
      return this.question.answer
    }

    if (!isAnswerCorrect(this.question, response.answer)) {
      this.life--
      this.status = this.life < 1 ? 'over' : this.status
      return {
        status: 'error',
        answer: solveQuestion(this.question),
        message: getFailureMessage()
      }
    }

    const answer = {
      status: 'success',
      answer: solveQuestion(this.question),
      message: getSuccessMessage()
    }

    this.question.answer = answer
    this.counts.answered++
    this.counts.remaining--
    
    this.status = this.counts.remaining === 0 ? 'finished' : this.status

    this.score += calculateScore(response)
    return answer
  }
}

const isAnswerCorrect = (question, answer) => {
  return solveQuestion(question) === answer
}

const solveQuestion = (question) => {
  return question.multipliers[0] * question.multipliers[1]
}

const calculateScore = (response) => {
  return response.answer
}
const findNear = (point, min, max) => {
  return randomInt(point-2 > min ? point-2 : min, point + 2 > max ? max : point + 2 ) 
}

const  shuffle = (array) => {
  let currentIndex = array.length, randomIndex
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ]
  }
  return array
}

const generateOptions = (x, y, matrix) => {
  const options = new Set()
  options.add (matrix[x][y])
  while (options.size < 4) {
    let nearX = findNear(x, 1, matrix.length - 1)
    let nearY = findNear(y, 1, matrix.length - 1)
    options.add(matrix[nearX][nearY])
  }
  return shuffle(Array.from(options))
}

const generateMatrix = () => {
  const matrix = []
  for (let i = 0; i <=12; i++) {
    const row = []
    for (let j = 0; j <=12; j++) {
      row[j] = i * j
    }
    matrix[i] = row
  }
  return matrix
}

export const getSuccessMessage = () => {
  const messages = [
    "Bingo! You nailed it!",
    "That's it! You're on fire!",
    "Correct! You're a true mastermind.",
    "Well done! Your guess is spot-on.",
    "Absolutely right! You're crushing it.",
    "Fantastic! You've got the magic touch.",
    "Yes, yes, yes! You're unstoppable.",
    "Bravo! Your intuition is impressive.",
    "Spotless victory! You got it right.",
    "Excellent guess! You're a genius.",
    "Right on the money! You're unbeatable.",
    "Amazing! Your instincts are sharp.",
    "You're on a roll! Correct again.",
    "Outstanding! You cracked the code.",
    "Hooray! Another perfect guess!",
    "Genius move! You're in the zone.",
    "Incredible! Your guess is golden.",
    "Marvelous! You're acing this game.",
    "Nailed it! Your answers are top-notch.",
    "Perfecto! You're the answer maestro."
  ]
  return messages[randomInt(0, messages.length - 1)]
}

export const getFailureMessage = () => {
  const messages = [
    "Oops, not quite! Keep trying, you'll get it.",
    "Almost there! Give it another shot.",
    "Not this time, but don't give up!",
    "Nice try! The correct answer is still out there.",
    "Close, but no right. Keep guessing!",
    "Oh no, that's not it. But you're getting warmer!",
    "A valiant effort, but not the right answer. Try again!",
    "Nope, that's not the one. Keep guessing!",
    "Not quite, but I believe in your next guess!",
    "Almost had it! Give it another go.",
    "Not the answer this time, but you're learning!",
    "Oh dear, that's not it. Try a different approach.",
    "Incorrect, but keep those guesses coming!",
    "Almost a bullseye! Try adjusting your aim.",
    "Not the right answer, but you're getting closer!",
    "Nice attempt! Shake it off and try again.",
    "Oops, that's a miss. But the next one might be it!",
    "Incorrect, but don't let it discourage you.",
    "Not quite right, but you're making progress!",
    "Close, but no dice. Keep at it, you'll crack it!"
  ]
  return messages[randomInt(0, messages.length - 1)] 
}

const randomInt = (min, max) => { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

import { URL } from "./leaderboard"

export class Game {

  constructor(level, config) {
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
    this.timeout = 100 //10 Sec based on interval of 100
    this.config = config
  }

  init(selectedLevel) {
    this.life = 3
    this.score = 0
    this.level = selectedLevel ? selectedLevel : 3
    this.matrix = generateMatrix()
    this.questions = generateQuestions(this.level, this.maxLevel, this.matrix, this.config.testing)
    this.question = {}
    this.counts = { remaining: this.questions.length, answered: 0, total: this.questions.length } 

    this.status = 'ready'
  }

  run() {
    if (this.status === 'ready') {
      this.question = this.questions[0]
      this.status = 'running'
    }
  }

  async save(player) {
    const data = {
      player,
      score: this.score,
      badges: calculateBadges(this.answers, this.life, this.level)
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

  /**
   * Player's respond to a question
   * @param {Object} response 
   * @returns {Object} answer
   */
  submit (response) {
    if (this.question.answer) {
      return this.question.answer
    }

    const time = calculateTime(response.timeElapsed, this.timeout)
    const isCorrect = isAnswerCorrect(this.question, response.answer)
    const result = isCorrect ? 'success' : time.isUp ? 'timeout' : 'error'
    const message = getMessageByResult(result)
    const score = calculateScore(response, isCorrect)

    const answer = {
      status: result,
      answer: solveQuestion(this.question),
      message,
      score,
      time
    }

    this.answers[this.question.id] = answer

    if (!isCorrect) {
      this.life--
      this.status = this.life < 1 ? 'over' : this.status
      if (!time.isUp) {
        return answer
      }
    }

    this.question.answer = answer
    this.counts.answered++
    this.counts.remaining--

    this.status = this.counts.remaining === 0 ? 'finished' : this.status
    this.score += score.value
    return answer
  }
}

const isAnswerCorrect = (question, answer) => {
  return solveQuestion(question) === answer
}

const solveQuestion = (question) => {
  return question.multipliers[0] * question.multipliers[1]
}

const calculateScore = (response, answeredCorrectly) => {
  if (!answeredCorrectly) {
    return { value: 0, bonus: '' }
  }
  if (response.timeElapsed < 10) {
    return { value: response.answer * 3, bonus: '3x' }
  }
  if (response.timeElapsed < 20) {
    return { value: response.answer * 2, bonus: '2x' }
  }
  if (response.timeElapsed < 30) {
    return { value: Math.round(response.answer * 1.4), bonus: '' }
  }
  if (response.timeElapsed < 40) {
    return { value: Math.round(response.answer * 1.3), bonus: '' }
  }
  if (response.timeElapsed < 60) {
    return { value: Math.round(response.answer * 1.2), bonus: '' }
  }
  if (response.timeElapsed < 80) {
    return { value: Math.round(response.answer * 1.1), bonus: '' }
  }
  return { value: response.answer, bonus: '' }
}

const isTimeout = (timeElapsed, timeout) => {
  return timeElapsed >= timeout
}

const calculateTime = (timeElapsed, timeout) => {
  return {
    elapsed: timeElapsed,
    remaining: timeout - timeElapsed,
    isUp: isTimeout(timeElapsed, timeout)
  }
}

const calculateBadges = (answers, remainingLife, level) => {
  const earnedBadges = []
  if (remainingLife < 3) {
    return earnedBadges
  }

  earnedBadges.push('L'+ level)

  if (level < 12) {
    return earnedBadges
  }

  if (!answers.find(e => e.timeElapsed >= 20)) {
    earnedBadges.push('LL')
  } else if (!answers.find(e => e.timeElapsed >= 50)) {
    earnedBadges.push('LS')
  }

  return earnedBadges
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

const generateQuestion = (level, maxLevel, matrix) => {
  const x = randomInt(1, level)
  const y = randomInt(1, maxLevel)
  const multipliers = shuffle([x, y])

  return {
    id: `${multipliers[0]}x${multipliers[1]}`,
    multipliers,
    level: Math.min(x, y),
    options: generateOptions(x, y, matrix)
  }
}

const generateQuestions = (level, maxLevel, matrix, testing) => {
  let questions = []
  const numberOfTotalQuestions = level * maxLevel
  while (questions.length < numberOfTotalQuestions) {
    let newQuestion = generateQuestion(level, maxLevel, matrix)
    // Only unique questions
    if (!questions.find(q => q.id === newQuestion.id)) {
      questions.push(newQuestion)
    }
  }
  if (level > 3) {
    questions = removeLevelFromQuestions(questions, 1)
  }
  if (level > 5) {
    questions = removeLevelFromQuestions(questions, 2)
  }

  if (testing) {
    questions = questions.slice(0,5)
  }
  
  return questions
}

const removeLevelFromQuestions = (questions, levelToBeRemoved) => {
  return questions.filter(q => q.level !== levelToBeRemoved)
}

const getMessageByResult = (result) => {
  switch(result) {
    case 'success':
      return getSuccessMessage()
    case 'error':
      return getFailureMessage()
    case 'timeout':
      return getTimeoutMessage()
  }
}

const getSuccessMessage = () => {
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

const getFailureMessage = () => {
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

const getTimeoutMessage = () => {
  return "Times out! Don't give up, you will get faster"
}

const randomInt = (min, max) => { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

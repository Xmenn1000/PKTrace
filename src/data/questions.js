// MultiSelectQuestion
export const knownMovesQuestion = 'Welche dieser Parkour-Moves beherrschst du?'
export const knownMovesOptions = [
  { value: '1', label: 'Passement Rapide' },
  { value: '2', label: 'Präzi mit Stick' },
  { value: '3', label: 'Katzensprung' },
  { value: '4', label: 'Armsprung' },
  { value: '5', label: 'Handwechsler' },
  { value: '6', label: 'Retour' },
  { value: '7', label: 'Dive-Cat' }
]

// Boolean Question
export const jumpQuestion = 'Schaffst du einen 1,5m Präzisions Sprung?'
export const cleanQuestion = 'Fühlst du dich bei der Ausführung deiner Moves sauber und sicher?'

// SingleSelect Question
export const yearQuestion = 'Wie lange machst du schon Parkour?'
export const yearOptions = [
  { value: '1', label: '< 1 Jahr' },
  { value: '2', label: '1 - 2 Jahre' },
  { value: '3', label: '2 - 4 Jahre' },
  { value: '4', label: '> 4 Jahre' }
]

// Slider Question
export const standingJumpQuestion = 'Wie weit kannst du aus dem Stand springen?'
export const standingJumpQuestionOptions = { min: 0, max: 10, step: 1 }
export const pushupsQuestion = 'Wie viele Liegestütze schaffst du?'
export const pushupsQuestionOptions = { min: 0, max: 40, step: 5 }
export const stickQuestion = 'Springe 10 Sticks, wie viele hast du wirklich gestickt?'
export const stickQuestionOptions = { min: 0, max: 10, step: 1 }

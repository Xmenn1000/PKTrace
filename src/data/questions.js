// MultiSelectQuestion
export const knownMovesQuestion = 'Welche dieser Parkour-Moves beherrschst du?'
export const knownMovesOptions = [
  { value: '1', label: 'Passement Rapide', points: 1 },
  { value: '2', label: 'Präzi mit Stick', points: 1 },
  { value: '3', label: 'Katzensprung', points: 2 },
  { value: '4', label: 'Armsprung', points: 2 },
  { value: '5', label: 'Handwechsler', points: 1 },
  { value: '6', label: 'Retour', points: 3 },
  { value: '7', label: 'Dive-Cat', points: 3 },
  { value: '8', label: 'Double-Cat', points: 3 },
  { value: '9', label: 'Dash', points: 2 }
]

// Boolean Question
export const jumpQuestion = { question: 'Schaffst du einen 1,5m Präzisions Sprung?', points: 1 }
export const cleanQuestion = { question: 'Fühlst du dich bei der Ausführung deiner Moves sauber und sicher?', points: 2 }

// SingleSelect Question
export const yearQuestion = 'Wie lange machst du schon Parkour?'
export const yearOptions = [
  { value: '1', label: '< 1 Jahr', points: 0 },
  { value: '2', label: '1 - 2 Jahre', points: 1 },
  { value: '3', label: '2 - 4 Jahre', points: 2 },
  { value: '4', label: '> 4 Jahre', points: 3 }
]

// Slider Question
export const standingJumpQuestion = {
  question: 'Wie weit kannst du aus dem Stand springen? (in Metern)',
  options: { min: 0, max: 4, step: 1 },
  valuePoints: {
    0: 0,
    1: 1,
    2: 1,
    3: 2,
    4: 3
  }
}
export const pushupsQuestion = {
  question: 'Wie viele Liegestütze schaffst du?',
  options: { min: 0, max: 40, step: 5 },
  valuePoints: {
    0: 0,
    5: 1,
    10: 1,
    15: 1,
    20: 2,
    25: 2,
    30: 2,
    35: 3,
    40: 3
  }
}

export const stickQuestion = { // 12
  question: 'Springe 10 Sticks (gestandene Präzis), wie viele hast du wirklich gestickt?',
  options: { min: 0, max: 10, step: 1 },
  valuePoints: (value) => {
    if (value > 0 <= 3) return 1
    if (value <= 8) return 2
    if (value <= 10) return 3

    return 0
  }
}

export const condiQuestion = 'Wie gut ist deine Ausdauer ?'

export const conditionOptions = [
  { value: '1', label: 'Sehr Gut', points: 3 },
  { value: '2', label: 'Gut', points: 2 },
  { value: '3', label: 'Schlecht', points: 1 }
]

export const jumpHighQuestion = {
  question: 'Such dir ein Hinderniss für die jeweilige Höhe, wie hoch kannst du springen (Anlauf ist erlaubt) ?',
  options: { min: 1, max: 9, step: 1 },
  labels: {
    1: 'Knöchel',
    2: 'Knie',
    3: 'Hüfte',
    4: 'Bauch',
    5: 'Brust',
    6: 'Hals',
    7: 'Augen',
    8: 'Kopf',
    9: 'Höher'
  },
  valuePoints: (value) => {
    if (value <= 2) return 1
    if (value <= 4) return 2
    if (value <= 7) return 3
    if (value <= 9) return 4

    return 0
  }
}

export const crouchBalance = {
  question: 'Wie viele Sekunden kannst du in der Hocke auf einer Stange Balancieren ?',
  options: { min: 0, max: 120, step: 10 },
  valuePoints: (value) => {
    if (value > 0 <= 20) return 1
    if (value < 70) return 2
    if (value <= 120) return 3

    return 0
  }
}

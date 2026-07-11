// MultiSelect Question
export const knownMovesQuestion = {
  id: 'known-moves',
  type: 'multi-select',
  question: 'Welche dieser Parkour-Moves beherrschst du?',
  options: [
    { value: '1', label: 'Passement Rapide' },
    { value: '2', label: 'Präzi mit Stick' },
    { value: '3', label: 'Katzensprung' },
    { value: '4', label: 'Armsprung' },
    { value: '5', label: 'Handwechsler' },
    { value: '6', label: 'Retour' },
    { value: '7', label: 'Dive-Cat' }
  ]
}

// Boolean Questions
export const jumpQuestion = {
  id: 'precision-jump',
  type: 'boolean',
  question: 'Schaffst du einen 1,5m Präzisions Sprung?'
}

export const cleanQuestion = {
  id: 'clean-moves',
  type: 'boolean',
  question: 'Fühlst du dich bei der Ausführung deiner Moves sauber und sicher?'
}

// SingleSelect Question
export const yearQuestion = {
  id: 'years',
  type: 'single-select',
  question: 'Wie lange machst du schon Parkour?',
  options: [
    { value: '1', label: '< 1 Jahr' },
    { value: '2', label: '1 - 2 Jahre' },
    { value: '3', label: '2 - 4 Jahre' },
    { value: '4', label: '> 4 Jahre' }
  ]
}

// Slider Questions
export const standingJumpQuestion = {
  id: 'standing-jump',
  type: 'slider',
  question: 'Wie weit kannst du aus dem Stand springen? (in Metern)',
  options: { min: 0, max: 10, step: 1 }
}

export const pushupsQuestion = {
  id: 'pushups',
  type: 'slider',
  question: 'Wie viele Liegestütze schaffst du?',
  options: { min: 0, max: 40, step: 5 }
}

export const stickQuestion = {
  id: 'sticks',
  type: 'slider',
  question: 'Springe 10 Sticks, wie viele hast du wirklich gestickt?',
  options: { min: 0, max: 10, step: 1 }
}

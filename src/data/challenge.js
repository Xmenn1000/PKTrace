export const difficultyColors = {
  easy: '#0CC952',
  medium: '#DE7A00',
  hard: '#DE0000',
  dynamisch: '#FF03E2'
}

const STORAGE_KEY = 'challenge-app-db'

const challenges = [
  {
    id: 1,
    imagesId: 1,
    title: 'Backflip',
    description: ['Mache einen Backflip'],
    level: 'medium',
    comments: [
      {
        id: 1,
        text: 'Hat Spaß gemacht!'
      },
      {
        id: 2,
        text: 'Schwieriger als gedacht.'
      }
    ]
  },

  {
    id: 2,
    imagesId: 2,
    title: 'Klappmesser Rolle',
    description: ['Mache eine Normale Rolle, sobald du auf dem rücken liegst, Streckst du deine Arme und Beine aus und lässt dich fallen'],
    level: 'easy',
    comments: [
      {
        id: 1,
        text: 'Habs direkt geschaft!'
      },
      {
        id: 2,
        text: 'Sogar mein Bruder hatte Spaß!'
      }
    ]
  },

  {
    id: 3,
    imagesId: 3,
    title: 'Wippen Pentalogie',
    description: ['1. Variante: Such dir eine Technik aus und mach diese hintereinander Weg über jede Wippe, mit so wenig Bodenkontakten zwichen den Wippen, wie möglich!',
      '2. Variante: Jede Wippe mit einer anderen Technik so flüssig wie möglich überwinden'],
    level: 'dynamisch',
    comments: [
      {
        id: 1,
        text: 'Der war interessant!'
      },
      {
        id: 2,
        text: 'Das härtere war zu hart für mich!'
      }
    ]
  },

  {
    id: 4,
    imagesId: 4,
    title: 'Jump High',
    description: ['1. Leicht: Höhe suchen die leicht für dich ist um hoch zu springen, ohne Anlauf springbar -> Geschafft wenn 10x gestickt',
      '2. Mittel: Höhe suchen die nicht MaximalSprung benötigt aber herausfordernder ist als leicht um hoch zu springen, mit Anlauf ab hier erlaubt -> GEschafft wenn 10x gestickt',
      '3. Schwer: Höhe suchen die sehr herausfordernd, bzw. kurz vor der Grenze zu nicht machbar, ist um hoch zu springen --> Geschafft wenn 10x gestickt'
    ],
    level: 'dynamisch',
    comments: [
      {
        id: 1,
        text: 'Habs direkt geschaft!'
      },
      {
        id: 2,
        text: 'Boar easy ist ja wirklich einfach!'
      }
    ]
  }

]

export function initializeDatabaseWithChallenges() {
  const existingData = localStorage.getItem(STORAGE_KEY)

  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(challenges))
  }
}

export function getDatabase() {
  const data = localStorage.getItem(STORAGE_KEY)

  if (!data) {
    initializeDatabaseWithChallenges()
    return challenges
  }

  return JSON.parse(data)
}

export function saveDatabase(database) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(database))
}

export function getChallengeById(id) {
  return getDatabase().find(
    challenge => challenge.id === Number(id)
  )
}

export function addComment(challengeId, text) {
  const database = getDatabase()

  const challenge = database.find(
    c => c.id === Number(challengeId)
  )

  if (!challenge) {
    throw new Error('Challenge not found')
  }

  const comment = {
    id: Date.now() + Math.random(),
    text
  }

  challenge.comments.push(comment)

  saveDatabase(database)

  return comment
}

// https://ux.stackexchange.com/questions/25546/which-colors-would-best-convey-3-difficulty-levels
export const difficultyColors = {
  easy: {
    backgroundColor: '#2ECC71',
    color: '#FFFFFF'
  },
  medium: {
    backgroundColor: '#F1C40F',
    color: '#FFFFFF'
  },
  hard: {
    backgroundColor: '#E74C3C',
    color: '#FFFFFF'
  },
  dynamisch: {
    backgroundColor: '#9B59B6',
    color: '#FFFFFF'
  }
}

const STORAGE_KEY = 'challenge-app-db'
const COMPLETED_STORAGE_KEY = 'challenge-app-completed'

const imageContext = import.meta.webpackContext('./challengeImages', {
  recursive: true,
  regExp: /\.(png|jpe?g|webp)$/i,
  mode: 'sync'
})

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
  },

  {
    id: 5,
    imagesId: 5,
    title: 'Passement Rapide',
    description: ['10 Passement Rapide über ein Hüfthohes Hinderniss'],
    level: 'easy',
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
  },

  {
    id: 6,
    imagesId: 6,
    title: 'Mauer Krafttraining',
    description: ['Schaffe es innerhalb 10 Minuten 10 mal alle Mauern von unten nach oben zu überwinden'],
    level: 'hard',
    comments: [
      {
        id: 1,
        text: 'Keine Chance!'
      },
      {
        id: 2,
        text: 'Send Help'
      }
    ]
  },

  {
    id: 7,
    imagesId: 7,
    title: 'Sei der Affe',
    description: ['Hangel dich 3 mal innerhalb 10 Minuten die Grünen Stangen entlang'],
    level: 'hard',
    comments: [
      {
        id: 1,
        text: 'Ich fühle meine Arme nicht nehr'
      },
      {
        id: 2,
        text: '...Das mach ich nie wieder!'
      }
    ]
  }
]

export const initializeDatabaseWithChallenges = () => {
  const existingData = localStorage.getItem(STORAGE_KEY)

  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(challenges))
  }
}

export const getAllChallenges = () => {
  const data = localStorage.getItem(STORAGE_KEY)

  if (!data) {
    initializeDatabaseWithChallenges()
    return challenges
  }

  return JSON.parse(data)
}

export const saveDatabase = (database) => (
  localStorage.setItem(STORAGE_KEY, JSON.stringify(database))
)

export const getChallengeById = (id) => getAllChallenges().find(
  challenge => challenge.id === Number(id)
)

export const addComment = (challengeId, text) => {
  const allChallenges = getAllChallenges()

  const challenge = allChallenges.find(
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

  saveDatabase(allChallenges)

  return comment
}
export const getChallengeImages = (imagesId) => imageContext
  .keys()
  .filter(path => path.startsWith(`./${imagesId}/`))
  .map(path => ({
    url: imageContext(path)
    // alt: 'Challenge image'
  }))

import { title } from "process";
export const difficultyColors = {
    easy: "#0CC952",
    medium: "#DE7A00",
    hard: "#DE0000",
    dynamisch: "#FF03E2"
}
 
export const challenges = [
        {
            id: 1,
            imagesId: 1,
            title: "Backflip",
            description: ["Mache einen Backflip"],
            level:"medium"
        },

        {
            id: 2,
            imagesId: 2,
            title: "Klappmesser Rolle",
            description: ["Mache eine Normale Rolle, sobald du auf dem rücken liegst, Streckst du deine Arme und Beine aus und lässt dich fallen"],
            level: "easy"
        },

        {
            id: 3,
            imagesId: 3,
            title: "Wippen Pentalogie",
            description: ["1. Variante: Such dir eine Technik aus und mach diese hintereinander Weg über jede Wippe, mit so wenig Bodenkontakten zwichen den Wippen, wie möglich!",
                "2. Variante: Jede Wippe mit einer anderen Technik so flüssig wie möglich überwinden"],
            level:"dynamisch" 
        },

        {
            id: 4,
            imagesId: 4,
            title: "Jump High",
            description: ["1. Leicht: Höhe suchen die leicht für dich ist um hoch zu springen, ohne Anlauf springbar -> Geschafft wenn 10x gestickt",
                "2. Mittel: Höhe suchen die nicht MaximalSprung benötigt aber herausfordernder ist als leicht um hoch zu springen, mit Anlauf ab hier erlaubt -> GEschafft wenn 10x gestickt",
                "3. Schwer: Höhe suchen die sehr herausfordernd, bzw. kurz vor der Grenze zu nicht machbar, ist um hoch zu springen --> Geschafft wenn 10x gestickt"
            ],
            level:"dynamisch" 
        },
    
    ];
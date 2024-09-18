export interface Score {
    name: string;
    points: number;
  }

/**
 * Load scores from local storage.
 * If no scores are found, initialize local storage.
 */
export const initScores = (): void => {
    const scoreJson = localStorage.getItem("scores");
    let scores: Score[] = [];
    if (scoreJson !== null) {
        scores = JSON.parse(scoreJson);
        scores.sort((a, b) => b.points - a.points);
    } else {
        scores = [
        { name: "Adam", points: 3 },
        { name: "Carrie", points: 6 },
        { name: "Alex", points: 5 },
        { name: "Sarah", points: 2 },
        { name: "Matthew", points: 7 },
        ];
    }
    localStorage.setItem("scores", JSON.stringify(scores));
}

/**
 * Get current scores from local storage.
 * @returns Score[]
 */
export const getScores = (): Score[] => JSON.parse(localStorage.getItem("scores") || '[]');

/**
 * Add a new high score to local storage.
 * @param name The player's name
 * @param points The player's score
 */
export const addScore = (name: string, points: number): void => {
    const score: Score = { name, points };
    let scores: Score[] = getScores();
    scores.push(score);
    localStorage.setItem("scores", JSON.stringify(scores));
}

/**
 * Check if a score is new.
 * @param name The player's name
 * @param points The player's score
 * @returns True if the score is new, False otherwise
 */
export const checkNewScore = (name: string, points: number): boolean => {
    const scores = getScores();
    return scores.find((score) => score.points < points) === undefined
}
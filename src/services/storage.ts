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
    if (!scoreJson) {
        let scores: Score[] = [
        { name: "Adam", points: 3 },
        { name: "Carrie", points: 6 },
        { name: "Alex", points: 5 },
        { name: "Sarah", points: 2 },
        { name: "Matthew", points: 7 },
        ];
        scores = sortScores(scores);
        localStorage.setItem("scores", JSON.stringify(scores));
    }
}

/**
 * Sort the scores in descending order.
 */
export const sortScores = (scores:Score[]): Score[] => {
    scores.sort((a, b) => b.points - a.points);
    return scores;
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
    scores = sortScores(scores);
    localStorage.setItem("scores", JSON.stringify(scores));
}

/**
 * Check if a score is a new high score and fits in the top 5.
 * @param name The player's name
 * @param points The player's score
 * @returns True if the score is new, False otherwise
 */
export const checkNewScore = (name: string, points: number): boolean => {
    const scores = getScores().slice(0,5);
    if (scores.length === 0 || !scores) {
        return false;
    }
    return !scores.some((score) => score.points === points) && points > scores[scores.length - 1].points;
}

}
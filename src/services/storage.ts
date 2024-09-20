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
 * @param points The player's score
 * @returns True if the score fits in the top 5.
 */
export const checkNewHighScore = (points: number): boolean => {
    const scores = getScores().slice(0,5);
    return (!scores.some((score) => score.points === points) &&
        (scores.length < 5 || points > Math.min(...scores.map(score => score.points)))
    );
}

export const setPoints = (points: number) => {
    localStorage.setItem("points", points.toString());
}

export const getPoints = (): number => {
    const currentScore = localStorage.getItem("points")
    if (currentScore !== null && currentScore !== undefined) {
        return parseInt(currentScore);
    }
    setPoints(0);
    return 0
}

export const setWrong = (wrong: number): void => {
    localStorage.setItem("wrong", wrong.toString());
}

export const getWrong = (): number => {
    const wrong = localStorage.getItem("wrong");
    if (wrong !== null && wrong !== undefined) {
        return parseInt(wrong);
    }
    setWrong(0);
    return 0
}

/**
 * Set the volume level for music playback
 * @param volume
 */
export const setVolume = (volume: number = 0.5): void => {
    localStorage.setItem("volume", volume.toString());
}

export const getVolume = (): number => {
    const volume = localStorage.getItem("volume");
    if (!volume) {
        setVolume();
        return 0.5;
    }
    return parseFloat(volume);
}

export const stopGame = () => {
    localStorage.setItem("gameInProgress", false.toString());
    setPoints(0);
    setWrong(0);
}

export const startGame= () => {
    localStorage.setItem("gameInProgress", true.toString());
    setPoints(0);
    setWrong(0);
}

export const getGame = (): boolean => {
    const gameInProgress = localStorage.getItem("gameInProgress");
    if (gameInProgress !== null && gameInProgress !== undefined) {
        return JSON.parse(gameInProgress);
    }
    startGame();
    return false;
}

export const setFinalScore = (points: number) => {
    localStorage.setItem("finalPoints", points.toString());
}

export const getFinalScore = (): number => {
    const finalPoints = localStorage.getItem("finalPoints");
    if (finalPoints !== null && finalPoints !== undefined) {
        return parseInt(finalPoints);
    }
    localStorage.setItem("finalPoints", JSON.stringify(0));
    return 0;
}
import { Component, OnInit } from '@angular/core';
import { get } from 'lodash';
import { getFinalScore, setFinalScore, addScore, checkNewHighScore } from 'src/services/storage';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {

  constructor() { }

  playerName: string = "";

  ngOnInit(): void {
    
  }

  clicked() {
    const finalScore = getFinalScore();
    console.log("button clicked");
    // Ensure the score is greater than zero and is a valid high score.
    if (finalScore > 0 && checkNewHighScore(finalScore)) {
      console.log(this.playerName, finalScore)
      // Add the score to the leaderboard.
      addScore(this.playerName, finalScore);
      // Clear the final score out of the temporary storage.
      // It is now stored in the leaderboard instead.
      setFinalScore(0);
    }
  }
}

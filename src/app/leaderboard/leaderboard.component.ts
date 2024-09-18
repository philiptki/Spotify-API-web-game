import { Component, OnInit } from '@angular/core';
import { initScores, getScores, Score } from "../../services/storage";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    initScores();
  }

  clicked() {
    console.log("home button clicked");
  }

  /**
   * Get top 5 scores
   * @returns Score[5]
   */
  getTopScores = (): Score[] => getScores().slice(0,5);

}

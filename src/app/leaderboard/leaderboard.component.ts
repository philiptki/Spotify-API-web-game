import { Component, OnInit } from '@angular/core';

export interface Score {
  name: string;
  points: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  scores: Score[] = [
    { name: "Adam", points: 3 },
    { name: "Carrie", points: 6 },
    { name: "Alex", points: 5 },
    { name: "Sarah", points: 2 },
    { name: "Matthew", points: 7 },
  ]

  constructor() { }

  ngOnInit(): void {
    this.scores.sort((a, b) => b.points - a.points);
  }

  clicked() {
    console.log("home button clicked");
  }

  getScores() {
    return this.scores.slice(0,5);
  }

}

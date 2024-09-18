import { Component, OnInit } from '@angular/core';

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
    console.log("button clicked");
  }
}

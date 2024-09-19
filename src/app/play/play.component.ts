import { Component, OnInit} from '@angular/core';
import { Howl } from 'howler';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  playing = false;

  trackIndex = 0;

  tracks = [
    "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3",
    "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample2.mp3",
    "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.m4a",
  ]

  player: Howl | undefined;

  clicked(index: number) {
    console.log("song choice clicked");
    this.trackIndex = index;
    this.setupPlayer();
  }

  setupPlayer() {
    this.player = new Howl({
      src: [this.tracks[this.trackIndex]],
      html5: true,
      autoplay: false,
      loop: false,
      volume: 1,
    });
  }

  togglePlayback() {
    if (this.player) {
      if (this.player.playing()) {
        this.player.pause();
        this.playing = false;
      } else {
        this.player.play();
        this.playing = true;
      }
    }
  }

  stopPlayback() {
    if (this.player) {
      this.player.stop();
      this.playing = false;
    }
  }
}

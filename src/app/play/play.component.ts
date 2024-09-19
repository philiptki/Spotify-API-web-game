import { Component, OnInit} from '@angular/core';
import { Howl } from 'howler';
import { playService } from "../../services/playService";
import {lowerFirst} from "lodash";
import { getVolume } from 'src/services/storage';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private playService: playService) { }

  ngOnInit(): void {
    this.playService.startRound().then(() => {
      this.gameStarted = true;
      this.randomThreeTracks = this.playService.randomThreeTracks;
      this.mainTrack = this.playService.mainTrack;
      this.setupTracksPreviewURL()
      console.log('Round started');
    }).catch((error) => {
      console.error('Error starting the round:', error);
    });
  }

  playing = false;

  trackIndex = 0;

  tracksPreviewURL = [
    "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3",
    "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample2.mp3",
    "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.m4a",
  ]

  player: Howl | undefined;

  gameStarted = false;

  randomThreeTracks: any[] = []

  mainTrack: any;

  clicked(index: number) {
    console.log("song choice clicked");
    this.trackIndex = index;
    this.setupPlayer();
  }

  setupPlayer() {
    this.player = new Howl({
      src: [this.tracksPreviewURL[this.trackIndex]],
      html5: true,
      autoplay: false,
      loop: false,
      volume: getVolume(),
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

  //adds the previewURl of the three random tracks
  setupTracksPreviewURL() {
    this.tracksPreviewURL = [
        this.randomThreeTracks[0].preview_url,
        this.randomThreeTracks[1].preview_url,
        this.randomThreeTracks[2].preview_url
    ]
  }
}

import { Component, OnInit} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Howl } from 'howler';
import { playService } from "../../services/playService";
import {lowerFirst} from "lodash";
import {
  getVolume,
  startGame,
  getGame,
  getWrong,
  getPoints,
  stopGame,
  setWrong,
  setPoints,
  checkNewHighScore,
  getScores
} from 'src/services/storage';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private playService: playService, private router: Router) { }

  playing = false;

  trackIndex = 0;

  tracksPreviewURL = [
    "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3",
    "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample2.mp3",
    "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.m4a",
  ]

  player: Howl | undefined;

  roundStarted = false;

  // randomThreeTracks: any[] = []
  randomThreeTracks = [
    { name: 'Sample 1', preview_url: "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3" },
    { name: 'Sample 2', preview_url: "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample2.mp3" },
    { name: 'Sample 3', preview_url: "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.m4a" }
  ];  //this is dummy use above

  mainTrack: any;
  mainTrackIndex: number = 0;

  ngOnInit(): void {
    // Check if the user navigated here or if the page was reloaded.
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const trigger = this.router.getCurrentNavigation()?.trigger;
        // Continue the game only if the page was automatically reloaded.
        if (trigger !== 'imperative') {
          const gameInProgress = getGame();
          if (gameInProgress) {
            console.log('Game continued')
          }
        } else {
          startGame();
          console.log('Game started');
        }
      }
    });


    this.roundStarted = true;
    this.setupPlayer()      //this is dummy use below instead of this


    // this.playService.startRound().then(() => {
    //   this.startRound();
    // }).catch((error) => {
    //   console.error('Error starting the round:', error);
    // });
  }

  async startRound() {
    this.playService.startRound().then(() => {
      this.roundStarted = true;
      this.randomThreeTracks = this.playService.randomThreeTracks;
      this.mainTrack = this.playService.mainTrack;
      this.mainTrackIndex = this.playService.mainTrackIndex;
      this.setupTracksPreviewURL()
      console.log('Round started');
      console.log(this.mainTrack?.name);
      this.setupPlayer();
    }).catch((error) => {
      console.error('Error starting the round:', error);
    });
  }

  nextRound() {
    this.roundStarted = false;
    this.startRound();
  }

  //use above instead
  dummyNextRound() {
    if (getWrong() == 3) {
      if (checkNewHighScore(getPoints())) {
        this.router.navigate(["highscore"]);
      } else {
        this.router.navigate(["gameover"]);
      }
    }
  }


  clicked(index: number) {
    console.log("song choice clicked");
    if (index === this.mainTrackIndex) {
      setPoints(getPoints() + 1);
    } else {
      setWrong(getWrong() + 1);
    }
    // this.nextRound();
    this.dummyNextRound();  //dummy switch these
  }

  notPlaying() {
      console.log("playback ended")
      this.playing = false;
  }

  setupPlayer() {
    this.player = new Howl({
      // src: [this.tracksPreviewURL[this.mainTrackIndex]],
      src: [this.tracksPreviewURL[0]], //dummy use above
      html5: true,
      autoplay: false,
      loop: false,
      volume: getVolume(),
    });

    //stops the audio when the browser back button is pressed
    window.addEventListener('popstate', () => {
      if (this.player?.playing()) {
        this.player.stop();
      }
    });
  }

  togglePlayback() {
    console.log("playback toggled");
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

  //nextRound() {
  //  const internalRefresh = false;
  //  this.leavePage(internalRefresh);
  //  this.router.navigate(["/play"], { skipLocationChange: true });
  //}

  getWrong() {
    return getWrong();
  }

  setWrong(wrong: number) {
    setWrong(wrong);
  }

  getPoints() {
    return getPoints();
  }

  setPoints(points: number) {
    setPoints(points);
  }

  stopGame() {
    stopGame();
  }

}

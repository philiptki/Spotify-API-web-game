import { Injectable } from "@angular/core";
import fetchFromSpotify, { request } from "src/services/api";
import { getExplicitAllowed } from "src/services/storage";

const AUTH_ENDPOINT =
    "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Injectable({
    providedIn: 'root',
})

export class playService {

    constructor() {
        this.authLoading = true;
        const storedTokenString = localStorage.getItem(TOKEN_KEY);
        if (storedTokenString) {
            const storedToken = JSON.parse(storedTokenString);
            if (storedToken.expiration > Date.now()) {
                console.log("Token found in localstorage");
                this.authLoading = false;
                this.token = storedToken.value;
                this.loadGenres(storedToken.value);
                return;
            }
        }
        console.log("Sending request to AWS endpoint");
        request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
            const newToken = {
                value: access_token,
                expiration: Date.now() + (expires_in - 20) * 1000,
            };
            localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
            this.authLoading = false;
            this.token = newToken.value;
            this.loadGenres(newToken.value);
        });
    }

    genres: String[] = [];
    selectedGenre: String = "";
    authLoading: boolean = false;
    configLoading: boolean = false;
    token: String = "";
    playlistId: any;
    tracks: any[] = [];
    randomThreeTracks: any[] = [];
    mainTrack: any;
    mainTrackIndex: number = 0;

    loadGenres = async (t: any) => {
        this.configLoading = true;

        // #################################################################################
        // DEPRECATED!!! Use only for example purposes
        // DO NOT USE the recommendations endpoint in your application
        // Has been known to cause 429 errors
        // const response = await fetchFromSpotify({
        //   token: t,
        //   endpoint: "recommendations/available-genre-seeds",
        // });
        // console.log(response);
        // #################################################################################

        this.genres = [
            "rock",
            "pop",
            "country",
            "hiphop",
            "rnb",
            "alternative",
            "funk",
            "soul"
        ]
        this.configLoading = false;
    };

    setGenre(selectedGenre: any) {
        this.selectedGenre = selectedGenre;
        // console.log(this.selectedGenre);
        // console.log(TOKEN_KEY);
    }

    //picks a random genre from the genre list
    setRandomGenre() {
        let index = Math.floor(Math.random() * this.genres.length);
        this.setGenre(this.genres[index]);
    }

    //sets random playlist's id from list of playlists from the selected genre
    async setRandomPlaylistID() {
        let response = await fetchFromSpotify({
            token: this.token,
            endpoint: "browse/categories/" + this.selectedGenre + "/playlists?limit=10"
        });
        //setting the playlistId to a randomly selected playlist id
        let playlistSize = response.playlists.items.length;
        this.playlistId = response.playlists.items[Math.floor(Math.random() * playlistSize)].id;
    }

    //set's tracks to all the tracks from a playlist with the given playlist id
    async tracksFromPlaylistID(playlistId: any) {
        let response = await fetchFromSpotify({
            token: this.token,
            endpoint: "playlists/" + playlistId + "/tracks"
        });
        //only adding tracks that don't have a null preview_url
        response.items.forEach((item: any) => {
            let track = item.track;
            if (track && track.preview_url != null && (getExplicitAllowed() || !track.explicit)) {
                this.tracks.push(track);
            }
        });
    }

    //sets the randomThreeTracks to three random track from the tracks list
    setRandomThreeTracks() {
        let randomIndices = new Set();
        while (randomIndices.size < 3) {
            let randomIndex = Math.floor(Math.random() * this.tracks.length);
            randomIndices.add(randomIndex);
        }
        //array list of random track indexes
        let arrOfTrackID = Array.from(randomIndices);
        this.randomThreeTracks = arrOfTrackID.map((index: any) => this.tracks[index]);
    }

    chooseMainTrack() {
        let randomIndex = Math.floor(Math.random() * this.randomThreeTracks.length);
        this.mainTrack = this.randomThreeTracks[randomIndex];
        this.mainTrackIndex = randomIndex;
    }

    async startRound() {
        this.setRandomGenre();
        await this.setRandomPlaylistID();
        await this.tracksFromPlaylistID(this.playlistId)
        this.setRandomThreeTracks()
        this.chooseMainTrack()
        // console.log(this.token)
        // console.log(this.selectedGenre)
        // console.log(this.mainTrack)
    }
}

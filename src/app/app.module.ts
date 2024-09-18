import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NavComponent } from './nav/nav.component';
import { SettingsComponent } from './settings/settings.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "settings", component: SettingsComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'play', component: PlayComponent },
];

@NgModule({
  declarations: [AppComponent, HomeComponent, NavComponent, SettingsComponent, LeaderboardComponent, PlayComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

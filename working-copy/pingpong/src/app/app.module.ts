import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { GameComponent } from './pages/game/game.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, GameComponent, LeaderboardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { Player } from 'src/app/_models/player.model';
import { PlayerService } from 'src/app/_services/player.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  player1Score = 0;
  player2Score = 0;
  player1Name = '';
  player2Name = '';
  player1: Player = new Player();
  player2: Player = new Player();
  round = 0;
  serving = '';
  serveIndex = 0;
  win = false;
  winningPlayer = '';

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      // Get the player who is serving
      this.serving = params.player1ID;
      this.player1Name = params.player1ID;
      this.player2Name = params.player2ID;

      this.playerService
        .loginPlayer(this.player1Name)
        .pipe(first())
        .subscribe((player) => {
          this.player1 = player;
        });
      this.playerService
        .loginPlayer(this.player2Name)
        .pipe(first())
        .subscribe((player) => {
          this.player2 = player;
        });
    });
  }

  score(player: number) {
    this.round++;
    if (player === 1) {
      this.player1Score++;
    } else {
      this.player2Score++;
    }

    // Update who is serving
    this.serveIndex++;
    if (this.serveIndex === 4) {
      this.serveIndex = 0;
    }
    if (this.serveIndex === 2) {
      this.serving = this.player2Name;
    } else if (this.serveIndex === 0) {
      this.serving = this.player1Name;
    }

    if (this.player1Score >= 11 && this.player1Score > this.player2Score + 1) {
      this.winningPlayer = this.player1Name;
      this.win = true;
      this.winner(
        this.winningPlayer,
        this.player1.wins + 1,
        this.player1.cumulativePoints + this.round
      );
    } else if (
      this.player2Score >= 11 &&
      this.player2Score > this.player1Score + 1
    ) {
      this.winningPlayer = this.player2Name;
      this.win = true;
      this.winner(
        this.winningPlayer,
        this.player2.wins + 1,
        this.player2.cumulativePoints + this.round
      );
    }
  }

  winner(winner: string, wins: number, cumluative: number) {
    this.playerService
      .win(winner, wins, cumluative)
      .pipe(first())
      .subscribe(() => {});
  }
}

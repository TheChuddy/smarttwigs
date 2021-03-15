import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/_models/player.model';
import { PlayerService } from 'src/app/_services/player.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService
      .getAllPlayers()
      .pipe(first())
      .subscribe((players: Player[]) => {
        this.players = players;
      });
  }
}

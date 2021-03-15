import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/_services/player.service';
import { first } from 'rxjs/operators';
import { Player } from 'src/app/_models/player.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  player1: Player;
  player2: Player;
  player1init = false;
  player2init = false;
  readyToPlay = false;
  serve = '';
  player1Name = '';
  player2Name = '';

  constructor(private player: PlayerService, private router: Router) {
    this.player1 = new Player();
    this.player2 = new Player();
  }

  ngOnInit(): void {}

  register(name: string, button: number) {
    this.player
      .createPlayer(name)
      .pipe(first())
      .subscribe((player: Player) => {
        if (button === 1) {
          this.player1 = player;
          this.player1init = true;
        } else {
          this.player2 = player;
          this.player2init = true;
        }
        if (this.player1init && this.player2init && this.player1Name != '') {
          this.readyToPlay = true;
        }
      });
  }

  login(name: string, button: number) {
    this.player
      .loginPlayer(name)
      .pipe(first())
      .subscribe((player: Player) => {
        console.log(player);
        if (player) {
          if (button === 1) {
            this.player1 = player;
            this.player1init = true;
          } else {
            this.player2 = player;
            this.player2init = true;
          }
        } else {
          console.log("player doesn't exist");
        }
        if (this.player1init && this.player2init && this.player1Name != '') {
          this.readyToPlay = true;
        }
      });
  }

  start() {
    console.log(this.serve);
    this.router.navigateByUrl(`/game/${this.player1Name}/${this.player2Name}`);
  }

  selectPlayer(player: number) {
    if (player === 1) {
      this.player1Name = this.player1.name;
      this.player2Name = this.player2.name;
    } else {
      this.player1Name = this.player2.name;
      this.player2Name = this.player1.name;
    }
    if (this.player1init && this.player2init && this.player1Name != '') {
      this.readyToPlay = true;
    }
  }
}

import { Injectable } from '@angular/core';
import { Player } from '../_models/player.model';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private web: WebService) {}

  createPlayer(name: string) {
    return this.web.post<Player>('players', { name });
  }

  loginPlayer(name: string) {
    return this.web.get<Player>(`players/${name}`);
  }

  win(name: string, wins: number, cumulativePoints: number) {
    console.log('patch', name, wins, cumulativePoints);
    return this.web.patch<Player>(`players/${name}`, {
      wins,
      cumulativePoints,
    });
  }

  getAllPlayers() {
    return this.web.get<Player[]>(`players`);
  }
}

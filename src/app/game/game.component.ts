import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  cardIsPicked: boolean = false;

  ngOnInit() {
    this.initGame();
  }

  initGame() {
    // this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    this.cardIsPicked = true;
  }
}

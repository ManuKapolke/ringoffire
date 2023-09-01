import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  currentCard: string = '';
  cardIsPicked: boolean = false;

  ngOnInit() {
    this.initGame();
  }

  initGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (this.cardIsPicked || this.game.stack.length === 0) return;
    this.currentCard = this.game.stack.pop()!;
    console.log(this.currentCard)
    this.cardIsPicked = true;

    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.cardIsPicked = false;
    }, 1000);
  }
}

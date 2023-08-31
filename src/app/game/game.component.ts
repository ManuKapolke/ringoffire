import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  cardIsPicked: boolean = false;

  takeCard() {
    this.cardIsPicked = true;
  }
}

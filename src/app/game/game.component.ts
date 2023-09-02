import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  currentCard: string = '';
  cardIsPicked: boolean = false;

  constructor(public dialog: MatDialog) { }

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
    this.cardIsPicked = true;

    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.cardIsPicked = false;
      this.game.currentPlayer++;
      this.game.currentPlayer %= this.game.players.length;
    }, 500);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.game.players.push(name);
      }
    });
  }
}

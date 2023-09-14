import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  currentCard: string = '';
  cardIsPicked: boolean = false;

  games$;
  games;

  firestore: Firestore = inject(Firestore);

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.newGame();

    this.route.params.subscribe(params => {
      console.log('Game ID from route.params:', params['gameId']);
    });

    // this.getGamesRef().valueChanges().subscribe((game) => {
    //   console.log('Updated game:', game);
    // });
    this.games$ = collectionData(this.getGamesRef());
    this.games = this.games$.subscribe(list => {
      list.forEach(game => {
        console.log('Game update', game);
      });
    });
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(gameId: string) {
    return doc(this.getGamesRef(), gameId);
  }

  async newGame() {
    this.game = new Game();

    // let gameInfo = await addDoc(this.getGamesRef(), { game: this.game.toJson() })
    // // .catch(
    // //   err => console.error(err)
    // // ).then(
    // //   docRef => { console.log('Game document written with ID: ', docRef?.id) }
    // //   // () => console.log('New game document written.')
    // // );
    // console.log('New game document written with ID: ', gameInfo.id);
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

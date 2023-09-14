import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, addDoc, collection, collectionData, doc, onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;
  currentCard: string = '';
  cardIsPicked: boolean = false;

  // games$;
  // games;
  unsubGames;
  unsubSingleGame;

  firestore: Firestore = inject(Firestore);

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.newGame();

    this.route.params.subscribe(params => {
      console.log('Game ID from route.params:', params['gameId']);
      this.gameId = params['gameId'];

      // this.unsubGames = this.subscribeGames();
      this.unsubSingleGame = this.subscribeSingleGame(this.gameId);

    });


    // this.games$ = collectionData(this.getGamesRef());
    // this.games = this.games$.subscribe(list => {
    //   list.forEach(game => {
    //     console.log('Game update', game);
    //   });
    // });
  }

  ngOnDestroy() {
    this.unsubGames();
    this.unsubSingleGame();
  }

  // subscribeGames() {
  //   return onSnapshot(this.getGamesRef(), games => {
  //     games.docChanges().forEach((change) => {
  //       if (change.type === "added") {
  //         console.log("New game: ", change.doc.data());
  //       }
  //       if (change.type === "modified") {
  //         console.log("Modified game: ", change.doc.data());
  //       }
  //       if (change.type === "removed") {
  //         console.log("Removed game: ", change.doc.data());
  //       }
  //     });
  //   });
  // }


  subscribeSingleGame(gameId: string) {
    return onSnapshot(this.getSingleGameRef(gameId), (docRef: any) => {
      // console.log('Game update', docRef.data());
      this.game.updateFromJson(docRef.data());
      console.log('Update:', this.game);
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

    // let gameInfo = await addDoc(this.getGamesRef(), this.game.toJson())
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

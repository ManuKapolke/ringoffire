import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) { }

  async startGame() {
    let game = new Game();
    let gameInfo = await addDoc(collection(this.firestore, 'games'), game.toJson())
    // .catch(
    //   err => console.error(err)
    // ).then(
    //   docRef => { console.log('Game document written with ID: ', docRef?.id) }
    //   // () => console.log('New game document written.')
    // );
    console.log('New game document written with ID: ', gameInfo.id);

    this.router.navigateByUrl(`/game/${gameInfo.id}`);
  }

}

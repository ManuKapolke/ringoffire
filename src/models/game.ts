export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public currentCard: string = '';
    public cardIsPicked: boolean = false;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push(`spades_${i}`);
            this.stack.push(`hearts_${i}`);
            this.stack.push(`diamonds_${i}`);
            this.stack.push(`clubs_${i}`);
        }

        shuffle(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            currentCard: this.currentCard,
            cardIsPicked: this.cardIsPicked
        };
    }

    public updateFromJson(json: any): void {
        this.players = json.players ? json.players : this.players;
        this.stack = json.stack ? json.stack : this.stack;
        this.playedCards = json.playedCards ? json.playedCards : this.playedCards;
        this.currentPlayer = json.currentPlayer ? json.currentPlayer : this.currentPlayer;
        this.currentCard = json.currentCard ? json.currentCard : this.currentCard;
        this.cardIsPicked = json.cardIsPicked ? json.cardIsPicked : this.cardIsPicked;
    }
}


function shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
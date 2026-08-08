import { BingoGameData } from "@/data/bingo";
import { BingoCardManage } from "./bingo-card-manage"
import { BingoGameManage } from "./bingo-game-manage";

const BINGO_BASE = "/bingo";

export class BingoRoutes {
    static home(){
        return BINGO_BASE
    }

    static edit(card: BingoCardManage){
        return `${BINGO_BASE}/edit?card=${card.getData().id}`
    }

    static preview(card: BingoCardManage){
        return `${BINGO_BASE}/preview?card=${card.getData().id}`
    }

    static share(card: BingoCardManage){
        return `${BINGO_BASE}/share?data=${card.export()}`
    }

    static play(game: BingoGameManage){
        return `${BINGO_BASE}/play?game=${game.getData().id}`
    }

    static create(){
        return `${BINGO_BASE}/edit`
    }
}
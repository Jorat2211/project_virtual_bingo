import { BingoCardsNumbers } from "../mainplayer/bingocardnumbers.interface";

export interface BingoCard{
    id: number;
    roomsId: number;
    bingoCardNumbers: Array<BingoCardsNumbers>;
    numberCard: number; 
    isPlaying: boolean; 
}
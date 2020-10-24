
export class BingoCardsNumbers{
    id : number; 
    number: number;
    isSelected : boolean;
    bingoCardsId : number;

    convertToBingoCardsNumbers (numberA: any){
        this.id = numberA.id;
        this.number = numberA.number;
        this.isSelected = numberA.isSelected;
        this.bingoCardsId = numberA.bingoCardsId;  
        return this; 
    }
    
}

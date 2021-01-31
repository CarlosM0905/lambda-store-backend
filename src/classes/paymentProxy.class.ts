export class PaymentProxy{
    DATE_NOW = new Date();
    CARD_AMOUNT = 0;
    CARD_MONTH = 0;
    CARD_YEAR = 0;
    CARD_CODE = "";

    constructor(amountCard: number,  monthCard: number, yearCard: number, codeCard: string){
        this.CARD_AMOUNT = amountCard;
        this.CARD_MONTH = monthCard;
        this.CARD_YEAR = yearCard;
        this.CARD_CODE = codeCard;
    }

    checkPayment(amount: number, month: number, year: number, code: string){
        console.log('TARJETA')
        console.log(this.CARD_AMOUNT);
        console.log(this.CARD_MONTH);
        console.log(this.CARD_YEAR);
        console.log(this.CARD_CODE);
        console.log('USUARIO')
        console.log(amount);
        console.log(month);
        console.log(year);
        console.log(code);
        
        if(amount > this.CARD_AMOUNT){
            return false;
        }
        else if( year != this.CARD_YEAR ){
            return false;
        }
        else if( month != this.CARD_MONTH){
            return false;
        }
        else if( code !== this.CARD_CODE){
            return false;
        }
        else if( this.CARD_YEAR < this.DATE_NOW.getFullYear()){
            return false;
        }
        else if( this.CARD_YEAR === this.DATE_NOW.getFullYear()  && this.CARD_MONTH < this.DATE_NOW.getMonth()){
            return false;
        }
        else{
            return true;
        }
    }
}
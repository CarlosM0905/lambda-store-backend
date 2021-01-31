"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentProxy = void 0;
class PaymentProxy {
    constructor(amountCard, monthCard, yearCard, codeCard) {
        this.DATE_NOW = new Date();
        this.CARD_AMOUNT = 0;
        this.CARD_MONTH = 0;
        this.CARD_YEAR = 0;
        this.CARD_CODE = "";
        this.CARD_AMOUNT = amountCard;
        this.CARD_MONTH = monthCard;
        this.CARD_YEAR = yearCard;
        this.CARD_CODE = codeCard;
    }
    checkPayment(amount, month, year, code) {
        console.log('TARJETA');
        console.log(this.CARD_AMOUNT);
        console.log(this.CARD_MONTH);
        console.log(this.CARD_YEAR);
        console.log(this.CARD_CODE);
        console.log('USUARIO');
        console.log(amount);
        console.log(month);
        console.log(year);
        console.log(code);
        if (amount > this.CARD_AMOUNT) {
            return false;
        }
        else if (year != this.CARD_YEAR) {
            return false;
        }
        else if (month != this.CARD_MONTH) {
            return false;
        }
        else if (code !== this.CARD_CODE) {
            return false;
        }
        else if (this.CARD_YEAR < this.DATE_NOW.getFullYear()) {
            return false;
        }
        else if (this.CARD_YEAR === this.DATE_NOW.getFullYear() && this.CARD_MONTH < this.DATE_NOW.getMonth()) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.PaymentProxy = PaymentProxy;

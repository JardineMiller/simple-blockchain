class Transaction {

    constructor(fromAddress, toAddress, amount) {
        this.fromAdress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

}
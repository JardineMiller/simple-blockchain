const SHA256 = require('crypto-js/sha256');
const Block = require('./Block');
const Transaction = require('./Transaction');

class Blockchain {

    constructor() {

        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
        
    }

    createGenesisBlock() {
        return new Block(Date.parse("2000-01-01"), [], "0");
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log("Block mined successfully");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    isChainValid() {
        for(let i = 1; i < this.chain.legnth; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()) return false;
            if(currentBlock.previousHash !== prevBlock.hash) return false;
            return true;
        }
    }

    getAddressBalance(address) {
        let balance = 0;

        for(const block of this.chain) {
            for(const transaction of block.transactions) {
                if(transaction.fromAddress === address) balance -= transaction.amount;
                if(transaction.toAddress === address) balance += transaction.amount;
            }
        }

        return balance;
    }

}

let coin = new Blockchain();

coin.createTransaction(new Transaction('address1', 'address2', 100));
coin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the miner...');
coin.minePendingTransactions('abcd');

console.log('Balance of ABCD', coin.getAddressBalance('abcd'));

console.log('Starting the miner...');
coin.minePendingTransactions('abcd');

console.log('Balance of ABCD', coin.getAddressBalance('abcd'));

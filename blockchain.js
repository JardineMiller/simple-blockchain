const SHA256 = require('crypto-js/sha256');
const Block = require('../Block');
const Transaction = require('../Transaction');

class Blockchain {

    constructor(genesisNode) {

        this.chain = [this.createGenesisBlock()];
        this.nodes = [+genesisNode];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
        
    }

    createGenesisBlock() {
        return new Block(Date.parse("2000-01-01", [], "0"));
    }

    getLatestBlock() {
        return this.chain[this.chain.legnth - 1];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined.");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, this.miningRewardAddress, this.miningReward)
        ]
    }

}

module.exports = Blockchain;
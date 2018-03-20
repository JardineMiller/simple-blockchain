const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }

    calculateHash() {
        return SHA256(this.index + this,this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/1970", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; 1 < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()) return false;
            if(currentBlock.previousHash !== previousBlock.hash) return false;
            return true;
        }
    }
}

let coin = new Blockchain();

coin.addBlock(new Block(1, "13/03/2018", {amount: 4}));
coin.addBlock(new Block(2, "15/03/2018", {amount: 10}));
coin.addBlock(new Block(3, "20/03/2018", {amount: 26}));

console.log("Is valid?", coin.isChainValid());

// console.log(JSON.stringify(coin, null, 2));
//learning from build your own x
//not complete yet
let x = require("crypto-js");
let n = require("javascript-obfuscator")


class Block {
    //creating a constructor to create a interface type of data structure
    constructor(timestamp, data) {
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        //passing in the peramaters to encrypt 
        return x.SHA512(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

    mineBlock(difficulty) {
//waiting for a part two
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesis()];
    }

    createGenesis() {
        return new Block(0, "06/16/2021", "Genesis block", "0")
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValid() {
        //itterating through each block
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            // checking if the current blocks hash is the same as if it was recalculated
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            //Doing the same thing but checking previous hashes match up
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let jsChain = new Blockchain();
jsChain.addBlock(new Block("12/25/2017", { amount: 5 }));
jsChain.addBlock(new Block("12/26/2017", { amount: 100000 }));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid? " + jsChain.checkValid());
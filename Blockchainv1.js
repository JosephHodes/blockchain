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
        this.previousHash=null;
        this.hash = null;
        this.nonce = Math.random();
        this.count=0;
    }

    calculateHash() {
        this.count+=1;
        //passing in the peramaters to encrypt 
        return x.SHA512(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

    mineBlock(difficulty) {
    let string = "0".repeat(difficulty)
    for (;;){
    this.nonce=Math.floor(Math.random()*1000)
    let hash=this.calculateHash()
    if(hash.startsWith(string)){
        return hash
    }
    }
    }
}
class Blockchain {
    constructor(difficulty) {
        this.chain = [this.createGenesis()];
        this.difficulty=difficulty
        this.string = "0".repeat(difficulty)
    }

    createGenesis() {
        return new Block(0, "06/16/2021", "Genesis block", "0")
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    checkValid() {
        //itterating through each block
        for (let i = 0; i < this.chain.length; i++) {
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
            if(!currentBlock.hash.startsWith(this.string)){
            return false
            }
            if (!previousBlock.hash.startsWith(this.string)) {
                return false
            }
        }
    
        return true;
    }
}

let jsChain = new Blockchain(2);
jsChain.addBlock(new Block("12/25/2017", { amount: 5 }));
jsChain.addBlock(new Block("12/26/2017", { amount: 100000 }));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid? " + jsChain.checkValid());
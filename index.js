// init socket io client
var io = require('socket.io-client');

// init listening socket
var socket = io.connect('http://localhost:3000');

const BlockChain = require('./Blockchain.js');
const Block = require('./Block');

// init blockchain
const blockchain = new BlockChain();

socket.on('connect', function() {
    console.log('connect to server');
    socket.on('clientevent', function(data) {
        var block = new Block(data.index, data.data, data.timestamp, data.nonce, data.hash, data.previous_hash);
        var previous_block = blockchain.getNewestBlockFromBlockchain();

        if(block.validateBlock(block, previous_block) != 0){
            console.log('error : ' + block.validateBlock(block, previous_block));
        } else {
            blockchain.addBlock(block);
            blockchain.showLatestBlock();
        }
    });
});


const net = require('net');
const read = require('read');
const register = require('./payloads/register');
const login = require('./payloads/login');

let client = new net.Socket();

client.connect(1337, '10.244.158.32', function() {
    console.log('Connected');
    menu();
});

client.on('close', function() {
    client.destroy();
    console.log('\nConnection closed');
});

function menu() {
    setTimeout(function() {
        console.log('Welcome to ABChat');
        console.log('1.]Register');
        console.log('2.]Login');
        read({ prompt: 'Option: ', silent: false }, function(er, option) {
            switch (option) {
                case '1':
                    register.registerClient(client);
                    break;
                case '2':
                    login.loginClient(client);
                    break;
            }
        })
    }, 300);
}

// determining Sockets
client.on('data', function(data) {
    console.log('\nReceived: ' + data + '\r');
});
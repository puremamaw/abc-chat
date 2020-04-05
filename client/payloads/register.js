const read = require('read');
const login = require('./login');

let nOnce = 1;

function registerClient(client) {
    read({ prompt: 'Username: ', silent: false }, function(er, username) {
        let newUsername = username.split(" ").join("");
        if (username.length <= 12 && username.match(/\//g) == null && username.match(/\d+/g) != null) {
            read({ prompt: 'Password: ', silent: true, replace: '*' }, function(er, password) {
                client.write(`1/${newUsername}/${password}/${nOnce}`);
                client.on('data', function(data) {
                    if (data == '1/1/1' && username != 'undefined' && password != 'undefined') {
                        console.log('\nSuccessfully Saved. You can now login');
                        nOnce++;
                        login.loginClient(client);
                    } else if (data == '1/1/2' && username != 'undefined' && password != 'undefined') {
                        console.log('Username Already Taken Please Register Again');
                        registerClient(client);
                    }
                });
            });
        } else {
            console.log('Username must not exceed up to 12 characters & contains alphanumeric numbers');
            registerClient(client);
        }
    });
}

module.exports = { registerClient };
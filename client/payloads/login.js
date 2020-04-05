const read = require('read');

let nOnceLogin = 1;

function loginClient(client) {
    console.log('\nLogin');
    read({ prompt: 'Enter Username: ', silent: false }, function(er, username) {
        read({ prompt: 'Enter Password: ', silent: true, replace: '*' }, function(er, password) {
            client.write(`2/${username}/${password}/${nOnceLogin}`);
            client.on('data', function(data) {
                if (data == '2/1/1' && username != 'undefined' && password != 'undefined') {
                    console.log('Login Sucessful..Redirecting');
                    nOnceLogin++;
                } else if (data == '2/1/2' && username != typeof('undefined') && password != 'undefined') {
                    console.log('Login Failed');
                    loginClient(client);
                    return;
                }
            });
        });
    });
}

module.exports = { loginClient };
var githubhook = require('githubhook'),
servers = {
    'c2aj-update': 'https://github.com/QorvisDigital/c2aj'
};

var thishook = githubhook(3500, servers, function (err, payload) {
    if (!err) {
        // console.log(payload); // payload is the JSON blob that github POSTs to the server
	var exec = require('child_process').exec,
	child;

	child = exec('git pull;jekyll', { 
	    cwd: "/var/www/c2aj",
	    env: { "SHELL": "/bin/bash","TERM": "term-256color","USER": "root","MAIL": "/var/mail/root","PWD": "/var/www/c2aj","LANG": "n_US.UTF-8","SHLVL": "1","HOME": "/root","LOGNAME": "root" }
	},
		     function (error, stdout, stderr) {
			 // console.log('stdout: ' + stdout);
			 console.log('stderr: ' + stderr);
			 if (error !== null) {
			     console.log('exec error: ' + error);
			 }
		     });
    } else {
        console.log(err);
    }
});
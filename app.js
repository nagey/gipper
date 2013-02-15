'use strict';

// Fill in here the repository of the URL that you wish to receive updates from
var gitHubRepoURL = 'https://github.com/SomeUser/SomeRepo';

// This should be the URL you wish your hook to have (i.e. http://example.com:3500/update-hook)
var hookName = "update-hook";

// This is the port number you want your server to run upon
var port = 3500;

// This is the shell command that you want to run
var runCommand = 'git pull;jekyll --no-auto';

// This is the initial directory from which you want your command to run
var myCwd = "/path/to/docroot";

//This is the initial environment your command should run with
var myEnv = { "SHELL": "/bin/bash",
							"TERM": "term-256color",
							"USER": "root",
							"MAIL": "/var/mail/root",
							"PWD": "/var/www/c2aj",
							"LANG": "n_US.UTF-8",
							"SHLVL": "1",
							"HOME": "/root",
							"LOGNAME": "root",
							"PATH": process.env.PATH 
						};




var commandCallback = function (error, stdout, stderr) {
	// console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
	    console.log('exec error: ' + error);
	}
}



var githubhook = require('githubhook');
var servers = {};
servers[hookName] = gitHubRepoURL;

var hookCallback = function (err, payload) {

	if (!err) {
		var exec = require('child_process').exec;
		var commandOptions = { cwd: myCwd, env: myEnv };
		var child = exec(runCommand, commandOptions, commandCallback);
  } 
	else {
      console.log(err);
  }
};

var thishook = githubhook(port, servers, hookCallback);

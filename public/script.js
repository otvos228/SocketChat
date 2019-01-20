{

//elements
const chatWindow = document.getElementById('chat');
const messagesList = document.getElementById('messagesList');
const messageInput = document.getElementById('messageInput');
const usernameInput = document.getElementById('usernameInput');
const sendBtn = document.getElementById('sendBtn');

let username = '';

const messages = []; // { message: 'Hi', user: 'guest0001' }

//TODO connect to live server 
// http://185.13.90.140:8081
//
//used: https://cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.17/socket.io.js
//
//problem: GET http://undefined/socket.io/1/?t=... net::ERR_NAME_NOT_RESOLVED
//
//start old code
/*let ipAddress = '185.13.90.140';
let port = '8081';
var socket = new io.Socket();
socket.connect('http://' + ipAddress + ':' + port);
 socket.on('connect', function() {
     socket.emit('message',{message:'Hi', user: 'guest0001'});
  });
 socket.on('message', function (data) {
    alert(data);
  }); */
//end of old code

//WILL USE localhost:3000 for now
var socket = io.connect();

socket.on('message', message => {

	messages.push(message);

	displayMessages();

	//scroll to the bottom
	chatWindow.scrollTop = chatWindow.scrollHeight;
});

createMessageHTML = message => {
	return `
		<p class="message ${message.author !== username ? 'message-left' : 'message-right'}">
		<span class="message-author">${ message.author !== username ? message.author+': ' : '' }</span>
		${message.content}
		</p>`;
};

displayMessages = () => {
	const messagesHTML = messages
		.map(message => createMessageHTML(message))
		.join('');
	//inserts messages into messagesList
	messagesList.innerHTML = messagesHTML;
};

purifier = input => {
	//TODO
 	return input 
};

sendBtn.addEventListener('click', e => {
	e.preventDefault();

	if (!usernameInput.value || !messageInput.value || usernameInput.value == " " || messageInput.value == " ") {
		//just console for now
		return console.log('Empty input!');
	}
	//set username
	if (usernameInput.value !== username) {
		username = purifier(usernameInput.value);
	}
	let text = purifier(messageInput.value);
	const message = {
		content: text,
		author: username
	};
	sendMessage(message);
	//clear input
	messageInput.value = '';

});

sendMessage = message => {
	socket.emit('message', message);
};

}
{

//elements
const chatWindow = document.getElementById('chat');
const messagesList = document.getElementById('messagesList');
const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const usernameInput = document.getElementById('usernameInput');
let username = '';

const messages = []; // { message: 'Hi', user: 'guest0001' }


//for the input
class Corrector {
  constructor(input) {
    this.msg = input;
  }

  purifier(msg) {
    //TODO
 	//console.log(msg);
    return msg;
  }

  inputChecker() {
    if (!this.msg || this.msg == " ") {
      //just console for now
      return console.log("Empty input!");
    }

    this.msg = this.purifier(this.msg);
    //console.log(this.msg);
    return this.msg;
  }
  
}

//check and set username
setUsername = user => {
	//set username
	if (user !== username) {
		//creating an instance, and cleaning input
		let iu = new Corrector(usernameInput.value);
		username = iu.inputChecker();
	}
};

createMessage = () => {
	let m = messageInput.value;
	let u = usernameInput.value;
	//username is set
	setUsername(u);
	//input
	let im = new Corrector(m);
	let text = im.inputChecker();
	
	const message = {
		content: text,
		author: username
	};
	return message;
};

sendMessage = message => {
	socket.emit('message', message);
};

//creating the chat html messages
printHtmlMessage = message => {
	return `
		<p class="message ${message.author !== username ? 'message-left' : 'message-right'}">
		<span class="message-author">${ message.author !== username ? message.author+': ' : '' }</span>
		${message.content}
		</p>`;
};

displayMessages = () => {
	const messagesHTML = messages
		.map(message => printHtmlMessage(message))
		.join('');
	//inserts messages into messagesList
	messagesList.innerHTML = messagesHTML;
};

//the SEND button
sendBtn.addEventListener('click', e => {
	e.preventDefault();

	sendMessage(createMessage());
	//clear input
	messageInput.value = '';

});

//WILL USE localhost:3000 for now
var socket = io.connect();

socket.on('message', message => {

	messages.push(message);

	displayMessages();

	//scroll to the bottom
	chatWindow.scrollTop = chatWindow.scrollHeight;
});

}

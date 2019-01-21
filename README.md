# SocketChat
chat with socket.io and ES6

After facing a stubborn problem I abandoned the plan to connect this chat to a live server. Instead now the app works on localhost.

problem:
GET http://undefined/socket.io/1/?t=... net::ERR_NAME_NOT_RESOLVED 

Details in the public/script.js file.

## How to use

Create a folder, paste files. You must have Node.js installed.

Install the required libraries:

    npm install

Run the server:

    node server.js

At browser, open some tabs and head to http://localhost:3000/ 
Chat!

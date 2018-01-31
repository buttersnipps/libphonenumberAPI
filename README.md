LibphonenumberAPI - A web server based on Googles phone number library.
=============
The aim of this project is to provide a web server that allows user to send GET and POST request 
across a web server to access Googles libphonenumber API.

### How to initilize the library?
#### NPM Install
Use the node package manager to install the necessary node modules 

```sh
$> npm install 
```
#### Starting the server
To start the server  run the node.js server.

```sh
$> node app.js
```
#### Sending GET request
GET request can be made directly through the url.Try the following url.
```sh
http://localhost:3000/api/phonenumbers/parse/text/Seneca%20Phone%20Number%20416-491-5050
```
#### Making a POST request
POST request can be made through third party plug ins like POSTMAN.
Try posting the following 
```sh
http://localhost:3000/api/phonenumbers/parse/
```

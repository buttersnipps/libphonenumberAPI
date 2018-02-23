
/*
Global Variables
*/

let uri = '/api/phonenumbers/parse/text/:inputData';
let postUri ='/api/phonenumbers/parse/';
let PNF = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
let fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
let multer = require('multer');
let upload = new multer();
let fs = require('fs');
let WordExtractor = require("word-extractor");
let extractor = new WordExtractor();
let textract = require('textract');
/*
Express dependencies for node server
*/

let express = require('express');
let app = express();
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

//app.use(function(req,res,next))

/*
Helper function to parse the actual phone number from a string
*/
function parsePhoneNumber(param){
    let lastSpace = param.lastIndexOf(" ");
      let myNum =  param.slice(lastSpace);
      return myNum;
    //console.log(myNum);
  }

 

/*
Get Request 
*/
app.get(uri, function (req, res) {
  inputData = req.params.inputData;
    console.log("Actual input data : "+inputData);

  /*if(inputData == "nothing"){
      console.log(inputData);
      if else statement to see if params are nothing or not
  }*/

  let phoneNumber = parsePhoneNumber(inputData);
  let sendThisNumber = req.params.phoneNumber;
  console.log("Phone number from the URL is : " + phoneNumber);

  var phoneNumberSend = phoneUtil.parse(phoneNumber, 'CA');
  console.log(phoneUtil.format(phoneNumberSend, PNF.INTERNATIONAL));
  res.send(phoneNumberSend);
});

app.post(postUri, upload.single('file'), function(req, res) {  
  var extention = req.file.originalname.split('.').pop().toString();

  if(extention == "doc"){
    var pString = req.file.path;
    let extracted = extractor.extract(pString);    
    extracted.then(function(doc) {
      console.log(doc.getBody());
      res.send(doc.getBody());
    });
  }
  else if(extention == "docx"){
    var pString = req.file.path;
    textract.fromFileWithPath(req.file.originalname, function( error, text ) {
      var string = text.toString('ascii')
      let result = new Buffer(string,'base64').toString('ascii');
      console.log(result);
      res.send(result);
    })
  }
  else{
    fs.readFile("numbers.txt", "utf8", function(error, data) {
        let text= new Buffer(data,'base64').toString('ascii');
        console.log(text);
        res.send(text);
      });
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



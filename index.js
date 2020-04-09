// const questions = [

// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// }

// init();

//////////////////////////////////////////////////////////////////////////

const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

//prompt user for their github user name

inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your Github username?"

    }
]).then(function(username){
    //store user name
    let githubName= JSON.stringify(username.username);
    console.log(githubName);

    axios
     .get("curl -u"+ githubName+ "https://api.github.com/user")
     .then(function(response){
         console.log(response.data);
     })
    
})
  
//use axios to get response from github API by passing stored user name

//manipulate github api response to get data I want

//prompt user other README related questions

//use temporal literals to popluate README

//use fs to generate MD file

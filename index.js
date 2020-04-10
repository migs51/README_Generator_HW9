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
]).then(function({username}){
    //store user name
    //use axios to get response from github API by passing stored user name
    const queryURL = `https://api.github.com/users/${username}`;
    //manipulate github api response to get data I want
    axios
    .get(queryURL)
    .then(function(response){
        let bioImage = response.data.avatar_url;
        console.log(bioImage);
    })
})




//prompt user other README related questions

//use temporal literals to popluate README

//use fs to generate MD file

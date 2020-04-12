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
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);



//prompt user for their github user name

function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your Github username?"
        },
        {
            type: "input",
            name: "title",
            message: "Provide a title of your project"
        },
        {
            type: "input",
            name: "description",
            message: "Provide a brief description of your project"
        },
        {
            type: "input",
            name: "instructions",
            message: "Provide installation instructions."
        },
        {
            type: "input",
            name: "usage",
            message: "Provide instructions and examples for use."
        },
        {
            type: "input",
            name: "credits",
            message: "List your collaborators, if any."
        },
        {
            type: "input",
            name: "license",
            message: "Let your users know what they can and can't do with your project."
        },
        {
            type: "input",
            name: "contributing",
            message: "Add any guidliness for contributing to this project."
        },
        {
            type: "input",
            name: "tests",
            message: "Write tests for your app here and provide examples on how to use them."
        },
        {
            type: "input",
            name: "questions",
            message: "add contact info for users to reach out if they have any questions"
        }
    ])
}

// .then(function({username, title, instructions, usage, credits, license, contributing, tests, questions}){
//     //store user name
//     //use axios to get response from github API by passing stored user name
   
//     //manipulate github api response to get data I want
//     axios
//         .get(queryURL)
//         .then(function(response){
//             let bioImage = `<img src = "${response.data.avatar_url}" alt= "image of Miguel" height= "100px" width="100px" />"`;
//             console.log(bioImage);

//         fs.writeFile("readmeGen.md", bioImage, function(err){
//             if (err) {
//                 throw err;
//             }
//             console.log ("Success!");
//         })

//     })
// })

function generateMD (answers, bioImage) {

    return `
# Your Project Title
${answers.title}

## Description 
${answers.description}

## Table of Contents 

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Badges](#badges)
* [Contributing](#contributing)
* [Tests](#tests)
* [Author](#author)


## Installation
${answers.instructions}

## Usage 
${answers.usuage}


## Credits
${answers.credits}


## License
${answers.license}


## Badges
${answers.badges}

## Contributing
${answers.contributing}


## Tests
${answers.tests}

## Author
<img src = "${bioImage}" alt= "image of Miguel" height= "100px" width="100px" />

    `
}



async function init() {
    try {
        const answers = await promptUser();
        
        const githubAPI = await axios.get(`https://api.github.com/users/${answers.username}`);
        const {avatar_url: bioImage} = githubAPI.data;
        console.log(bioImage);
        const md = generateMD(answers, bioImage);
        // let bioImage = response.data.avatar_url;
        // console.log(bioImage);
        // <img src = "${response.data.avatar_url}" alt= "image of Miguel" height= "100px" width="100px" />
      
        await writeFileAsync("readmeGen.md", md);
    } catch(err){
        console.log(err);
    }
}

init();



//prompt user other README related questions

//use temporal literals to popluate README

//use fs to generate MD file

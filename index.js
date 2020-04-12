
//global variables
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);



//function to prompt user for their github user name

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

//function that returns MD language, prompt answers and github api response to provide content using template literals in order to write to newly generated .md file
function generateMD (answers, bioImage) {

    return `
# ${answers.title}


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
![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)


## Contributing
${answers.contributing}


## Tests
${answers.tests}

## Author
${answers.questions}
<img src = "${bioImage}" alt= "image of Miguel" height= "100px" width="100px" />

    `
}


//async await function that returns user ansers, gets the github API
//used obj destructing to grab avatar image
//passed answers from prompt and the github avatarg image as paramets in my generateMD function to render user provided content
async function init() {
    try {
        const answers = await promptUser();
        const githubAPI = await axios.get(`https://api.github.com/users/${answers.username}`);
        const {avatar_url: bioImage} = githubAPI.data;
        console.log(bioImage);
        const md = generateMD(answers, bioImage);
        
      //use fs to generate MD file
        await writeFileAsync("readmeGen.md", md);
    } catch(err){
        console.log(err);
    }
}

init();








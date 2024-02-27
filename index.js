const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");
const fs = require("node:fs");

const questions = [
    "Project Title?", 
    "Description?", 
    "Installation Instructions?", 
    "Usage Information?", 
    "Contribution Guidelines?", 
    "Test Instruction?", 
    "License? (IMPORTANT: You May Need to Sign the Generated File)", 
    "GitHub Username?", 
    "Email Address?"
];
function writeToFile(fileName, data) {
    var readme = generateMarkdown(data);
    fs.writeFile(fileName, readme, err => {
    if (err) {
        console.error(err);
    } else {
        console.log("Success");
    }
    });
}
function init() {    
    var q = [];
    // Iterates through the questions const
    for (var i = 0; i < 9; i++){
        // Checks if the question is the license exception
        if (i === 6){
            q.push(`{
                "type": "list",
                "message": "${questions[i]}",
                "name": "${"6"}",
                "choices": [
                    "GNU GPLv3", 
                    "Apache 2.0", 
                    "MIT",
                    "The Unlicense", 
                    "All Rights Reserved"
                ]
            }`);
        } else {
            q.push(`{
                "type": "input",
                "message": "${questions[i]}",
                "name": "${i.toString()}"
            }`);
        }
        // Converts each string to JSON
        q[i] = JSON.parse(q[i]);
    }
    inquirer
    .prompt([
        ...q
    ])
    .then((answers) => {
        writeToFile("README.md", answers);
    })
    .catch((error) => {
        if (error.isTtyError) {
        } else {
        }
    });
}
init();

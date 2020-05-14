const Manager = require("./libs/Manager");
const Engineer = require("./libs/Engineer");
const Intern = require("./libs/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
let position = null;
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./libs/htmlRenderer");

const teamMembers = [];
const idArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

function appPrompt() {

    function createManager() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    } return "Please enter value."
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "internUniversity",
                message: "What is your intern's academic university?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    } return "Please enter value."
                }
                 
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internUniversity);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
        });
    };

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    } return "Please enter value."
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's gitHub username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    } return "Please enter value."
                }
                 
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        });
    };


    function buildTeam() {
        // Create the output directory if the output path doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
    createManager();

};

appPrompt();


// function initiateFunction() {
//     console.log("Build Your Squad.");

//     inquirer.prompt([
//         {
//             type: "list",
//             name: "position",
//             message: "What is their position?",
//             choices: ["manager", "engineer", "intern"]
//         },
//         {
//             type: "input",
//             name: "name",
//             message: "What is their name?",
//             validate: answer => {
//                 if (answer !== "") {
//                     return true;
//                 }
//                 return "Please enter valid name.";
//             }
//         },
//         {
//             type: "input",
//             name: "id",
//             message: "What is their ID?",
//             validate: answer => {
//                 const pass = answer.match(
//                     /^[1-9]\d*$/
//                 );
//                 if (pass) {
//                     return true;
//                 }
//                 return "Please enter value greater than zero!"
//             }
//         },
//         {
//             type: "input",
//             name: "email",
//             message: "What is their email?",
//             validate: answer => {
//                 const pass = answer.match(
//                     /\S+@\S+\.\S+/
//                 );
//                 if (pass) {
//                     return true;
//                 }
//                 return "Please enter valid email address!"
//             }
//         },
//         {
//             type: "input",
//             name: "officeNumber",
//             message: "What is their office number?",
//             validate: answer => {
//                 const pass = answer.match(
//                     /^[1-9]\d*$/
//                 );
//                 if (pass) {
//                     return true;
//                 }
//                 return "Please enter value greater than zero!"
//             }
//         }

//     ]).then(answers => {
//        const position = answers.position;
//         main(answers.name, answers.id, answers.email);
//     })

//     // anser this always name , id , email
//     // const keepasking = true;
//     // const all = [];
//     // while (keepasking) {
//     //     let newPerson = null;
//     //     const { name, id, email } = await mainQuestions();
//     //     switch (postion) {

//     //         case "manager":
//     //             const { getOfficeNumber } = await getMangerInfo();
//     //             newPerson = new Manager({ name, id, email, getOfficeNumber })
//     //         case "enginier":
//     //             const { getOfficeNumber } = await getMangerInfo()


//     //     }
//     //     teamMembers.push(newPerson);

//     //     const more = await addmore();


//     // }
//     //
// }

// async function main(name, id, email) {
//     let keepAsking = true;
//     let newPerson = null;
//     while (keepAsking) {
//         const more = await addMore();

//         switch (position) {
//             case "manager":
//                 const { getOfficeNumber } = await getOfficeNumber();
//                 newPerson = new Manager({ name, id, email, getOfficenumber });
//                 teamMembers.push(newPerson);
//             case "engineer":
//                 const { getGitHub } = await getGitHub();
//                 newPerson = new Engineer({ name, id, email, getGitHub });
//                 teamMembers.push(newPerson);

//             case "intern":
//                 newPerson = new Intern({ name, id, email, getSchool });
//                 const { getSchool } = await getSchool();
//                 teamMembers.push(newPerson);

//         }


//         if (more === "no") {
//             keepAsking = false;
//         }
//     }
// }

// async function addMore() {
//     return inquirer.prompt([
//         {
//             type: "list",
//             name: "addNew",
//             message: "Would you like add another employee?",
//             choices: ["yes", "no"]

//         },].then(answer => {
//             if (answer === "yes") {
//                 initiateFunction();
//             }
//             else {
//                 //run a function to create the team
//             }
//         }))
// }
// initiateFunction();
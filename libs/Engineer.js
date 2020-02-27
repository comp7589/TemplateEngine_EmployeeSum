// TODO: Write code to define and export the Engineer class. HINT: This class is inherited from Employee.
const Employee = require("./Employee")


class Engineer extends Employee{
    constructor(name, id, email, gitHub) {
       super(name, id, email);
        this.gitHub = gitHub;
    }
 
    getGitHub() {
        return this.gitHub;
    }
    getRole() {
        return "engineer";
    }
}

module.exports = Engineer;
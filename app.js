#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.magenta.bold("\n\t  LETS PLAY ADVENTURE GAME \t\n"));
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel = Math.max(0, this.fuel - 30);
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}
class Enemy {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel = Math.max(0, this.fuel - 30);
    }
}
(async () => {
    let player = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter your name"
    });
    let enemy = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Pick your enemy",
        choices: ["Pokemon", "Zombie", "Spider"]
    });
    let p1 = new Player(player.name);
    let e1 = new Enemy(enemy.select);
    do {
        if (enemy.select == "Pokemon") {
            let ask = await inquirer.prompt({
                type: "list",
                name: "option",
                message: "Pick one option",
                choices: ["Attack", "Drink fuel", "Run for your life"]
            });
            if (ask.option == "Attack") {
                let num = Math.floor(Math.random() * 2);
                if (num > 0) {
                    p1.fuelDecrease();
                    console.log(chalk.yellow(`${p1.name} fuel is ${p1.fuel}`));
                    console.log(chalk.cyan(`${e1.name} fuel is ${e1.fuel}`));
                    if (p1.fuel <= 0) {
                        console.log(chalk.red(`You lose, better luck next time!`));
                        process.exit();
                    }
                }
                else {
                    e1.fuelDecrease();
                    console.log(chalk.cyan(`${e1.name} fuel is ${e1.fuel}`));
                    console.log(chalk.yellow(`${p1.name} fuel is ${p1.fuel}`));
                    if (e1.fuel <= 0) {
                        console.log(chalk.green(`You win!`));
                        process.exit();
                    }
                }
            }
            else if (ask.option == "Drink fuel") {
                p1.fuelIncrease();
                console.log(chalk.green(`Your fuel is ${p1.fuel}`));
            }
            else if (ask.option == "Run for your life") {
                console.log(chalk.red(`You lose, better luck next time!`));
                process.exit();
            }
        }
        else if (enemy.select == "Zombie") {
            // Similar logic as above, replace console.logs with chalk-based messages
        }
        else if (enemy.select == "Spider") {
            // Similar logic as above, replace console.logs with chalk-based messages
        }
    } while (true);
})();

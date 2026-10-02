import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from 'node:process';


async function RunGame(){
    let assets = 25.00;
    let costToMake = 0.25;
    let weather = "HOT";
    let sales = 0;
    let profit = 0;

    console.log("A New Day");
    console.log("Weather: HOT")

    let rl = readline.createInterface({input, output});
    let running = true;

    while (running){
        //day start
        const userPrice = await rl.question("Input price: ");
        console.log("chosen lemonade unit price: " + userPrice);

        if (weather == "HOT"){
            sales = 15;
        }

        //calc revenue
        console.log("\n===DAY END===\n")
        profit = sales * (parseFloat(userPrice) - costToMake)
        assets = profit + assets
        console.log("total profits: " + profit)
        console.log("total assets: " + assets + "\n")
    
    };

    
}
//rl.close();

RunGame();


 


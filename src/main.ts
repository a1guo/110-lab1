import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from 'node:process';
import { setTimeout as sleep } from 'node:timers/promises';


async function RunGame(){
    let assets = 25.00;
    let costToMake = 0.25;

    let potentialSales = 0;
    let actualSales = 0;
    let profit = 0;

    let weather = "HOT";
    let dayCount = 1;



    console.clear();
    console.log("====== LEMONADE GAME ======");
    await sleep(2000)
    console.clear();


    let rl = readline.createInterface({input, output});
    let running = true;



    while (running){
        //day start
        console.log("DAY: " + dayCount);
        await sleep(1000);
        console.log("loading weather data...");
        await sleep(1000)
        console.log("Weather: " + weather);
        await sleep(1000)
        console.clear();


        const userPrice = await rl.question("What would you like to price each cup today?: ");
        console.log("chosen lemonade unit price: " + userPrice);
        await sleep(500);
        const cupCount = await rl.question("How many cups would you like to make today?: ");
        console.log("chosen lemonade cup number: " + cupCount);

        sleep(1000);

        if (weather == "HOT"){
            potentialSales = 15;
        }

        console.clear();
        console.log("Serving Lemonade...");
        await sleep(2000);


        //calc revenue
        console.clear();
        console.log("\n===DAY END===\n");
        await sleep(1000);

        if(parseFloat(cupCount) > potentialSales){
            //overmade
            actualSales = potentialSales;
        }else{
            actualSales = parseFloat(cupCount);
        }

        profit =  actualSales * (parseFloat(userPrice) - costToMake);
        assets = profit + assets;

        console.log("# Sales made: " + actualSales);

        console.log("total profits: $" + profit);
        await sleep(500);
        console.log("total assets: $" + assets + "\n")
        await sleep(500);

        const continueGame = await rl.question("Continue?(Y/N): ");
        if(continueGame == "N"){
            rl.close();
            break;
        }
    
    };

    
}
//rl.close();

RunGame();


 


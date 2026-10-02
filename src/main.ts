import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from 'node:process';
import { setTimeout as sleep } from 'node:timers/promises';


const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";


class Store{
    multiplier = 1.0;
    basePrices;

    constructor(){
        this.basePrices = { 
            cups: 0.1,
            ice: 0.1,
            lemons: 0.3,
            sugar: 0.1
        };
    }

    getPrice(item:string){
        return this.basePrices[item] * this.multiplier;
    }

    modifyPrices(multiplier:number){
        this.multiplier = multiplier;
    }

}

class LemonadeStand {
    cash: number;
    cups: number;
    ice: number;
    lemons: number;
    sugar: number;

    constructor() {
        this.cash = 25;
        this.cups = 0;
        this.ice = 0;
        this.lemons = 0;
        this.sugar = 0;
    }

    buy(item: string, amount: number, price: number) {
        let cost = amount * price;
        if(cost > this.cash){
            return false;
        }

        this.cash = this.cash - cost;
        this[item] = this[item]+ amount;
        return;
    }

    earn(amount: number){
        this.cash += amount;
    }

    get(item: string){
        return this[item];
    }

    use(amount:number){
        if(this.cups - amount < 0 || this.ice - amount < 0 || this.lemons - amount < 0 || this.sugar - amount < 0){
            let min = Math.min(this.cups,this.ice,this.lemons,this.sugar);
            this.cups -= min;
            this.ice -= min;
            this.lemons -= min;
            this.sugar -= min;

            return [min, false];
        }else{
            this.cups -= amount;
            this.ice -= amount;
            this.lemons -= amount;
            this.sugar -= amount;

            return [amount, true];
        }
    }
}


let store = new Store();
let stand = new LemonadeStand();

let weathers = ["HOT", "WARM", "COOL", "STORMY"]
let weatherIndex;
let weather;

//tand.buy("cups", 10, store.getPrice("cups"));

async function RunGame(){
    let dayCount = 1;


    console.clear();
    console.log(YELLOW + "==== LEMONADE GAME ====" + RESET + "\n");
    await sleep(2000)
    console.clear();


    let rl = readline.createInterface({input, output});
    let running = true;



    while (running){
        //region determine weather
        weatherIndex = Math.floor(Math.random() * weathers.length);
        weather = weathers[weatherIndex];

        let potentialSales;
        if(weather == "HOT"){
            potentialSales = 15;
            store.modifyPrices(1.3);
        }else if(weather == "WARM"){
            potentialSales = 10;
            store.modifyPrices(1.);
        }else if(weather == "COOL"){
            potentialSales = 5;
            store.modifyPrices(0.9);
        }else{
            potentialSales = 2;
            store.modifyPrices(0.5);
        }
        //endregion

        
        //region day start
        console.log("DAY: " + dayCount);
        await sleep(1000);
        console.log("loading weather forecast data...");
        await sleep(1000)
        console.log("Weather: " + weather);
        await sleep(2000)
        console.clear();
        //endregion


        //region load price of goods
        console.log("===Store prices today ===");
        await sleep(200);
        console.log("Cups: $" + store.getPrice("cups"));
        await sleep(200);
        console.log("Ice: $" + store.getPrice("ice"));
        await sleep(200);
        console.log("Lemons: $" + store.getPrice("lemons"));
        await sleep(200);
        console.log("Sugar: $" + store.getPrice("sugar"));
        await sleep(200);
        //endregion
        

        //region INVENTORY
        console.log("\n===INVENTORY===")
        await sleep(200);
        console.log("Cups: " + stand.get("cups"));
        await sleep(200);
        console.log("Ice: " + stand.get("ice"));
        await sleep(200);
        console.log("Lemons: " + stand.get("lemons"));
        await sleep(200);
        console.log("Sugar: " + stand.get("sugar"));
        await sleep(200);
        //endregion


        let items = ["cups", "ice", "lemons", "sugar"];
        console.log("\n\nBALANCE: $" + stand.cash);
        const purchase = await rl.question("How many of each items would you like you buy today (0102 format, up to 9 each)? ");

        for(let i = 0; i<items.length; i++){ //GET ALL PRICES
            let qty = Number(purchase[i]) || 0;
            stand.buy(items[i], qty, store.getPrice(items[i]));

        }

        const userPrice = await rl.question("What would you like to price each cup today?: $");
        console.log("chosen lemonade unit price: $" + userPrice);
        await sleep(500);
        
        let invCheck = stand.use(potentialSales);
        const cupCount = invCheck[0]; //CHECK INVENTORY
        invCheck = invCheck[1];

        await sleep(1000)
        console.clear();
        await sleep(500)
        
        console.log("Serving lemonade...")
        await sleep(2000)


        //DAY OVER
        console.log("+++ DAY " + dayCount + " OVER +++");
        await sleep(1000)

        let sales: number;
        
        //region calc
        if(parseFloat(cupCount) > potentialSales){
            //overmade
            sales = potentialSales;
        }else{
            sales = parseFloat(cupCount);
        }

        let grossIncome = sales * parseFloat(userPrice);
        stand.earn(grossIncome);
        //endregion

        //performance
        console.log("CUPS SOLD: " + sales);
        await sleep(700)
        console.log("GROSS INCOME: $" + grossIncome)
        await sleep(2000)

        console.log("BALANCE: $" + stand.cash.toFixed(2) +"\n");
        
        if (invCheck == false){
            console.log("RAN OUT OF INGREDIENTS DURING THE DAY\n")
        }


        //continue?
        await sleep(1000)
        const continueGame = await rl.question("Continue? (y/n): ");
        if(continueGame == "n"){
            running = false;
            rl.close();
            console.clear();

        }
        dayCount += 1;
        console.clear();
        
        

        
    
    };

    
}
//rl.close();

RunGame();


 


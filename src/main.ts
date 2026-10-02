import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from 'node:process';
import { setTimeout as sleep } from 'node:timers/promises';


class Store{
    multiplier = 1.0;
    prices;

    constructor(){
        this.prices = { 
            cups: 0.1 * this.multiplier,
            ice: 0.1 * this.multiplier,
            lemons: 0.3 * this.multiplier,
            sugar: 0.1 * this.multiplier
        }
    }

    getPrice(item:string){
        return this.prices[item];
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
    console.log("====== LEMONADE GAME ======");
    await sleep(2000)
    console.clear();


    let rl = readline.createInterface({input, output});
    let running = true;



    while (running){
        //determine weather
        weatherIndex = Math.floor(Math.random() * weathers.length);
        weather = weathers[weatherIndex];

        //day start
        console.log("DAY: " + dayCount);
        await sleep(1000);
        console.log("loading weather forecast data...");
        await sleep(1000)
        console.log("Weather: " + weather);
        await sleep(1000)
        console.clear();

        //load price of goods
        console.log("===Store prices today ===");
        console.log("Cups: $" + store.getPrice("cups"));
        console.log("Ice: $" + store.getPrice("ice"));
        console.log("Lemons: $" + store.getPrice("lemons"));
        console.log("Sugar: $" + store.getPrice("sugar"));

        let items = ["cups", "ice", "lemons", "sugar"];
        const purchase = await rl.question("How many of each items would you like yo buy today (0102 format, up to 9 each)?");

        for(let i = 0; i<items.length; i++){
            let qty = Number(purchase[i]) || 0;
            stand.buy(items[i], qty, store.getPrice(items[i]));

        }

        const userPrice = await rl.question("What would you like to price each cup today?: ");
        console.log("chosen lemonade unit price: " + userPrice);
        await sleep(500);
        const cupCount = await rl.question("How many cups would you like to make today?: ");
        console.log("chosen lemonade cup number: " + cupCount);
        await sleep(1000)


        console.log("Serving lemonade...")
        await sleep(2000)

        
    
    };

    
}
//rl.close();

RunGame();


 


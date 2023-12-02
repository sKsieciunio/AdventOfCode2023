const fs = require('fs');

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

main();

function main()
{
    let data;
    let result = 0;
    let sum = 0;

    try 
    {
        data = fs.readFileSync('./input.txt', 'utf8');
    } 
    catch (err) 
    {
        throw new Error("Error reading the file");
    }

    let fileLineByLine = data.split(/\n/);

    for (let index = 0; index < fileLineByLine.length; index++) 
    {
        if (evaluateGame(fileLineByLine[index])) 
        {
            result = result + getGameNumber(fileLineByLine[index]);
        }
    }

    console.log(bagContent(fileLineByLine[0]));
    console.log(powerOfSet(bagContent(fileLineByLine[0])));

    for (let i = 0; i < fileLineByLine.length; i++)
    {
        sum = sum + powerOfSet(bagContent(fileLineByLine[i]));
    }

    console.log("Your result is: " + result);
    console.log("Sum of all powers of sets is: " + sum);
}

function powerOfSet(set)
{
    let result = 1;

    for (let i = 0; i < set.length; i++)
    {
        result = result * set[i];
    }

    return result;
}

function bagContent(game) 
{

    let draws = game.split(": ")[1].split(/; |, /);

    let draw;

    let reds = 0;
    let greens = 0;
    let blues = 0;

    for (let i = 0; i < draws.length; i++)
    {
        draw = draws[i].split(" ");

        switch (draw[1]) {
            case "red":
                reds = Math.max(reds, Number(draw[0]));
                break;
            case "green":
                greens = Math.max(greens, Number(draw[0]));
                break;
            case "blue":
                blues = Math.max(blues, Number(draw[0]));
                break;
        
            default:
                break;
        }
    }

    return [reds, greens, blues];
}

//This function return true when game is possible, and false when not
function evaluateGame(game) 
{

    let draws = game.split(": ")[1].split(/; |, /);

    let draw;

    let reds = 0;
    let greens = 0;
    let blues = 0;

    for (let i = 0; i < draws.length; i++)
    {
        draw = draws[i].split(" ");

        switch (draw[1]) {
            case "red":
                reds = Math.max(reds, Number(draw[0]));
                break;
            case "green":
                greens = Math.max(greens, Number(draw[0]));
                break;
            case "blue":
                blues = Math.max(blues, Number(draw[0]));
                break;
        
            default:
                break;
        }
    }

    if (reds > MAX_RED || greens > MAX_GREEN || blues > MAX_BLUE)
    {
        return false;
    } 
    else
    {
        return true;
    }
}

//This function returns number of Game
function getGameNumber(game)
{
    let gameName = game.split(": ")[0];
    let gameNumber = gameName.replace(/Game /, '');

    return Number(gameNumber);
}


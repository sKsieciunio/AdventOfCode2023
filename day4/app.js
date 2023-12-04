// this function takes file as string and returs it divided into array of lines
function divideFileIntoLines (data) {
    return data.split('\n');
}

// this function converts line from file to cardObject {cardNumber, winningNumbers[], myNumbers[]}
function lineToCardObject (line) {
    const regex = /:\s+|\s\|\s+/g;
    const cardObject = {};

    cardObject.cardNumber = Number(line.split(regex)[0].match(/\d+/)[0]);

    cardObject.winningNumbers = line.split(regex)[1].split(/\s+/g);
    for (let i = 0; i < cardObject.winningNumbers.length; i++) {
        cardObject.winningNumbers[i] = Number(cardObject.winningNumbers[i]);
    }

    cardObject.myNumbers = line.split(regex)[2].split(/\s+/g);
    for (let i = 0; i < cardObject.myNumbers.length; i++) {
        cardObject.myNumbers[i] = Number(cardObject.myNumbers[i]);
    }

    return cardObject;
}

// this function return how many of myNumbers match winningNumbers (int)
function findMatchingNumbers (cardObject) {
    let result = 0;

    for (let i = 0; i < cardObject.winningNumbers.length; i++) {
        for (let j = 0; j < cardObject.myNumbers.length; j++) {
            if (cardObject.winningNumbers[i] == cardObject.myNumbers[j]) {
                result = result + 1;
            }
        }
    }
    return result;
}

// this function calculates point score of card according to number of matching cards
function calculatePoints (matchingNumbers) {
    if(matchingNumbers == 0) {
        return 0;
    } else {
        return Math.pow(2, matchingNumbers - 1);
    }
}

const fs = require('fs');

try {
    file = fs.readFileSync('input.txt', 'utf-8');
} catch (err) {
    throw new Error("Error, couldnt read the file");
}

cardsArray = divideFileIntoLines(file);

let sum = 0;

for (let i = 0; i < cardsArray.length; i++) {
    sum = sum + calculatePoints(findMatchingNumbers(lineToCardObject(cardsArray[i])));
}

console.log(`Part 1 result: ${sum}`);

// PART 2 ==================================================> 

/*  this objects keeps track of number of cards with some specific number e.g.
 *  {'1' : 1, '2' : 3, '3' : 6}
 */
const HIGHEST_CARD = cardsArray.length;
const numberOfSpecificCards = {};

for (let i = 0; i < HIGHEST_CARD; i++) {
    numberOfSpecificCards[String(i + 1)] = 1;
} 

let numberOfMatchings, numberOfCards;

for (let i = 1; i <= HIGHEST_CARD; i++) {
    numberOfMatchings = findMatchingNumbers(lineToCardObject(cardsArray[i - 1]));
    numberOfCards = numberOfSpecificCards[String(i)];

    for (let j = i + 1; j <= i + numberOfMatchings; j++) {
        numberOfSpecificCards[String(j)] = numberOfSpecificCards[String(j)] + numberOfCards;
    }
}

// console.log(numberOfSpecificCards);

sum = 0;
for (let i = 1; i <= HIGHEST_CARD; i++) {
    sum = sum + numberOfSpecificCards[String(i)];
}   

console.log(`Part 2 result: ${sum}`);
const dict = {
	'A': 13,
	'K': 12,
	'Q': 11,
	'J': 10,
	'T': 9,
	'9': 8,
	'8': 7,
	'7': 6,
	'6': 5,
	'5': 4,
	'4': 3,
	'3': 2,
	'2': 1
};

const fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf-8').split('\n');

let cards = [];
cards = fileToCards(file);
cards = assignStrength(cards)
cards = sortCards(cards);
const cardsMirrored = [...cards].reverse();

let result = 0;

for (let i = 0; i < cardsMirrored.length; i++) {
	result += (i + 1) * cardsMirrored[i].bid;
}

console.log(result);

// console.log(cards);
// console.log(cards.length);

// FUNCTIONS =========================================

// returns array of card objects
function fileToCards(file = []) {
	let arrOfCards = [];
	let card = {};

	for (let i = 0; i < file.length; i++) {
		card = {
			hand: file[i].split(' ')[0],
			bid: Number(file[i].split(' ')[1])
		};
		arrOfCards.push(card);
	}

	return arrOfCards;
}

function assignStrength(cards = []) {
	for (let i = 0; i < cards.length; i++) {
		cards[i].strength = getStrength(cards[i].hand);
	}

	return cards;
}

// where cards is array of card objects
function sortCards(cards = []) {
	let Fives = [];
	let Fours = [];
	let Fulls = [];
	let Threes = [];
	let Twos = [];
	let Ones = [];
	let Highs = [];

	for (let i = 0; i < cards.length; i++) {
		switch (cards[i].strength) {
			case 7:
				Fives.push(cards[i]);
				break;
			case 6:
				Fours.push(cards[i]);
				break;
			case 5:
				Fulls.push(cards[i]);
				break;
			case 4:
				Threes.push(cards[i]);
				break;
			case 3:
				Twos.push(cards[i]);
				break;
			case 2:
				Ones.push(cards[i]);
				break;
			case 1:
				Highs.push(cards[i]);
				break;
		}
	}

	Fives = sortCardsByHand(Fives);
	Fours = sortCardsByHand(Fours);
	Fulls = sortCardsByHand(Fulls);
	Threes = sortCardsByHand(Threes);
	Twos = sortCardsByHand(Twos);
	Ones = sortCardsByHand(Ones);
	Highs = sortCardsByHand(Highs);

	return [...Fives, ...Fours, ...Fulls, ...Threes, ...Twos, ...Ones, ...Highs];
}

function sortCardsByHand(cards = []) {
	let tmp = {};

	if (cards.length == 1 || cards.length == 0) return cards;

	// sorting loops
	for (let i = 0; i < cards.length; i++) {
		for (let j = 0; j < cards.length - 1; j++) 
		{
			if (!compareCards(cards[j], cards[j + 1])) {
				tmp = cards[j];
				cards[j] = cards[j + 1];
				cards[j + 1] = tmp;
			}
		}
	}

	return cards
}

//returns true if card1 is stronger than card2
function compareCards(card1 = {}, card2 = {}) {
	for (let i = 0; i < card1.hand.length; i++) 
	{
		if (dict[card1.hand[i]] > dict[card2.hand[i]]) {
			return true;
		} else if (dict[card1.hand[i]] < dict[card2.hand[i]]) {
			return false;
		}
	}
}

/* strengths = [
	five = 7,
	four = 6, 
	full = 5, 
	three = 4, 
	two = 3, 
	one = 2, 
	high = 1
]
*/
function getStrength(hand = '') {
	const handWithoutDuplicates = [...new Set(hand.split(''))];
	let strength = 0;
	let char = '';
	let charCount = 0;

	//check for fiveOfAKind
	if (handWithoutDuplicates.length == 1) {
		strength = 7; //five
	}

	//check for FourOfAKind or fullHouse
	if (handWithoutDuplicates.length == 2) {
		char = hand[0];

		for(let i = 0; i < hand.length; i++) {
			if (hand[i] == char) charCount++;
		}

		//check for FourOfAKind
		if(charCount == 1 || charCount == 4) {
			strength = 6; //four
		} else {
			strength = 5; //full
		}
	}

	//check for ThreeOfAKind or TwoPairs
	if (handWithoutDuplicates.length == 3) {

		for (let n = 0; n < hand.length; n++) 
		{
			for (let i = 0; i < hand.length; i++) {
				if (hand[n] == hand[i]) charCount++;
			}

			if (charCount == 3) {
				strength = 4; //three
				break;
			} else {
				strength = 3; //two
				charCount = 0;
			}
		}
	}

	//check for OnePair
	if (handWithoutDuplicates.length == 4) {
		strength = 2; //one
	}

	//check for HighCard
	if (handWithoutDuplicates.length == 5) {
		strength = 1; //high
	}
	
	return strength;
}

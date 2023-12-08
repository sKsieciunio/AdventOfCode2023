class MyMap {
	constructor (mapName) {
		this.mapName = mapName;
	}

	set setMap (map) {
		this.map = map;
	}
	//this.mapName = nazwa mapy
	//this.map = tablica 2 wymiarowa map
};

// takes file as input and returs array of map objects
function deconstructMapsFromFile (file) {
	let arrayOfMaps = [];
	let tmpObject = {};
	const fileLines = fileToArray(file);

	for (let i = 0; i < fileLines.length; i++) {
		if (fileLines[i].match(/map/)){
			// console.log(fileLines[i].match(/map/), i);
			tmpObject = new MyMap(fileLines[i].split(' ')[0]);
			arrayOfMaps.push(tmpObject);
		}
	}

	return arrayOfMaps;
}

function fileToArray (file) {
	let fileLines = file.split(/\n+|\r+/g); 
	let loopCondition = fileLines.length;
	
	for (let i = 0; i < loopCondition; i++) {
		if (fileLines[i] == '') {
			fileLines.splice(i, 1);
			loopCondition = fileLines.length;
			i--;
		}
	}

	return fileLines;
}

function getSeedArray (file) {
	let line = fileToArray(file)[0];
	let seeds = line.split(' ');

	seeds.shift();

	for (let i = 0; i < seeds.length; i++) {
		seeds[i] = Number(seeds[i]);
	}

	return seeds;
}

const fs = require('fs');
let file;

try {
	file = fs.readFileSync("./test.txt", "utf-8"); 
} catch (err) {
	throw new Error("Couldnt read the file\n");
}

console.log(fileToArray(file));
console.log(getSeedArray(file));

console.log(deconstructMapsFromFile(file));

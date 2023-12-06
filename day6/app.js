function fileToLines(file) {
	return file.split('\r\n');
}

function getTimeTable(file) {
	let times = fileToLines(file)[0].split(/\s+/g);
	times.shift();
	times = times.map(Number);
	return times;
}

function getDistanceTable(file) {
	let distances = fileToLines(file)[1].split(/\s+/g);
	distances.shift();
	distances = distances.map(Number);
	return distances;
}

function game(times, distances) {
	// const times  = getTimeTable(file);
	// const distances = getDistanceTable(file);
	let dis, result = 0;
	let resultsMultiplied = 1;

	//nth race
	for (let n = 0; n < times.length; n++) {
		result = 0;
		for (let i = 0; i <= times[n]; i++) {
			dis = i * (times[n] - i);
			if (dis > distances[n]) result++;
		}
		resultsMultiplied = resultsMultiplied * result;
	}
	console.log(resultsMultiplied);
}

//expected output: 288

const fs = require('fs');
let file;

try {
	file = fs.readFileSync('./input.txt', 'utf-8');
} catch (err) {
	throw new Error("error reading file");	
}

console.log(fileToLines(file));

let times = getTimeTable(file);
let distances = getDistanceTable(file);

console.log(times, distances);

game(times, distances);

// PART 2 ===========================

function convertArrayToOne(arr) {
	arr = arr.map(String);
	let string = '';
	for (let i = 0; i < arr.length; i++) {
		string += arr[i];
	}
	arr = [Number(string)];
	return arr;
}

times = convertArrayToOne(times);
distances = convertArrayToOne(distances);

game(times, distances);

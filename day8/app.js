const fs = require('fs');
const file = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');
file.splice(1, 1);

const stepList = getSteps(file);
const nodes = createNodesFromFile(file);

console.log(nodes);

let currentNode = 'AAA';
let stepCounter = 0;
let direction = '';

while (currentNode != 'ZZZ') {
	direction = stepList[stepCounter % stepList.length];
	currentNode = findNode(nodes, currentNode)[direction];
	stepCounter++;
}

console.log(stepCounter);





//FUNCTIONS ====================================

function findNode(nodes = [], node = '') {
	for (let i = 0; i < nodes.length; i++) {
		if(nodes[i].node == node) {
			return nodes[i];
		}
	}
}

// this function returns array od nodes {node: 'AAA', left: 'BBB', right: 'CCC'}
function createNodesFromFile(file = []) {
	let nodes = [];
	let node = {};

	for (let i = 1; i < file.length; i++) {
		node = {};

		node.node = file[i].split(" = ")[0];
		node.L = file[i].split(/\s=\s\(|,\s|\)/g)[1];
		node.R = file[i].split(/\s=\s\(|,\s|\)/g)[2];

		nodes.push(node);
	}

	return nodes;
}

function getSteps(file = []) {
	return file[0];
}
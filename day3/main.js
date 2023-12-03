const fs = require('fs');

let file; 

try 
{
    file = fs.readFileSync('./input.txt', 'utf-8');
}
catch (err)
{
    throw new Error("Error reading the file.");
}

const numberOfLines = file.split("\n").length;
let elements;
let result = 0;

for (let i = 0; i < numberOfLines; i++)
{
    elements = findNumbersPositionAndLengths(getLineFromFile(file, i));

    for (let j = 0; j < elements.length; j++)
    {
        if (checkSurroundings(file, i, elements[j].postion, elements[j].length))
        {
            result = result + Number(elements[j].number);
        }
    }
}

console.log(result);

// FUNCTIONS -------------------------------------

function findNumbersPositionAndLengths(inputString)
{
    const regex = /\d+/g;
    const numbersInfo = [];
    let match;

    while ((match = regex.exec(inputString)) != null)
    {
        numbersInfo.push({
            number: match[0],
            postion: match.index,
            length: match[0].length
        });
    }

    return numbersInfo
}

// returns true if there is symbol around number 
function checkSurroundings(data, line, index, numberLength)
{
    const regex = /[^.]/g;
    let currentLine = getLineFromFile(data, line);
    let loopIndex = index - 1;
    let loopCondition = index + numberLength;

    if (loopIndex < 0)
    {
        loopIndex = 0;
    }

    if (loopCondition = currentLine.length)
    {
        loopCondition = currentLine.length - 1;
    }

    // check symbol before and after
    currentLine = getLineFromFile(data, line);
    
    if  ((currentLine[index - 1] != '.' && index - 1 >= 0) ||
         (currentLine[index + numberLength] != '.' && index + numberLength < currentLine.length))
    {
        return true;
    }

    // if (currentLine[(index - 1 < 0 ? 0 : index - 1)] != '.' ||
    //     currentLine[(index + numberLength == currentLine.length ? index + numberLength - 1 : index + numberLength)] != '.')
    // {
    //     return true;
    // }

    // check for symbol in line above
    currentLine = getLineFromFile(data, line - 1)
    if (currentLine != null) 
    {
        for (let i = loopIndex; i <= loopCondition; i++)
        {
            if (currentLine[i] != '.')
            {
                return true;
            }
        }
    }

    // check for symbol in line below
    currentLine = getLineFromFile(data, line + 1)
    if (currentLine != null) 
    {
        for (let i = index - 1; i <= loopCondition; i++)
        {
            if (currentLine[i] != '.')
            {
                return true;
            }
        }
    }

    return false;
}

// line starting with index 0
function getLineFromFile(data, line)
{
    const fileArray = data.split('\n');

    if (line < 0 || line >= fileArray.length)
    {
        return null;
    }

    return fileArray[line];
}
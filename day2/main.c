#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LINE_LENGHT 200
#define MAX_RED 12
#define MAX_GREEN 13
#define MAX_BLUE 14

int evaluateGame(char* line);
int getGameNumber(char* line);

int main(int argc, char const *argv[])
{
    FILE* filePointer = fopen("./testinput.txt", "r");
    char currentLine[LINE_LENGHT];

    int result;

    if (filePointer == NULL)
    {
        printf("ERROR: Could not open file.\n");
        return EXIT_FAILURE;
    }

    while (fgets(currentLine, LINE_LENGHT, filePointer))
    {
        result += evaluateGame(currentLine);
    }

    fclose(filePointer);

    printf("Program executed successfully. Result: %d\n", result);
    return EXIT_SUCCESS;
}

int evaluateGame(char* line)
{
    int gameNumber = getGameNumber(line);

    return gameNumber;
}

int evaluateGame(char* line)
{
    int index = 5;

    while (line[index] != 58) //58 is ASCII for ":"
    {
        index++;
    }
    
    for (index--; index > 4; index--)
    {
        
    }
}

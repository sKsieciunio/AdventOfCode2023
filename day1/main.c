#include <stdio.h>
#include <stdlib.h>

#define LINE_LENGHT 100

int decodeLine(char* str);

int main(int argc, char const *argv[])
{
    FILE *filePointer;
    char buffer[LINE_LENGHT];
    int counter = 0;

    filePointer = fopen("./input.txt", "r");

    if (filePointer == NULL)
    {
        printf("File could not be opened.\n");
        return EXIT_FAILURE;
    }
    
    while (fgets(buffer, LINE_LENGHT, filePointer) != NULL)
    {
        counter += decodeLine(buffer);
    }
    
    fclose(filePointer);

    printf("Program run successfully. Result: %d\n", counter);
    return EXIT_SUCCESS;
}

int decodeLine(char* str) {
    int result = 0;
    int lastDigit;
    int index;

    for (index = 0; index < LINE_LENGHT; index++)
    {
        if (str[index] == 10)
            return 0;

        if (str[index] >= 48 && str[index] <= 57)
        {
            result += (str[index] - 48) * 10;
            break;
        }
    }

    while (index < LINE_LENGHT && str[index] != 10)
    {
        if (str[index] >= 48 && str[index] <= 57)
            lastDigit = str[index] - 48; 
        
        index++;
    }
    
    result += lastDigit;

    return result;
}

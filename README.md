# shahryTask

Egyptian national ID validator & data extractor

## Getting started

1. clone the repo
2. open terminal from project root file
3. run 
```
npm install
``` 
4. To start the API 
```
node .
```
5. Open browser to http://localhost:8000/
6. To validate and extract info from a national ID, add it after the slash like this: http://localhost:8000/30602200102301

## The logic
### The ID is divided into partitions
- The first digit should be either 2 or 3
- The next 6 digits should represent a valid birth date
- The next 2 digits should represent a Governate
- The lase bit should be between 1 and 9

*if any of the conditions above is not met, the ID is invalid*

### If the ID is valid, the birth date, birth governate and gender are extracted
The output is returned in form of a JSON object, with 4 attributes: 
1. "isValid"
2. "birthDate"
3. "birthGov"
4. "gender"


## About

This API was built using JavaScript (node)

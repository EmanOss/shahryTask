# shahryTask

Egyptian national ID validator & data extractor

## Getting started  🖥️

1. Clone the repo
2. Open terminal from project root
3. To install dependencies
```
npm install
``` 
4. To start the API 
```
node .
```
5. Open browser to http://localhost:8000/
6. To validate and extract info from a national ID, add it after the slash like this: http://localhost:8000/30602200102301

## The logic  🔍
**A) The ID is sent as a parameter in a GET request**

**B) Next, the ID is divided into partitions**

*If any of the conditions below is not met, the ID is invalid*

- The first digit should be either 2 or 3
- The next 6 digits should represent a valid birth date
- The next 2 digits should represent a Governate
- The last bit should be between 1 and 9


**C) If the ID is valid, the birth date, birth governate and gender are extracted**

The output is returned in form of a `JSON object`, with 4 attributes: 
1. "isValid"
2. "birthDate"
3. "birthGov"
4. "gender"

*Note: in case of an invalid ID, only the 1st attribute is included*


## About  ℹ️

This API was built using JavaScript (node v16.13.0)

const app = require('express')();
const PORT = 8000;
var govList = require('./governates.json');


app.listen(
    PORT,
    () => console.log(`Live on http://localhost:${PORT}`)
)

app.get('/', (req, res) => {
    res.status(200).send({"msg":"Hello Shahry !"});
})
app.get('/:egpID', (req, res) => {
    //validate first
    var myStatus = 200;
    var myMsg = {};
    var egpID = req.params.egpID;
    if (!(verifyID(egpID))) {
        myStatus = 400;
        myMsg = {"isValid" : "No"}
    }
    else {
        //extracting parts
        var century = Number(egpID.substring(0, 1));
        var birthDate = egpID.substring(1, 7);
        var gov = egpID.substring(7, 9) + "";
        var gender = egpID.substring(12, 13);
        myMsg = {
            "isValid" : "Yes",
            "birthDate": extractBirthDate(birthDate, century),
            "birthGov": govList[gov],
            "gender": (gender % 2 === 0) ? "F" : "M",
        };
    }
    res.status(myStatus).send(myMsg);
});

function verifyID(egpID) {
    //check length
    if (egpID.length === 14) {
        var century = Number(egpID.substring(0, 1));
        var birthDate = egpID.substring(1, 7);
        var gov = egpID.substring(7, 9);
        var check = Number(egpID.substring(13, 14));
        if (!(govList.hasOwnProperty(gov))) {
            console.log("  Invalid national ID - gov");
            return false;
        }
        if (century < 2 || century > 3) {
            console.log("  Invalid national ID - century");
            return false;
        }
        if (!verifyBirthDate(birthDate, century)) {
            console.log("   Invalid national ID - birthdate");
            return false;
        }
        if (check < 1) {
            console.log("  Invalid national ID - check integer");
            return false;
        }
    }
    else {
        return false;
    }
    return true;
}
function verifyBirthDate(birthDate, century) {
    var year = Number(birthDate.substring(0, 2));
    (century == 2) ? year += 1900 : year += 2000;
    var month = Number(birthDate.substring(2, 4));
    var day = Number(birthDate.substring(4, 6));
    if (day < 1)
        return false;
    switch (month) {
        case 04:
        case 06:
        case 09:
        case 11:
            if (day > 30)
                return false;
            break;
        case 01:
        case 03:
        case 05:
        case 07:
        case 08:
        case 10:
        case 12:
            if (day > 31)
                return false;
            break;
        case 02:
            if ((year % 4 === 0 && year % 100 !== 0)
                || (year % 4 === 0 && year % 100 === 0 && year % 400 === 0)) {
                if (day > 29)
                    return false;
                break;
            }
            else {
                if (day > 28)
                    return false;
                break;
            }
        default: //month out of range
            return false;
    }
    //verify older than 16 yrs
    var sixteen = year + 16;
    var sixteenDate = new Date(sixteen, month - 1, day + 1);
    var today = new Date();
    if (sixteenDate > today) {
        // console.log("less than 16", sixteenDate);
        return false;
    }

    return true;

}
function extractBirthDate(birthDate, century) {
    var year = Number(birthDate.substring(0, 2));
    (century == 2) ? year += 1900 : year += 2000;
    var month = Number(birthDate.substring(2, 4));
    var day = Number(birthDate.substring(4, 6));

    return new Date(year, month - 1, day + 1).toDateString();
}
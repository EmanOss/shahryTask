// import AppBar from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'
// import Typography from '@mui/material/Typography'
const app = require('express')();
const PORT = 3000;
var govList = require('./governates.json');


app.listen(
    PORT,
    () => console.log(`hey there http:localhost:${PORT}`)
)

app.get('/', (req, res) => {
    res.status(200).send('Hello Shahry !');
})
//----------------------------verify the ID-----------------------------
app.get('/:egpID', (req, res) => {

    const egpID = req.params.egpID;
    // var verified = true;
    var myStatus = 200;
    var myMsg = "all good here";
    //verify length
    if (egpID.length === 14) {
        //extracting parts
        var century = Number(egpID.substring(0, 1));
        var birthDate = egpID.substring(1, 7);
        var gov = egpID.substring(7, 9);
        var gender = Number(egpID.substring(9, 13));
        var check = Number(egpID.substring(13, 14));



        if (!(govList.hasOwnProperty(gov))        ) {
            myStatus = 400;
            myMsg = "Invalid national ID - gov";
        }
        if(century <2 || century>3){
            myStatus = 400;
            myMsg = "Invalid national ID - century";
        }
        if (!verifyBirthDate(birthDate)) {
            myStatus = 400;
            myMsg = "Invalid national ID - birthdate";
        }

        //todo - gender, checkInteger

    }
    else {
        myStatus = 400;
        myMsg = "National ID should be 13 numbers";
    }
    console.log(century,
        birthDate,
        gov,
        gender,
        check);
    res.status(myStatus).send(myMsg);


});

function verifyBirthDate(birthDate) {
    var year = Number(birthDate.substring(0, 2));
    var month = Number(birthDate.substring(2, 4));
    var day = Number(birthDate.substring(4, 6));
    console.log("dd/mm/yy", day,month,year);
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
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 4 === 0 && year % 100 === 0 && year % 400 === 0)) {
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
    return true;

}
//-------------------------------view all info--------------------------------
app.get('/:egpID/info', (req, res) => {

});
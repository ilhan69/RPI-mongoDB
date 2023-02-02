const fs = require('fs');

// Charger le fichier CSV
var csvFile = "data.csv";
const data = fs.readFileSync(csvFile,
    { encoding: 'utf8', flag: 'r' });

var lines = data.split("\n");
var result = [];
var headers = lines[0].split(",");

for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
        const headerCol = headers[j].replace(' ', '')
        if(['datetime_utc', '_conds', '_wdire'].includes(headerCol)) {
            obj[headerCol] = currentline[j];
        } else {
            obj[headerCol] = parseInt(currentline[j]);
        }
        
    }

    result.push(obj);
}

// Convertir le tableau en JSON
var jsonData = JSON.stringify(result, null, 2);
fs.writeFile('data.json', jsonData, (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
});
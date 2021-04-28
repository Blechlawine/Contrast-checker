const fs = require('fs');

let pantoneFile = fs.readFileSync("./pantoneChart.json", "utf-8");
console.log(pantoneFile);
let json = JSON.parse(pantoneFile);

let final = [];

for (let i = 0; i < json.names.length; i++) {
    final.push({
        name: json.names[i],
        hex: json.values[i]
    });
}

fs.writeFileSync("pantoneFile.json", JSON.stringify(final));

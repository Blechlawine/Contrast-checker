const express = require("express");
const {XMLHttpRequest} = require("xmlhttprequest");


const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/copic", (req, res) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "../content/copicChart.json", false);
    xhr.send();

    console.log(xhr.responseText);
    res.send(xhr.responseText);
});


if (require.main === module) {
    const port = 3001;
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

module.exports = app;

const express = require("express");

const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/copic", (req, res) => {
    let data = fs.readFileSync("static/data/copicChart.json", "utf-8");
    console.log(data);
    res.json(data);
});


if (require.main === module) {
    const port = 3001;
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

module.exports = app;

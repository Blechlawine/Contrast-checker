const express = require("express");

const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/:id", (req, res) => {
    let id = req.params.id;
    let data;
    if (id == "copic") {
        data = fs.readFileSync("static/data/copicChart.json", "utf-8");
    } else if (id == "ral") {
        data = fs.readFileSync("static/data/ralChart.json", "utf-8");
    } else if (id == "pantone") {
        data = fs.readFileSync("static/data/pantoneChart.json", "utf-8");
    } else if (id == "name") {
        data = fs.readFileSync("static/data/nameChart.json", "utf-8");
    } else if (id == "hks") {
        data = fs.readFileSync("static/data/hksChart.json", "utf-8");
    } else {
        res.status(404).send("Not found");
        return;
    }
    let json = JSON.parse(data);
    res.json(json);
});


if (require.main === module) {
    const port = 3001;
    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}

module.exports = app;

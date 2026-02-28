const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

// Home Page
app.get("/", function (req, res) {
    res.send(`
        <html>
        <head>
            <title>BMI Calculator</title>
            <style>
                body {
                    font-family: Arial;
                    text-align: center;
                    margin-top: 100px;
                }

                input {
                    padding: 6px;
                    margin: 5px;
                    border: 1px solid #4CAF50;
                }

                button {
                    padding: 6px 12px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                }
            </style>
        </head>

        <body>
            <h1>BMI Calculator</h1>

            <form action="/bmicalculator" method="POST">
                <input type="text" name="name" placeholder="Name" required><br>
                <input type="number" step="0.01" name="height" placeholder="Height (m)" required><br>
                <input type="number" step="0.1" name="weight" placeholder="Weight (kg)" required><br>
                <button type="submit">Calculate</button>
            </form>
        </body>
        </html>
    `);
});

// BMI Calculation
app.post("/bmicalculator", function (req, res) {

    const name = req.body.name;
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);

    const bmi = weight / (height * height);

    let category = "";

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 25) {
        category = "Normal";
    } else if (bmi < 30) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    res.send(`
        <html>
        <head>
            <style>
                body {
                    font-family: Arial;
                    text-align: center;
                    margin-top: 100px;
                }

                button {
                    padding: 6px 12px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                }
            </style>
        </head>

        <body>
            <h2>Hello ${name}</h2>
            <p>Your BMI is: ${bmi.toFixed(2)}</p>
            <p>Category: ${category}</p>
            <a href="/"><button>Back</button></a>
        </body>
        </html>
    `);
});

app.listen(3000, function () {
    console.log("Server running at http://localhost:3000");
});
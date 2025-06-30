const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.post("/predict", (req, res) => {
    const data = req.body;

    try {
        const keys = [
            'gender', 'age', 'race', 'citizen', 'education', 'maritalStatus',
            'householdSize', 'bp', 'heartDisease', 'respiratory',
            'liverThyroid', 'cancer', 'smoking', 'alcohol'
        ];

        let features = [];

        for (let key of keys) {
            const value = data[key];
            if (value === undefined || value === "") {
                features.push(0);
            } else {
                features.push(parseInt(value));
            }
        }

        const score = features.reduce((a, b) => a + b, 0);
        const result = score > 10 ? "depressed" : "not depressed";

        res.json({ result });
    } catch (error) {
        console.error("Prediction error:", error.message);
        res.status(500).json({ error: "Prediction failed", details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

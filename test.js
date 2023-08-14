const fs = require('fs');

async function start() {
    const buffer = fs.readFileSync("./db.json");
    const data = JSON.parse(buffer.toString())

    const n = Object.keys(data).length;
    const totalHours = Object.values(data).reduce((sum, obj) => sum += obj.hours, 0);
    const totalMinutes = Object.values(data).reduce((sum, obj) => sum += obj.minutes, 0);

    const totalTime = totalHours + (totalMinutes / 60)

    const result = (totalTime / n).toPrecision(3);
}

start()
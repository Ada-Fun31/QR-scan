// Step1. Setup event listener on button
window.addEventListener('load', function () {

    console.log("Page Accessed");

    //Once logged, set locationVariable = location information

    //Step3. create object using the Variable above
    let locaObject = {
        "location": "locationVariable",
    }

    //Step4. make the object JSON
    let locaJSON = JSON.stringify(locaObject);

    //Step5. send the JSON object to server
    fetch("/locaSave", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: locaJSON
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // 这里的data是index.js的 “response.json(message)”
        });

    // Step6. grab data from database using "fetch()"
    fetch('/locationData')
        .then(response => response.json())
        .then(Data => {
            console.log(Data)
        })
});

let express = require("express");
let app = express();

app.use("/",express.static('public'));

//*Parse JSON data (use json file appropriately)
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//*initiate database: NeDB
let Datastore = require('nedb'); // grab the library
let db = new Datastore('location.db'); //create a database
db.loadDatabase();


/*-----ROUTE-----*/
// "Post Route" for recieving the data
app.post("/locaSave", (request, response) => {
    console.log("A POST request is made:");
    console.log(request.body)
    //"body" from client side "body"
    //client side "post object" sent to the server

    // get date info
    let dateOfLocation = Date();

    //2*save the data into database
    let locationInfo = request.body;
    let objToSave = {
        "date":dateOfLocation,
        "dreamOfday":locationInfo
    }
    // console.log(objToSave)
    db.insert(objToSave);

    //1*response to the client 
    let message = { "status": "success" };
    // response send to script.js and consoled in client side as fetched "data"
    response.json(message);
})

// fetch("/data") is by default a get requests
app.get('/locationData',(request,response)=>{
    // "{}" means: give me everything
    db.find({},(error,docs) => {
        // console.log(docs);
        let locationData = {"data":docs};
        response.json(locationData);
    });
})


/*-----PORT-----*/
let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('Satrting server at', port);
})
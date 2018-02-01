const express = require('express');
const bodyParser = require('body-parser');
//const axios = require('axios');
const path = require('path');
const sgMail = require('@sendgrid/mail');

const PORT = process.env.PORT || 3000;
const app = express();

sgMail.setApiKey('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');

// Emails the activity to the person specified
function emailActivity(email, name, event) {

    const msg = {
        to: email,
        from: 'findrmessages@gmail.com',
        subject: 'Findr activity of the week!',
        text: `${name}, This week's Findr activity is ${event.eventName}!!`,
        html:   `<div style="background-color: #1abc9c; color: #fff "><h1>Hey ${name}!!</h1>
        <div style="text-align: ;"><img style="width: 100%;" src="${event.imageURL}" /> <br />
        <p style="text-align: ;">This week's Findr activity is: ${event.eventName}! <br />This fin-tastic social event was pick at random with a wopping ${event.badgeCount} interest points!</p>
        </div>
        <p><br /> Thanks for using Findr! We'll see you next week!</p>
        <br />
        - <3 The Findr Team</div>`,
    };

    sgMail.send(msg);
}

// Sends event to everyone on the list
function emailList(list, activity) {
    list.forEach(item => {
        emailActivity(item.email, item.name, activity);
        console.log("email sent to " + item.email);
    });
}

// Add event object to the list
function addEvent(e, events){
    var newEvent = {
        "id": 0,
        "eventName": "",
        "imageURL": "",
        "badgeCount": 1
    }

    newEvent.id = events.length;
    newEvent.eventName = e.eventName;
    newEvent.imageURL = e.imageURL;
    
    events.push(newEvent);

    return events;
}

// Add person object with (name and email) to the people array
function addPerson(name, email) {
    var p = {};

    p.name = name;
    p.email = email;

    // Adds p to list of people
    people.push(p);
    console.log(p.name + "was added to the list.")
}

// Increment interest badgeCount based on the indicated indexes
function updateInterests(interests) {
    // Increment event's interest number // Will need to update the attribute name for the array of interests
    interests.forEach(item => {
        events[item].badgeCount += 1;
        console.log("Interest value incremented for " + events[item].eventName + ". There are " + events[item].badgeCount + " total people interested");
    });
}

// Randomly selects an activity using a raffle strategy. 
function determineEvent(events){
    
    rafflebucket = [];

    // Update badgeCount based on passed array
    events.forEach(item => {
        for(var i = 0; i < item.badgeCount; i++){
            rafflebucket.push(item.id);
            console.log(`Event ${item.eventName} with id: ${item.id} added to the bucket`);
        }
    })

    // Display filled raffle bucket
    console.log("Items in the event raffle bucket");
    for(var i = 0; i < rafflebucket.length; i++){
        console.log(rafflebucket[i]);
    }

    // Select the findr event randomly
    var ticket = Math.floor(Math.random() * rafflebucket.length);
    var pickedEvent = rafflebucket[ticket];
    var activity = events[pickedEvent];
    

    // Display the selected findr event!
    console.log(`The number ${pickedEvent} was drawn from the raffle bucket!`);
    console.log(`This week the Findr actiity will be ${activity.eventName}`);

    return activity;
}

// Create empty attendance list
var people = [];

// Default event list
var events = [
    {
        "id": 0,
        "eventName": "Stars game",
        "imageURL": "https://imagesvc.timeincapp.com/v3/fan/image?url=https://blackoutdallas.com/wp-content/uploads/usat-images/2016/04/9788243-nhl-montreal-canadiens-at-dallas-stars.jpeg&w=5568",
        "badgeCount": 1
    },
    {
        "id": 1,
        "eventName": "Top golf",
        "imageURL": "https://www.gannett-cdn.com/-mm-/2d91ae8236323a5b2d566f5289be3ed741d8f40e/c=326-0-5433-3840&r=x404&c=534x401/local/-/media/2016/11/30/INGroup/Indianapolis/636161238453254977-Male-Child-Golfer.jpg",
        "badgeCount": 2
    },
    {
        "id": 2,
        "eventName": "Tacos and Tequila",
        "imageURL": "https://tacosandtequilatnt.com/wp-content/uploads/2016/02/TNT_Logo_Light.png",
        "badgeCount": 4
    },
    {
        "id": 3,
        "eventName": "Happy hour at BBC",
        "imageURL": "http://www.bbcpub.com/images/logo.png",
        "badgeCount": 6
    },
    {
        "id": 4,
        "eventName": "Marvericks Game",
        "imageURL": "https://i2.wp.com/nutsandboltssports.com/wp-content/uploads/2016/04/tony-parker-dirk-nowitzki-nba-playoffs-san-antonio-spurs-dallas-mavericks-850x560.jpg?zoom=2&resize=678%2C381",
        "badgeCount": 4
    },
    {
        "id": 5,
        "eventName": "Katy Trail Ice house",
        "imageURL": "https://cravedfw.files.wordpress.com/2012/04/img_4339.jpg",
        "badgeCount": 2
    },
    {
        "id": 6,
        "eventName": "Summit Climbing",
        "imageURL": "https://static1.squarespace.com/static/568afdd8c647adc8055af9cc/t/56903dc4bfe873d7393534c8/1452293578231/?format=2500w",
        "badgeCount": 1
    }
];


/* TESTING CODE {

console.log("--- Test add person ---");

// People to add
var testp = {
    name: "Brennan",
    email: "jamessaul7629@gmail.com"
}

var testp2 = {
    name: "Colby",
    email: "colby@gmail.com"
}

var testp3 = {};
testp3.name = "kelly";
testp3.email = "sims";


people.push(testp);
console.log(testp.name + " was added to the list.")

people.push(testp2);
console.log(testp2.name + " was added to the list.")

people.push(testp3);
console.log(testp3.name + " was added to the list.")

console.log("Updated list:");

people.forEach(item => {
    console.log(item.name);
    console.log(item.email);
})

// Test badge increase


// Test eamil
emailActivity('findrmessages@gmail.com', "Brennan", "a happy hour at BBC!")



emailActivity('findrmessages@gmail.com', "Brennan", events[0]);

console.log(determineEvent(events));

updateInterests([0]);
determineEvent(events);

// Test add event

ev = {
    "eventName": "bob",
    "imageURL": "https://static1.squarespace.com/static/568afdd8c647adc8055af9cc/t/56903dc4bfe873d7393534c8/1452293578231/?format=2500w"
}

console.log(events.length);
events = addEvent(ev, events);

console.log(events.length);
console.log(events[7].eventName);
console.log(events[7].id);
console.log(events[7].badgeCount);

*/


// Parsers for POST data
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(express.static(path.resolve(__dirname, 'public')));

// Send list of events to the client 
app.get('/api/events', (req, res) => {
    res.send(events);
})

// Send list of people to the client 
app.get('/api/people', (req, res) =>{
    res.send(people);
})

// When there is a get request at api/admin/send we select and send out the weeks activity.
app.get('api/admin/send', (req, res) =>{
    var event = determineEvent(events);
    emailList(people, event);
})

// Update api address?
app.post('/api/people', (req, res) => {
    const query = req.body.query;

    addPerson(query.name, query.email);
});

// update api address?
app.post('/api/events', (req, res) => {
    const query = req.body.query;

    updateInterests(query.interests);
});

// Listen on port 3000
app.listen(PORT, () => console.log('Example app listening on port 3000!'));


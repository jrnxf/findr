/* 
*  Filename:    Functions.js
*  Author:      Brennan Saul - Colby Thomas
*  Description: File contains functions used to manage server data
*/

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

// Emails the activity to the person specified
exports.emailActivity = function emailActivity(email, name, event) {

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
exports.emailList = function emailList(list, activity) {
    list.forEach(item => {
        emailActivity(item.email, item.name, activity);
        console.log("email sent to " + item.email);
    });
}

// Add event object to the list
exports.addEvent = function addEvent(e, events){
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
exports.addPerson = function addPerson(name, email, people) {
    var p = {};

    p.name = name;
    p.email = email;

    // Adds p to list of people
    people.push(p);
    console.log(p.name + "was added to the list.")

    return people;
}

// Increment interest badgeCount based on the indicated indexes
exports.updateInterests = function updateInterests(interests, events) {
    // Increment event's interest number // Will need to update the attribute name for the array of interests
    interests.forEach(item => {
        events[item].badgeCount += 1;
        console.log("Interest value incremented for " + events[item].eventName + ". There are " + events[item].badgeCount + " total people interested");
    });

    return events;
}

// Randomly selects an activity using a raffle strategy. 
exports.determineEvent = function determineEvent(events){
    
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


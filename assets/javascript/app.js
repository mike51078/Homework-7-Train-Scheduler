
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA3_E3KS3CJ_z7yV7Eqf0ZdqfiYOpLNfs4",
    authDomain: "hmwk-7-trains.firebaseapp.com",
    databaseURL: "https://hmwk-7-trains.firebaseio.com",
    projectId: "hmwk-7-trains",
    storageBucket: "hmwk-7-trains.appspot.com",
    messagingSenderId: "558995234808"
  };
  firebase.initializeApp(config);

//linking the database
  var database = firebase.database();

//initial value for variables
  var trainName = "";
  var destination = "";
  var frequency = 0;
  var nextArrival = "";

//function for when user clicks on the button -- after having input information into the fields
  $("#add-train-btn").on("click", function(event) {
  event.preventDefault();

//brings in the value from the user input fields and trims excess space
  trainName = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  nextArrival = $("#nextArrival-input").val().trim();

//creates the new variable to store the information input by the user
  var newTrain = {
    name: trainName,
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival
  };

//pushes the information from the user into the database
  database.ref().push(newTrain);

// Logs everything to console to verify button working and info submitted to database
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.nextArrival);

//provides confirmation to user of the button click
  alert("New train successfully added");

// Clears all of the text-boxes on user input
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#nextArrival-input").val("");
});

//adding user input to the database and creating a snapshot of values to be used later on, as info is deleted from user inputs upon button click
database.ref().on("child_added", function(snapshot) {

// creating a variable to hold the data from the snapshot
  var sv = snapshot.val();

  console.log(sv.name)

//series of variable and algorithm used to calculate time for user displayed fields of Next Arrival and Minutes Away
  var freq = parseInt(sv.frequency);
  var dConverted = moment(snapshot.val().nextArrival, "HH:mm").subtract(1, 'years');
  var trainTime = moment(dConverted).format("HH:mm");
  var timeConverted = moment(trainTime, "HH:mm").subtract(1, 'years');
  var timeDifference = moment().diff(moment(timeConverted), 'minutes');
  var timeRemainder = timeDifference % freq;
  var minutesAway = freq - timeRemainder;
  var nextTrain = moment().add(minutesAway, 'minutes');

//consoled information as a checkpoint
  console.log(trainName);
  console.log(destination);
  console.log(freq);
  console.log(nextArrival);
  console.log(minutesAway);

//pushes data into table viewed by user
  var newRow = $("<tr>").append(
    $("<td>").text(sv.name),
    $("<td>").text(sv.destination),
    $("<td>").text(sv.frequency),
    $("<td>").text(moment(nextTrain, 'HH:mm').format("hh:mm a")),
    $("<td>").text(minutesAway + ' Minutes away'),
  );

  $("#train-table > tbody").append(newRow);

},  

//provides description and code in the console for any errors encountered
  function(errorObject) {
  console.log("Errors handled: " + errorObject.code)}
);

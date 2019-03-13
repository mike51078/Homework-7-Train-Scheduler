
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


  var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = moment($("#frequency-input").val().trim(), "HH:MM").format("X");
  var nextArrival = moment($("#next-arrival-input").val().trim(), "HH:MM").format("X");

  var newTrain = {
    name: trainName,
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minutesAway
  };

  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.nextArrival);
  console.log(newTrain.minutesAway);

  alert("New train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#next-arrival-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var nextArrival = childSnapshot.val().nextArrival;
  var minutesAway = childSnapshot.val().minutesAway;

  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(nextArrival);
  console.log(minutesAway);


  var minutesAway = moment().diff(moment(nextArrival, frequency));
  console.log(empMonths);


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(empStartPretty),
    $("<td>").text(empMonths),
    $("<td>").text(nextArrival),
    $("<td>").text(empBilled)
  );

  $("#train-table > tbody").append(newRow);
});

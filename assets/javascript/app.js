
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

  var trainName = "";
  var destination = "";
  var frequency = 0;
  var nextArrival = "";

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  trainName = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  nextArrival = $("#nextArrival-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival
  };

  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.nextArrival);

  alert("New train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#nextArrival-input").val("");
});

database.ref().on("child_added", function(snapshot) {

  var sv = snapshot.val();

  console.log(sv.name)

  var freq = parseInt(sv.frequency);

  var dConverted = moment(snapshot.val().nextArrival, "HH:mm").subtract(1, 'years');
  var trainTime = moment(dConverted).format("HH:mm");
  var tConverted = moment(trainTime, "HH:mm").subtract(1, 'years');
  var tDifference = moment().diff(moment(tConverted), 'minutes');
  var tRemainder = tDifference % freq;
  var minutesAway = freq - tRemainder;
  var nextTrain = moment().add(minutesAway, 'minutes');


  console.log(trainName);
  console.log(destination);
  console.log(freq);
  console.log(nextArrival);
  console.log(minutesAway);


  // var minutesAway = moment().diff(moment(nextArrival, frequency));


  var newRow = $("<tr>").append(
    $("<td>").text(sv.name),
    $("<td>").text(sv.destination),
    $("<td>").text(sv.frequency),
    $("<td>").text(moment(nextTrain, 'HH:mm').format("hh:mm a")),
    // $("<td>").text(sv.nextArrival),
    $("<td>").text(minutesAway + ' Minutes away'),
  );

  $("#train-table > tbody").append(newRow);


},  
  function(errorObject) {
  console.log("Errors handled: " + errorObject.code)}
  
);

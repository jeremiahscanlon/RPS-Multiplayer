// ========================================================
// Variables
// ========================================================

var playerCounter = 0;

// ========================================================
// Link to Firebase
// ========================================================

var db = new Firebase("https://multiplayer-roshambo.firebaseIO.com/");

// ========================================================
// Tracking concurrent users
// ========================================================

// Link to Specific subset of database for tracking users
var connectedData = new Firebase("https://multiplayer-roshambo.firebaseIO.com/viewers");

// Link to userData
var userData = connectedData.push();

// Add ourselves to presence list when online.
var presenceRef = new Firebase("https://multiplayer-roshambo.firebaseIO.com/.info/connected");
presenceRef.on("value", function(snapshot) {
  if (snapshot.val()) {
    // Remove ourselves when we disconnect.
    userData.onDisconnect().remove();
    userData.set(true);
  }
});

// Number of online users is the number of objects in the presence list.

connectedData.on("value", function(snapshot) {
	// Display the viewer count in the html
	//$("#watchers").html("There are currently " +snapshot.numChildren()+" creepers now.");
  	//console.log("# of online users = " + snapshot.numChildren());
});


// ========================================================
// build the display
// ========================================================

db.on("child_added", function(snapshot, prechildKey){

	console.log(snapshot.val());
	
	

	//var results = snapshot.val();
	//$("#employeeTable").append("<tr ><td>" + name + "</td><td>" + role + "</td><td>" + startDate + "</td><td>" + monthlyRate + "</td><td>" + monthsWorked + "</td><td>" + empBilled + "</td></tr>");

});


// ========================================================
// build the display
// ========================================================

function names(){

	if (playerCounter = 0) {
		
		console.log('starting first player, counter at: ' + playerCounter);
		//$("#captureNames").modal('show');

		$("#newUser").on("click", function() {
			var name = $('#name').val().trim();
			var message = $('#message').val().trim();
			console.log('name: '+ name);
			console.log('message: '+ message);
			db.push({
				player1: name,
				message: message
			});
			$("#captureNames").modal('hide');
			playerCounter++;
		});

		console.log('finishing first player, counter at: ' + playerCounter);

	} else if (playerCounter = 1){

		console.log('starting second player, counter at: ' + playerCounter);
		//$("#captureNames").modal('show');
		$("#formLabel").text('Player 2 - Enter your name:');
		$("#newUser").on("click", function() {
			var name = $('#name').val().trim();
			var message = $('#message').val().trim();
			console.log('name: '+ name);
			console.log('message: '+ message);
			db.push({
				player2: name,
				message: message
			});
			$("#captureNames").modal('hide');
			playerCounter++;
		});
		console.log('finishing second player, counter at: ' + playerCounter);

	}
}
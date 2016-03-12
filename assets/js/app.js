// ========================================================
// Link to Firebase
// ========================================================

var db = new Firebase("https://multiplayer-roshambo.firebaseIO.com/");

// ========================================================
// Just for tracking concurrent users
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
	$("#watchers").html("There are currently " +snapshot.numChildren()+" creepers now.");
  	console.log("# of online users = " + snapshot.numChildren());
});
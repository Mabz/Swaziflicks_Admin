function signin() {
    
    username = $("#username").val();
    password = $("#password").val();
    
    // Call Parse Login function with those variables
    Parse.User.logIn(username, password, {
        // If the username and password matches
        success: function (user) {
            // alert("Logged In");
        },
        // If there is an error
        error: function (user, error) {
            console.log(error);
        }
    });

}


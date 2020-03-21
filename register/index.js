let register = () => {
    let username = document.getElementById("Username").value;
    let email = document.getElementById("Email").value;
    let password = document.getElementById("Password").value;
    let confirmPassword = document.getElementById("ConfirmPassword").value;
    let data = {Username: username, Email: email, Password: password };
    if (password !== confirmPassword) {
        // TODO: Send your shit doesnt amtch here
        turnAllOff();
        document.getElementById("Confirm-Password-Error").innerHTML = "Passwords do not match!";
        document.getElementById("ConfirmPassword").classList.add("is-danger");
    } else {
        $.ajax({
            method: "POST",
            url: "https://auth.cloudlite.net/register",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: (data, textStatus, jqXhr) => {

                console.log(data);

                if (data.status === 200) {
                    console.log("status 200");
                    return window.location.replace("https://cloudlite.net/login");
                }
                
                if (data.status === 400) {
                    // Process text bar colors here
                    switch(data.type) {
                        case "username": {
                            turnAllOff();
                            document.getElementById("Username").classList.add("is-danger");
                            document.getElementById("Username-Error").innerHTML = data.msg;
                            break;
                        }

                        case "email": {
                            turnAllOff();
                            document.getElementById("Email").classList.add("is-danger");
                            document.getElementById("Email-Error").innerHTML = data.msg;
                            break;
                        }

                        case "password": {
                            turnAllOff();
                            document.getElementById("Password").classList.add("is-danger");
                            document.getElementById("Password-Error").innerHTML = data.msg;
                            break;
                        }

                        case "unexpected": {
                            turnAllOff();
                            document.getElementById("ConfirmPassword").classList.add("is-danger");
                            document.getElementById("Confirm-Password-Error").innerHTML = data.msg;
                            break;
                        }
                    }
                } 
            },
            error:  (data, textStatus, jqXhr) => {
                turnAllOff();
                document.getElementById("General-Error").innerHTML = "Unexpected Server Sided Error.";
            },
            body: JSON.stringify(data)
        });
    }
}

let turnAllOff = () => {
    document.getElementById("Confirm-Password-Error").innerHTML = "";
    document.getElementById("Password-Error").innerHTML = "";
    document.getElementById("Email-Error").innerHTML = "";
    document.getElementById("Username-Error").innerHTML = "";

    document.getElementById("Username").classList.remove("is-danger");
    document.getElementById("Email").classList.remove("is-danger");
    document.getElementById("Password").classList.remove("is-danger");
    document.getElementById("ConfirmPassword").classList.remove("is-danger");
}




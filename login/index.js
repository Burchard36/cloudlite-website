let login = () => {
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    let data = { Username: username, Password: password };
        $.ajax({
            method: "POST",
            url: "https://auth.cloudlite.net/login",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: (data, textStatus, jqXhr) => {

                if (data.status === 200) {
                    return window.location.replace(`https://cloudlite.net/user?token=${data.token}`);
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

let turnAllOff = () => {
    document.getElementById("Password-Error").innerHTML = "";
    document.getElementById("Username-Error").innerHTML = "";

    document.getElementById("Username").classList.remove("is-danger");
    document.getElementById("Password").classList.remove("is-danger");
}




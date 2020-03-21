let loadPage = () => {
    if (getParams(window.location.href).token !== undefined) {
        let token = getParams(window.location.href).token;
        setCookie("token", token);
        $.ajax({
            method: "GET",
            url: "https://auth.cloudlite.net/validate?token=" + token,
            contentType: "application/json",
            success: (data, textStatus, jqXhr) => {
                console.log(data);

                if (data.status === 200) {
                    console.log("status 200");
                    let id = data.UserID;
                    getUser(id, (user) => {
                        console.log(user);
                    });
                }

                if (data.status === 400) {

                }
            },
            error:  (data, textStatus, jqXhr) => {
                turnAllOff();
                alert("XHR FAIL L 28");
            },
        });
    } else if (getCookie("token") !== "" || getCookie("token") !== undefined) {
        alert("This is for sessions, add support here");
    } else {
        alert("All Checks Failes");
    }
    window.history.pushState("", "", '/user');

    let services = document.getElementById("services");
    let clone1 = document.getElementById("service");
    if (document.getElementById("service") !== undefined) {
        document.getElementById("service").remove();
    }

    /* TODO: Get a list of services from API, and addService() for each */
};

let getUser = (id, callback) => {
    $.ajax({
        method: "GET",
        url: `https://billing.cloudlite.net/user/${id}?token=${getCookie("token")}`,
        contentType: "application/json",
        success: (data, textStatus, xhr) => {
            console.log(" GET-USER: ");
            console.log(data);
        },
        error: (data, textStatus, xhr) => {
            turnAllOff();
            alert("XHR FAILED L57")
        }
    })
};

/**
 * Gets the amount of services a user has
 */
let amountOfServices = () => {
    return 0;
};

let amt = 1;

let addService = (Title, Subtitle, Clone) => {
    let services = document.getElementById("services");
    Clone = Clone.cloneNode(true);
    Clone.id = "service" + amt;
    amt++;
    Clone.childNodes.forEach(node => {
        if (node.id === "title") {
            node.innerHTML = Title;
        }
        if (node.id === "subtitle") {
            node.innterHTML = Subtitle;
        }
    });
    services.append(Clone);
};

/**
 * Get a URL Parameter
 * @param url
 * @returns {Object}
 */
let getParams = function (url) {
    let params = {};
    let parser = document.createElement('a');
    parser.href = url;
    let query = parser.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

/*let getUser = () => {
    let token = getCookie("token");
    if (token === undefined) {
        return alert("Token not found 404");
    }


};*/

let  setCookie = (cname, cvalue, exdays) => {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

let getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

let checkCookie = () => {
    let user = getCookie("username");
    if (user !== "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user !== "" && user != null) {
            setCookie("username", user, 365);
        }
    }
};
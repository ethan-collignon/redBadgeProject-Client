let APIURL = "";

switch(window.location.hostname) {
    case "localhost" || "127.0.0.1": 
        APIURL = "https://localhost:3000"
        break;
    case "cgc-client.herokuapp.com":
        APIURL = "https://cgc-server.herokuapp.com"
}

export default APIURL;
function authenticate() {
  return gapi.auth2
    .getAuthInstance()
    .signIn({
      scope:
        "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.apps.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/drive.readonly",
    })
    .then(
      function () {
        console.log("Sign-in successful");
        // var user = { token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token };
        sessionStorage.setItem("user", gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
      },
      function (err) {
        console.error("Error signing in", err);
      }
    );
}
function loadClient() {
  gapi.client.setApiKey("AIzaSyBH3SsrQvyh2BUQz8Lj5C6EGZxxsvnPH5k");
  return gapi.client
    .load("https://content.googleapis.com/discovery/v1/apis/drive/v2/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
        execute();
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.drive.files
    .list({
      maxResults: 5,
      orderBy: "lastViewedByMeDate desc",
    })
    .then(
      function (response) {
        response.result.items.forEach(myFunction);
        document.getElementById("driveAuthB").style.display = "none";
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
function myFunction(item, index) {
  var div = document.createElement("div");
  div.className = "driveDiv";
  div.innerHTML =
    "<img src='" +
    item.iconLink +
    "'/><a target='_blank' href='" +
    item.defaultOpenWithLink +
    "'>" +
    item.title +
    "</a>";
  document.getElementById("driveRecent").appendChild(div);
  // console.log(item.title);
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({
    client_id:
      "199272431833-bnfpumt9fhnvluvg8qohorbe1bcirqq8.apps.googleusercontent.com",
  });
});

const options = new MicrosoftGraph.MSALAuthenticationProviderOptions([
  "user.read",
  "mail.read",
]);
// Create an authentication provider for the implicit flow
const authProvider = new MicrosoftGraph.ImplicitMSALAuthenticationProvider(
  msalClient,
  options
);
// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({
  authProvider,
});
// </graphInit>

// <getEvents>
async function getEvents() {
  try {
    let res = await graphClient
      .api("/me/mailFolders/inbox/messages")
      .filter("isRead eq false")
      .top(2)
      .get();
    console.log("done boiii");
    // updatePage(msalClient.getAccount(), Views.calender, events);
    updatePage(msalClient.getAccount(), Views.email, res);
  } catch (error) {
    updatePage(msalClient.getAccount(), Views.error, {
      message: "Error getting events",
      debug: error,
    });
  }
}
// </getEvents>
async function getMessage(keyg) {
  console.log("go");
  try {
    let res = await graphClient.api("/me/messages/" + keyg).get();
    // console.log(res.body.content);
    // document.getElementById("popUp").src = res.body.content;
    document.getElementById("popUpBox").style.display = "block";
    var iframe = document.getElementById("popUp"),
      iframedoc = iframe.contentDocument || iframe.contentWindow.document;

    iframedoc.body.innerHTML = res.body.content;
    // updatePage(msalClient.getAccount(), Views.calender, events);
    // updatePage(msalClient.getAccount(), Views.email, res);
  } catch (error) {
    updatePage(msalClient.getAccount(), Views.error, {
      message: "Error getting events",
      debug: error,
    });
  }
}

function buildList(emails) {
  var div = document.createElement("div");
  div.className = "emailPanel";
  for (mail of emails) {
    var emailPanel = document.createElement("div");
    emailPanel.className = "mailPanel";
    emailPanel.innerHTML =
      "<a id=" +
      mail.id +
      " onclick='getMessage(this.id);' class='nameTitle'>" +
      mail.sender.emailAddress.name +
      "</a></br><span class='subjectTitle'>" +
      mail.subject +
      "</span>";
    div.appendChild(emailPanel);
  }
  document.getElementById("mailSuggestion").appendChild(div);
}
function buildDF(files) {
  var div = document.createElement("div");
  div.className = "filesPanel";
  for (f of files) {
    var emailPanel = document.createElement("div");
    emailPanel.className = "filePanel";
    emailPanel.innerHTML =
      "<a target='_blank' href='" +
      f.defaultOpenWithLink +
      "' class='nameTitle'>" +
      f.title +
      "</a>";
    div.appendChild(emailPanel);
  }
  document.getElementById("driveSuggestion").appendChild(div);
}
function getDriveFiles(ss) {
  return gapi.client.drive.files
    .list({
      maxResults: 4,
      q: "title contains '" + ss + "'",
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        buildDF(response.result.items);
        console.log("Response", response);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}
async function searchMail() {
  document.getElementById("mailSuggestion").innerHTML = "No Results found";
  document.getElementById("driveSuggestion").innerHTML = "No Results found";
  document.getElementById("googleSuggestion").innerHTML =
    "<a href=https://www.google.com/search?q=" +
    encodeURIComponent(document.getElementById("searchBar").value) +
    " target='_blank' > Search for '" +
    document.getElementById("searchBar").value +
    "'</a>";
  console.log("search go");
  var query = document.getElementById("searchBar").value;
  try {
    getDriveFiles(query);
    let s = await graphClient
      .api("/me/messages")
      .search('"body:' + query.toString() + '"')
      .top(3)
      .get();
    console.log("'searched for: " + query + "'");
    document.getElementById("mailSuggestion").innerHTML = "";
    document.getElementById("driveSuggestion").innerHTML = "";
    buildList(s.value);
  } catch (error) {
    console.log("error: " + error);
  }
}

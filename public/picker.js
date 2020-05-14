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
  div.innerHTML = "<img src='" + item.iconLink + "'/><a target='_blank' href='" + item.defaultOpenWithLink + "'>" + item.title + "</a>";
  document.getElementById("driveRecent").appendChild(div);
  // console.log(item.title);
}
gapi.load("client:auth2", function () {
  gapi.auth2.init({
    client_id:
      "199272431833-bnfpumt9fhnvluvg8qohorbe1bcirqq8.apps.googleusercontent.com",
  });
});

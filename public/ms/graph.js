// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <graphInit>
// Create an options object with the same scopes from the login
const options =
  new MicrosoftGraph.MSALAuthenticationProviderOptions([
    'user.read',
    'calendars.read',
    'mail.read',
  ]);
// Create an authentication provider for the implicit flow
const authProvider =
  new MicrosoftGraph.ImplicitMSALAuthenticationProvider(msalClient, options);
// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({
  authProvider
});
// </graphInit>

// <getEvents>
async function getEvents() {
  try {
    let res = await graphClient.api('/me/mailFolders/inbox/messages').filter('isRead eq false').top(2)
      .get();
      console.log("done boiii");
    // updatePage(msalClient.getAccount(), Views.calender, events);
    updatePage(msalClient.getAccount(), Views.email, res);
  } catch (error) {
    updatePage(msalClient.getAccount(), Views.error, {
      message: 'Error getting events',
      debug: error
    });
  }
}
// </getEvents>
async function getMessage(keyg) {
  console.log("go");
  try {
    let res = await graphClient.api('/me/messages/' + keyg)
      .get();
      // console.log(res.body.content);
      // document.getElementById("popUp").src = res.body.content;
      document.getElementById("popUpBox").style.display = "block";
      var iframe = document.getElementById('popUp'),
    iframedoc = iframe.contentDocument || iframe.contentWindow.document;

iframedoc.body.innerHTML = res.body.content;
    // updatePage(msalClient.getAccount(), Views.calender, events);
    // updatePage(msalClient.getAccount(), Views.email, res);
  } catch (error) {
    updatePage(msalClient.getAccount(), Views.error, {
      message: 'Error getting events',
      debug: error
    });
  }
}

function buildList(emails) {
  var div = document.createElement('div');
  div.className = "emailPanel";
  for (mail of emails) {
    var emailPanel = document.createElement("div");
    emailPanel.className = "mailPanel";
    emailPanel.innerHTML = "<a id=" + mail.id + " onclick='getMessage(this.id);' class='nameTitle'>" + mail.sender.emailAddress.name + "</a></br><span class='subjectTitle'>" + mail.subject + "</span>";
    div.appendChild(emailPanel);
  }
  document.getElementById("mailSuggestion").appendChild(div);
}

async function searchMail() {
  document.getElementById("mailSuggestion").innerHTML = 'No Results found';
  document.getElementById("googleSuggestion").innerHTML = "<a href=https://www.google.com/search?q=" + encodeURIComponent(document.getElementById("searchBar").value) + " target='_blank' > Search for '" + document.getElementById("searchBar").value + "'</a>";
  console.log("search go");
  var query = document.getElementById("searchBar").value;
  try {
    let s = await graphClient.api('/me/messages').search('"body:' + query.toString() + '"').top(3).get();
    console.log("'searched for: " + query + "'");
    document.getElementById("mailSuggestion").innerHTML = '';
    buildList(s.value);
  } catch (error) {
    console.log("error: " + error);
  }
}
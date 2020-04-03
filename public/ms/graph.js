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
      console.log(res.body.content);
      document.getElementById("test").innerHTML = res.body.content
    // updatePage(msalClient.getAccount(), Views.calender, events);
    // updatePage(msalClient.getAccount(), Views.email, res);
  } catch (error) {
    updatePage(msalClient.getAccount(), Views.error, {
      message: 'Error getting events',
      debug: error
    });
  }
}
async function searchMail() {
  document.getElementById("mailSuggestion").innerHTML = 'No Results found';
  document.getElementById("googleSuggestion").innerHTML = "<a href=https://www.google.com/search?q=" + encodeURIComponent(document.getElementById("searchBar").value) + " target='_blank' > Search for '" + document.getElementById("searchBar").value + "'</a>";
  console.log("search go");
  try {
    let s = await graphClient.api('/me/messages')
	.search(document.getElementById("searchBar").value).top(3)
	.get();
      console.log("leeeee");
      document.getElementById("mailSuggestion").innerHTML = '';
      for (term of s.value) {
        // document.getElementById("mailSuggestion").innerHTML = '';
        document.getElementById("mailSuggestion").innerHTML = document.getElementById("mailSuggestion").innerHTML + term.sender.emailAddress.name + "</br>" + term.subject + "</br>" + "</br>";
      }
      // document.getElementById("test").innerHTML = s.value
  } catch (error) {
    console.log("error: " + error);
  }
}
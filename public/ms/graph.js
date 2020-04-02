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
    let res = await graphClient.api('/me/mailFolders/inbox/messages').filter('isRead eq false')
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
const mainContainer = document.getElementById('main-container');

const Views = { error: 1, home: 2, calendar: 3 , email: 4};

function createElement(type, className, text) {
  var element = document.createElement(type);
  element.className = className;

  if (text) {
    var textNode = document.createTextNode(text);
    element.appendChild(textNode);
  }

  return element;
}
function showWelcomeMessage(account) {
  // Create jumbotron
  var jumbotron = createElement('div', 'jumbotron');

  var heading = createElement('h1', null, 'JavaScript SPA Graph Testy boii');
  jumbotron.appendChild(heading);

  var lead = createElement('p', 'lead',
    'loady' +
    ' boi');
  jumbotron.appendChild(lead);

  if (account) {
    // Welcome the user by name
    showEmail()
  } else {
    // Show a sign in button in the jumbotron
    var signInButton = createElement('button', 'btn btn-primary btn-large',
      'Authorize');
    signInButton.setAttribute('onclick', 'signIn();')
    jumbotron.appendChild(signInButton);
  }

  mainContainer.innerHTML = '';
  mainContainer.appendChild(jumbotron);
}

function showError(error) {
  var alert = createElement('div', 'alert alert-danger');

  var message = createElement('p', 'mb-3', error.message);
  alert.appendChild(message);

  if (error.debug)
  {
    var pre = createElement('pre', 'alert-pre border bg-light p-2');
    alert.appendChild(pre);

    var code = createElement('code', 'text-break text-wrap',
      JSON.stringify(error.debug, null, 2));
    pre.appendChild(code);
  }

  mainContainer.innerHTML = '';
  mainContainer.appendChild(alert);
}
function showEmail(events) {
  var div = document.createElement('div');

  var table = createElement('table', 'table');
  div.appendChild(table);

  var thead = document.createElement('thead');
  table.appendChild(thead);

  var headerrow = document.createElement('tr');
  thead.appendChild(headerrow);

  var tbody = document.createElement('tbody');
  table.appendChild(tbody);
  for (const mail of events.value) {
    var eventrow = document.createElement('tr');
    eventrow.setAttribute('key', mail.id);
    tbody.appendChild(eventrow);

    var emailPanel = document.createElement("div");
    emailPanel.className = "emailPanel";
    emailPanel.innerHTML = "<h5>" + mail.sender.emailAddress.name + "</h5>" + mail.sender.emailAddress.address + "</br>" + mail.subject;
    eventrow.appendChild(emailPanel);
    
  }
  document.getElementById("connect").style.display = "none";
  document.getElementById("logout").style.display = "block";
  mainContainer.innerHTML = '';
  mainContainer.appendChild(div);
}

function updatePage(account, view, data) {
  showEmail(data);
}

updatePage(null, Views.home);

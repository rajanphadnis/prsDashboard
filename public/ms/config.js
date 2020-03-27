const msalConfig = {
    auth: {
        clientId: 'dd514ae7-1256-4b08-8e56-b4336d9143a2',
        redirectUri: 'https://prsdashboard.firebaseapp.com/ms.html'
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
        forceRefresh: false
    }
};

const loginRequest = {
    scopes: [
        'openid',
        'profile',
        'user.read',
        'calendars.read'
    ]
}
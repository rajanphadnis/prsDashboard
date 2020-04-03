const msalConfig = {
    auth: {
        clientId: 'dd514ae7-1256-4b08-8e56-b4336d9143a2',
        redirectUri: 'https://prsdashboard.firebaseapp.com'
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
        forceRefresh: false
    }
};

const loginRequest = {
    scopes: [
        'openid',
        'profile',
        'user.read',
        'calendars.read',
        'mail.read',
    ]
}
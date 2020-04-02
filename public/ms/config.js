const msalConfig = {
    auth: {
        clientId: 'dd514ae7-1256-4b08-8e56-b4336d9143a2',
        redirectUri: 'http://localhost:5000'
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
        'calendars.read',
        'mail.read',
    ]
}
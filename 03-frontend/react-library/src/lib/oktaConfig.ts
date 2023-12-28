export const oktaConfig = {
    clientId: '0oae6a6wvyX4dpOX05d7', 
    issuer: 'https://dev-10683234.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    okce: true,
    disableHttpsCheck: true,
}
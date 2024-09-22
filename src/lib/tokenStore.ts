let tokenStore = {
    access_token: '',
    expires_at: 0,
};

export function setToken(access_token: string, expires_at: number) {
    tokenStore.access_token = access_token;
    tokenStore.expires_at = expires_at;
};

export function getToken() {
    return tokenStore;
};

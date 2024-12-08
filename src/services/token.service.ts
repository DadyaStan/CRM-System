class TokenService {
  accessToken: null | string;
  constructor() {
    this.accessToken = null;
  }

  getToken() {
    return this.accessToken;
  }

  setToken(token: string) {
    this.accessToken = token;
  }

  removeToken() {
    this.accessToken = null;
  }

  decodeToken(token: string): any {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  }

  getTokenExpiration(): number {
    const accessToken = this.accessToken;

    if (!accessToken) return 0;

    const decodedToken = this.decodeToken(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);

    const expirationTime = decodedToken.exp - currentTime;
    console.log(`Time to refresh: ${expirationTime}`);

    return expirationTime;
  }
}

const tokenService = new TokenService();
export default tokenService;

const protocol = window.location.protocol; //http or https
const hostname = window.location.hostname; //localhost:5001 or localhost:5000
const port: string = `:5000`;
const ip: string = `${hostname}${port}`;
const baseUrl: string = `${protocol}//${ip}`;

export const environment = {
  production: false,
  apiUrl: `${baseUrl}/api/`,
  baseUrl: `${baseUrl}/`,
  allowedDomains: [ip],
  disallowedRoutes: [`${ip}/api/auth`],
};

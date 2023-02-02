const urlHost = 'http://localhost:5001';
const apiPath = '/api/v1/';

const routes = {
    userLogin : () => `${apiPath}login`,
    createUser : () => new URL(urlHost + `${apiPath}signup`),
    dataUser: () => new URL(urlHost + `${apiPath}data`),
}

export default routes;
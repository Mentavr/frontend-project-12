const apiPath = '/api/v1/';

const routesApi = {
  userLogin: () => `${apiPath}login`,
  createUser: () => `${apiPath}signup`,
  dataUser: () => `${apiPath}data`,
};

export default routesApi;

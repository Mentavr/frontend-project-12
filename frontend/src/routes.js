const apiPath = '/api/v1/';

const routes = {
  userLogin: () => `${apiPath}login`,
  createUser: () => `${apiPath}signup`,
  dataUser: () => `${apiPath}data`,
  atorithationPath: '/login',
  chatPath: '/',
  registrationPath: '/signup',
  allPath: '*',
};

export default routes;

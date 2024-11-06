const api = 'http://localhost:8888/v1/api';
export const apiEndPoint = {
  Auth: {
    login: `${api}/login`,
    register: `${api}/register`,
  },
  Admin: {
    listUser: `${api}/admin/user`,
    searchUser: `${api}/admin/user/:id`,
    deleteUser: `${api}/admin/user/:id`
  }
};
export const localStore = {
  token: 'USER_TOKEN',
};

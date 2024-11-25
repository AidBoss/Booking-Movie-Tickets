const api = 'http://localhost:9988/v1/api';
export const apiEndPoint = {
  Auth: {
    login: `${api}/auth/login`,
    register: `${api}/auth/register`,
    refreshToken: `${api}/auth/refresh-token`,
  },
  Admin: {
    listUser: `${api}/admin/user`,
    getUserById: `${api}/admin/user/:id`,
    lockUser: `${api}/admin/user/:id`,
    deleteUserById: `${api}/admin/user/:id`
  }
};

export const localStorage = {
  token: 'USER_TOKEN',
}

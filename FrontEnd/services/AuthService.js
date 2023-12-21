import axios from 'axios';
import { getAuthUser, network } from '../until';

const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${network.serverip}/login`, { username, password });
    return response.data;
  } catch (error) {
    return { message: error.response.data.message };
  }
};

const signup = async ({ username, password, email }) => {
  try {
    const response = await axios.post(`${network.serverip}/signup`, { username, password, email });
    return response.data;
  } catch (error) {
    return { message: error.response.data.message };
  }
};

const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const user = await getAuthUser();
    const response = await axios.put(
      `${network.serverip}/change-password`,
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return { message: error.response.data.message };
  }
};

const deleteUser = async() => {
  try {
    const user = await getAuthUser();
    const response = await axios.delete(
      `${network.serverip}/user`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { message: error.response.data.message };
  }
}

export default AuthService = {
  login,
  signup,
  changePassword,
  deleteUser
};

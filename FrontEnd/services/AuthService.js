import axios from 'axios';
import { getAuthUser, network, timeoutHandler } from '../until';

const login = async ({ username, password }) => {
  try {
    const response = await timeoutHandler(
      axios.post(`${network.serverip}/login`, { username, password })
    );

    return response.data;
  } catch (error) {
    if (error.message === 'Request timeout') {
      return {
        message: 'Request timeout. Please check your internet connection and try again.',
      };
    } else {
      return { message: error.response ? error.response.data.message : (error.error ? error.error : error) };
    }
  }
};

const signup = async ({ username, password, email }) => {
  try {
    const response = await timeoutHandler(
      axios.post(`${network.serverip}/signup`, { username, password, email })
    );

    return response.data;
  } catch (error) {
    return { message: error.response ? error.response.data.message : (error.error ? error.error : error) };
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
    return { message: error.response ? error.response.data.message : error };
  }
};

const deleteUser = async () => {
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

const forgetPassword = async ({ email }) => {
  try {
    const response = await timeoutHandler(
      axios.post(`${network.serverip}/forget-password`, { email })
    );
    return response.data;
  } catch (error) {
    return { message: error.response ? error.response.data.message : (error.error ? error.error : error) };
  }
};

export default AuthService = {
  login,
  signup,
  changePassword,
  deleteUser,
  forgetPassword
};

import { authFetch } from "../utils/fetch";
const CryptoJS = require("crypto-js");

export async function addUser(formData) {
    const data = { email: formData.userEmail, password: formData.userPassword  }
    try {
      const url = `${process.env.URL_SERVER}/api/auth/register`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function loginApi(formData) {
    try {
      const url = `${process.env.URL_SERVER}/api/auth/login`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
        console.log(error);
      return null;
    }
  }

  export async function changePassword(password, userId) {
    const data = { password: password }
    try {
      const url = `${process.env.URL_SERVER}/api/auth/${userId}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await authFetch(url, params);
      const result = await response;
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
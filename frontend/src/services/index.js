export const createMeetup = async (meetupData, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/meetups`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(meetupData),
        mode: "cors",
      }
    );

    const data = await response.json();

    console.log("Inside createMeetup - After Fetch:", data);

    if (!response.ok) {
      console.error("Error in createMeetup:", data.message);
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error("Error in createMeetup:", error.message);
    throw new Error(`Error en la creación del meetup: ${error.message}`);
  }
};

export const registerUserService = async ({
  username,
  bio,
  email,
  password,
}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Frontend-URL": import.meta.env.VITE_APP_FRONTEND,
        },
        body: JSON.stringify({
          username,
          bio,
          email,
          password,
        }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json;
  } catch (error) {
    throw new Error(`The ${error.message}`);
  }
};

export const loginUserService = async ({ email, password }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.token;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const activateUserService = async ({ token }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/activate-account/${token}`
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.message;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserService = async ({ data, token, id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDataUserService = async ({ id, token }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updataUserEmailService = async ({ email, token, id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/email/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Frontend-URL": import.meta.env.VITE_APP_FRONTEND,
          Authorization: token,
        },
        body: JSON.stringify({ email }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchMeetups = async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/meetups`);
  const data = await response.json();
  return data || [];
};
export const updataUserPasswordService = async ({ password, token, id }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/user/password/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

import { updateToken } from "../utils/updateToken";
import { APIuser } from "./serviceApiUser.config";

//! ------------------------------- REGISTER -----------------------------------
export const registerUser = async (formData) => {
  return APIuser.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------------- CHECK CODE ---------------------------------

export const checkCodeConfirmationUser = async (formData) => {
  return APIuser.post("/users/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -------- LOGIN
export const login = async (formData) => {
  return APIuser.post("/users/login", formData)
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};

//! -------------------------------- AUTOLOGIN ----------------------------------

export const autologinUser = async (formData) => {
  return APIuser.post("/users/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -------------------------------- BORRADO DEL USUARIO -------------------------

export const deleteUserService = async () => {
  return APIuser.delete("/users/", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------------------ CAMBIO CONTRASEÑA SIN TOKEN-------------

export const forgotPasswordUser = async (formData) => {
  return APIuser.patch("/users/forgotpassword/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------ CAMBIO CONTRASEÑA CUANDO  ESTÁS LOGGEADO-------------

export const changePasswordUserToken = async (formData) => {
  return APIuser.patch("/users/changepassword", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------------ UPDATE USER -----------------------

export const updateUser = async (formData) => {
  return APIuser.patch("/users/update/update/:id", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------- GET USER BY ID -----------------

export const getUserById = async (id) => {
  return APIuser.get(`/users/${id}`)
    .then((res) => res.data)
    .catch((error) => error);
};

//! ADQURIR JUEGO

export const toggleAcquiredGame = async (formData) => {
  return APIuser.patch("/users/addAcquiredGame/add", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res.data)
    .catch((error) => error);
};

import "./FormProfile.css";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

import { FigureUser } from "../FigureUser/FigureUser";
import { Uploadfile } from "../UploadFile/Uploadfile";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { updateUser } from "../../services/user.service";
import { useUpdateError } from "../../hooks";

export const FormProfile = () => {
  const { user, setUser, logout } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  const defaultData = {
    name: user?.user,
  };

  //? ------------ 1) La función que gestiona el formulario -------------------------------

  const formSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure you want to change your data profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById("file-upload").files;

        if (inputFile.length != 0) {
          const custonFormData = {
            ...formData,
            image: inputFile[0],
          };

          setSend(true);
          setRes(await updateUser(custonFormData));
          setSend(false);
        } else {
          const custonFormData = {
            ...formData,
          };
          setSend(true);
          setRes(await updateUser(custonFormData));
          setSend(false);
        }
      }
    });
  };

  //? -------------- 2 ) useEffect que gestiona la parte de la respuesta ------------- (customHook)

  useEffect(() => {
    useUpdateError(res, setRes, setUser, logout);
  }, [res]);

  return (
    <>
      <div className="containerProfile">
        <div className="containerDataNoChange">
          <FigureUser user={user} />
        </div>
        <div className="form-wrap formProfile">
          <h1>Change your data profile ♻</h1>
          <p>Please, enter your new data profile</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
              <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                // LO NUEVOOOOOOOO------>
                defaultValue={defaultData?.name}
                {...register("name")}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                username
              </label>
            </div>
            <Uploadfile />
            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#49c1a388" : "#49c1a2" }}
              >
                CHANGE DATA PROFILE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useChangePasswordError = (res, setRes, setUser) => {
  //?----------------- 200: updateUser: true,
  if (res?.data?.updateUser?.toString() == "true") {
    setUser(() => null);
    localStorage.removeItem("user");
    setRes(() => ({}));
    return Swal.fire({
      icon: "success",
      title: "Change password ok ✅",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  //!------------------200: updateUser: false,
  if (res?.data?.updateUser?.toString() == "false") {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Internal server error ❎.",
      text: "Please, try again",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  //! -----------------404: 'password dont match'
  if (res?.response?.data?.includes("passwords don't match")) {
    console.log("password ❌");
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Old password don't match,  ❎ Try again, please",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  //! -----------------404: general
  if (res?.response?.status == 404) {
    console.log("password ❌");

    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Internal server error ❎.",
      text: "Please, try again",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  //! -----------------500: Internal server error
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const logout = async () => {
  error.value = null;
  try {
    // use firebase auth to only log out so we don't have to store
    // anything inside variable
    await projectAuth.signOut();
  } catch (err) {
    // console.log(err.message);
    error.value = err.message;
  }
};

const useLogout = () => {
  return { logout, error };
};
export default useLogout;

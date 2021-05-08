import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;
  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    error.value = null;
    isPending.value = false;
    return res;
  } catch (err) {
    error.value = "The password is invalid or the user does not exist.";
    isPending.value = false;
  }
};

const useLogin = () => {
  return { login, error, isPending };
};

export default useLogin;

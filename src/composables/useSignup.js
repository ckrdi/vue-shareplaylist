import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const signup = async (displayName, email, password) => {
  error.value = null;
  isPending.value = true;
  try {
    // use the firebase auth to get user signed up and appear in the database
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw new Error("Could not complete the signup");
    }
    await res.user.updateProfile({ displayName });
    error.value = null;
    isPending.value = false;
    return res;
  } catch (err) {
    error.value = err.message;
    isPending.value = false;
  }
};
const useSignup = () => {
  return { signup, error, isPending };
};

export default useSignup;

import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const signup = async (displayName, email, password) => {
  error.value = null;
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
    return res;
  } catch (err) {
    // console.log(err.message);
    error.value = err.message;
  }
};
const useSignup = () => {
  return { signup, error };
};

export default useSignup;

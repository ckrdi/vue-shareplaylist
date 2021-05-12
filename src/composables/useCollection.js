import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection) => {
  const error = ref(null);

  const addDoc = async (doc) => {
    error.value = null;
    try {
      const res = await projectFirestore.collection(collection).add(doc);
      return res;
    } catch (err) {
      error.value = "Could not create the playlist";
    }
  };
  return { error, addDoc };
};
export default useCollection;

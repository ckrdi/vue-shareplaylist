import { ref } from "vue";
import { projectStorage } from "../firebase/config";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const storageError = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    storageError.value = null;
    filePath.value = `covers/
      ${user.value.uid}/
      ${user.value.uid}+${Date.now()}+${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch (err) {
      storageError.value = err.message;
    }
  };

  return { storageError, url, filePath, uploadImage };
};

export default useStorage;

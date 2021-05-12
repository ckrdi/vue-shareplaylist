import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection, docId = "") => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");
  const unsubscribe = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      if (docId) {
        let singleResult = results.filter((res) => res.id === docId);
        documents.value = singleResult[0];
        error.value = null;
      } else {
        documents.value = results;
        error.value = null;
      }
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "Could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    // unsubscribe from previous collection when
    // watcher is stopped (component unmounted)
    onInvalidate(() => {
      unsubscribe();
    });
  });

  return { documents, error };
};
export default getCollection;

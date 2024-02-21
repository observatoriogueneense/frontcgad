import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyC5RgtPVCYK5N7rvu_hTAgUkB2zBJkG16Y",
    authDomain: "observatorio-e2ba4.firebaseapp.com",
    projectId: "observatorio-e2ba4",
    storageBucket: "observatorio-e2ba4.appspot.com",
    messagingSenderId: "406207783313",
    appId: "1:406207783313:web:2175a42149338faae6ba30",
    measurementId: "G-L7FP1FBCW6"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const imageDb = getStorage(app)



























// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// // import { getAnalytics } from "firebase/analytics";


// const firebaseConfig = {
//   apiKey: "AIzaSyA5aH7-v3BQ5K_KJahUCZd6CJw0VjotF1w",
//   authDomain: "cgad-73191.firebaseapp.com",
//   projectId: "cgad-73191",
//   storageBucket: "cgad-73191.appspot.com",
//   messagingSenderId: "770292682261",
//   appId: "1:770292682261:web:d6f539c5e902a9fc75081c",
//   measurementId: "G-STH8YK16RF"
// };

// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export const storage = getStorage(app)
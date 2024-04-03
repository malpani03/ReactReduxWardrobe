// Import Firebase modules
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"; // Import authentication related functions
import { getFirestore, doc, getDoc, setDoc,collection,writeBatch,query,getDocs } from "firebase/firestore"; // Import Firestore related functions

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDNMXd0k1bA6Y7sWHf4YAUtSlKu7foiPpE",
  authDomain: "crwn-clothing-db-ae83d.firebaseapp.com",
  projectId: "crwn-clothing-db-ae83d",
  storageBucket: "crwn-clothing-db-ae83d.appspot.com",
  messagingSenderId: "554097861869",
  appId: "1:554097861869:web:4c79b78a36b8c3f0ea98e4",
};

// Initialize Firebase with the provided configuration
const firebaseApp = initializeApp(firebaseConfig);

// Create Google provider and set custom parameters
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// Initialize Firebase authentication and Firestore
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const db = getFirestore();

export const addCollectionAndDocuments=async(collectionKey,objectsToAdd)=>{
  const collectionRef=collection(db,collectionKey);
  const batch =writeBatch(db);

  objectsToAdd.forEach((object)=>{
      const docRef=doc(collectionRef,object.title.toLowerCase());
      batch.set(docRef,object);
  });

  await batch.commit();
  console.log("done");
};


export const getCategoriesAndDocuments=async()=>{
  const collectionRef=collection(db,'categories');
  const q=query(collectionRef);

  const querySnapShot=await getDocs(q);
  return querySnapShot.docs.map(docSnapshot=>docSnapshot.data());
  
  
  
  // .reduce((acc,docSnapShot)=>{
  //   const {title,items}=docSnapShot.data();
  //   acc[title.toLowerCase()]=items;
  //   return acc;
  //   },{})

  //   return categoryMap;
}

// Function to create user document in Firestore based on authentication information
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  // Reference to the user document in Firestore
  const userDocRef = doc(db, 'users', userAuth.uid);

  // Retrieve snapshot of user document
  const userSnapshot = await getDoc(userDocRef);

  // Log user document reference and snapshot
  console.log(userSnapshot.exists())

  // If user data does not exist, create a new document in Firestore
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  return userDocRef;
};

// Function to create user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Function to sign in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// Function to sign out user
export const SignOutUser = async () => signOut(auth);

// Function to listen for changes in authentication state
export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);

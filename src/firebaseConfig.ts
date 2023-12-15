// export const firebaseConfig = {
//   apiKey: "AIzaSyBM26NyEXf7HMJELyZpHu8iQxHz1Hhrm4g",
//   authDomain: "animal-search-ct-capstone.firebaseapp.com",
//   databaseURL: "https://animal-search-ct-capstone-default-rtdb.firebaseio.com",
//   projectId: "animal-search-ct-capstone",
//   storageBucket: "animal-search-ct-capstone.appspot.com",
//   messagingSenderId: "583310555313",
//   appId: "1:638405879158:web:aa523c2b3f2511c248c657"
// };
// export const firebaseConfig = {
//   apiKey: "AIzaSyDKqdG3pnNrsd-DG4Vs5YOR5ODpujebz2Y",
//   authDomain: "dino-data-capstone.firebaseapp.com",
//   databaseURL: "https://dino-data-capstone-default-rtdb.firebaseio.com",
//   projectId: "dino-data-capstone",
//   storageBucket: "dino-data-capstone.appspot.com",
//   messagingSenderId: "638405879158",
//   appId: "1:638405879158:web:aa523c2b3f2511c248c657"
// };
 export const firebaseConfig = {
  apiKey: "AIzaSyBM26NyEXf7HMJELyZpHu8iQxHz1Hhrm4g",
  authDomain: "animal-search-ct-capstone.firebaseapp.com",
  databaseURL: "https://animal-search-ct-capstone-default-rtdb.firebaseio.com",
  projectId: "animal-search-ct-capstone",
  storageBucket: "animal-search-ct-capstone.appspot.com",
  messagingSenderId: "583310555313",
  appId: "1:583310555313:web:6b686d659e065f753a4a90"
};
// I DELETED THE ANIMAL-DATA-CAPSTONE/DINO-DATA-CAPSTONE FIREBASE PROJECT YET IT IS STILL SHOWING IN MY PROFILE...

// 1. Run 'npm run build' in terminal (there might be some things that need to be cleaned up based on tsconfig rules)

// I DID HAVE SOME ERRORS AND WENT BACK AND CLEARED THOSE OUT, MY SITE IS STILL FUNCTIONING LOCALLY AFTER THOSE EDITS (HOWEVER MY TERMINAL IS STILL SHOWING THOSE ERRORS)

//      a. We will try to cleanup our code but we MIGHT need to turn off both 'noUnusedLocals' & 'noUnusedParameters' 

// I HAVE SET THESE BOTH TO FALSE

// 2. Run 'npm install -g firebase-tools' or 'sudo npm install -g firebase-tools' if mac 

// 3. Run 'firebase login' (if you get a prompt asking to allow CLI, say "no")

// 4. Run 'firebase init'
//      a. Select BOTH 'Realtime Database:...' and 'Hosting w/ optional github deploys' 

//      b. Select 'Use an existing project' and select your project

//      c. Select ENTER for which file should be used for Realtime Database 

//      d. Type 'dist' for What do you wnat to use as public directory?

//      e. Type 'y' for Configure as a single-page app

//      f. Type 'n' for Setup automatic builds

//      g. Type 'n' for file dist/index.html already exists, Overwrite

// 5. Run 'firebase deploy --only hosting,database' (make sure there is no space between hosting, and database) firebase use --add
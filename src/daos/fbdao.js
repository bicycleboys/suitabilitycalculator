import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export class fbdao{

  constructor() {
    // var db;
    // var firebaseConfig = {
    //     apiKey: "AIzaSyChkACWp5aGd0s3ovbD7sRMugbSaljjyZU",
    //     authDomain: "bicycleboys.firebaseapp.com",
    //     databaseURL: "https://bicycleboys.firebaseio.com",
    //     projectId: "bicycleboys",
    //     storageBucket: "bicycleboys.appspot.com",
    //     messagingSenderId: "691023297022",
    //     appId: "1:691023297022:web:91ea734781e0029e99a8af",
    //     measurementId: "G-ZRQ1KHK7PL"
    //   };
    // try{
    //   var app = firebase.initializeApp(firebaseConfig);
    //   firebase.firestore(app).enablePersistence().catch(function(err) {
    //         if (err.code == 'failed-precondition') {
    //             console.log("failed precondition");
    //         } else if (err.code == 'unimplemented') {
    //           console.log("unimplemented");
    //         }
    //     });
    //     //set cache size to be as big as we need
    //   firebase.firestore(app).settings({
    //       cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
    //     });
    // }catch{
    //   console.log("Firebase already intinalized");
    // }
    // var db = firebase.firestore(app);
    // this.db = db;
    // db.collection("users").add({
    //   first: "Ada",
    //   last: "Lovelace",
    //   born: 1815
    // })
    // .then(function(docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //   console.error("Error adding document: ", error);
    // });
    //
    // db.collection("cities").doc("LA").set({
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA"
    // })
    // .then(function() {
    //   console.log("Document successfully written!");
    // })
    // .catch(function(error) {
    //   console.error("Error writing document: ", error);
    // });
    var firebaseConfig = {
      apiKey: "AIzaSyChkACWp5aGd0s3ovbD7sRMugbSaljjyZU",
      authDomain: "bicycleboys.firebaseapp.com",
      databaseURL: "https://bicycleboys.firebaseio.com",
      projectId: "bicycleboys",
      storageBucket: "bicycleboys.appspot.com",
      messagingSenderId: "691023297022",
      appId: "1:691023297022:web:91ea734781e0029e99a8af",
      measurementId: "G-ZRQ1KHK7PL"
    };

    try{
      var app = firebase.initializeApp(firebaseConfig);
    }catch(error){
      console.log(error);
    }
    var db = firebase.firestore();
    // Add a new document in collection "cities"
    db.collection("cities").doc("LA").set({
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });


    this.db = db;

    //return db;
  }

  add(SegmentDataObject, scoresArray){
    this.db.collection("Segments").add({
      SegmentDataObject: SegmentDataObject,
      Scores: scoresArray,
      Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //do we want to pull all of the info out of the SegmentDataObject? or just store it
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  };

  getList(){
    var list = [];
    this.db.collection("Segments").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        list.push(doc.data());
      });
    });
    return list;
  };

  getElementBySegmentName(queryString){
    var toReturn = [];
    return this.db.collection("Segments").where("SegmentDataObject.segmentName", "==", queryString)
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        toReturn.push(doc.data());
        console.log(doc.id, " => ", doc.data());
        console.log(toReturn);
      });
    }).then(function(result) {
      return toReturn;  
    })

  }

};

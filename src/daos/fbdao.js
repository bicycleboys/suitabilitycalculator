import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export class fbdao{

  constructor() {
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
      firebase.firestore(app).enablePersistence().catch(function(err) {
        if (err.code == 'failed-precondition') {
          console.log("failed precondition");
        } else if (err.code == 'unimplemented') {
          console.log("unimplemented");
        }
      });
      //set cache size to be as big as we need
      firebase.firestore(app).settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
      });
    }catch(error){
      console.log(error);
    }
    var db = firebase.firestore();
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
    return this.db.collection("Segments").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        list.push(doc.data());
      });
    }).then(function(result){
        return list;
    });

  };

  getElementBySegmentName(queryString){
    var toReturn = [];
    return this.db.collection("Segments").where("SegmentDataObject.segmentName", "==", queryString)
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        toReturn.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
    }).then(function(result) {
      return toReturn;
    })

  }

  getElementID(queryString){
    var toReturn = [];
    return this.db.collection("Segments").where("SegmentDataObject.segmentName", "==", queryString)
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        toReturn.push(doc.id);
        console.log(doc.id, " => ", doc.data());
      });
    }).then(function(result) {
      return toReturn;
    })
  }

  getElementById(docID){
    var docRef = this.db.collection("Segments").doc(docID);
    var docData = null;
    return docRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        docData = doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).then(function(result) {
      return docData;
    });
  }

  deleteElement(docID){
    return this.db.collection("Segments").doc(docID).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }

  updateElement(docID, fieldToUpdate, updatedValue){
    var obj = {};
    obj[fieldToUpdate] = updatedValue;
    console.log(obj);
    return this.db.collection("Segments").doc(docID).update(obj).then(function() {
      console.log("Document Updated");
    })
  }

};

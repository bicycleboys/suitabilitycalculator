import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export type documentElement = { key: any; SegmentDataObject: SegmentDataObject; Scores: CalculatorResponse[]; Timestamp: number; };

export class FBDao implements Dao {

  db: firebase.firestore.Firestore;
  segmentName: string;

  constructor(testing:boolean = false) {
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

    if(testing){
      this.segmentName = "SegmentsTest"
    }else{
      this.segmentName = "Segments"
    }

    try {
      var app = firebase.initializeApp(firebaseConfig);
      firebase.firestore(app).enablePersistence({ synchronizeTabs: true }).catch(function (err: any) {
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
    } catch (error) {
      console.log(error);
    }
    var db = firebase.firestore();
    this.db = db;
  }

  add(SegmentDataObject: SegmentDataObject, scoresArray: CalculatorResponse[]) {
    this.db.collection(this.segmentName).add({
      SegmentDataObject: SegmentDataObject,
      Scores: scoresArray,
      Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //do we want to pull all of the info out of the SegmentDataObject? or just store it
    })
      .then(function (docRef: any) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error: any) {
        console.error("Error adding document: ", error);
      });
  };

  getList() {
    var list: any[] = [];
    return this.db.collection(this.segmentName).get().then(function (querySnapshot: any) {
      querySnapshot.forEach(function (doc: any) {
        console.log(doc.id, " => ", doc.data());
        list.push(doc.data());
      });
    }).then(function (result: any) {
      return list;
    });

  };

  getElementBySegmentName(queryString: string) {
    var toReturn: any[] = [];
    return this.db.collection(this.segmentName).where("SegmentDataObject.segmentName", "==", queryString)
      .get().then(function (querySnapshot: any) {
        querySnapshot.forEach(function (doc: any) {
          toReturn.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
      }).then(function (result: any) {
        return toReturn;
      })

  }

  getElementID(queryString: string) {
    var toReturn: any[] = [];
    return this.db.collection(this.segmentName).where("SegmentDataObject.segmentName", "==", queryString)
      .get().then(function (querySnapshot: any) {
        querySnapshot.forEach(function (doc: any) {
          toReturn.push(doc.id);
          console.log(doc.id, " => ", doc.data());
        });
      }).then(function () {
        return toReturn;
      })
  }

  getElementById(docID: any) {
    var docRef = this.db.collection(this.segmentName).doc(docID);
    var docData: documentElement = null;
    return docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        docData = (doc.data() as documentElement);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).then(function (result: any) {
      return docData;
    });
  }

  deleteElement(docID: any) {
    return this.db.collection(this.segmentName).doc(docID).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error: any) {
      console.error("Error removing document: ", error);
    });
  }

  updateElement(docID: any, fieldToUpdate: any, updatedValue: any) {
    var obj: any = {};
    obj[fieldToUpdate] = updatedValue;
    console.log(obj);
    return this.db.collection(this.segmentName).doc(docID).update(obj).then(function () {
      console.log("Document Updated");
    })
  }

  closeConnection() {
    this.db.terminate();
  }

  remove(key: any): void {
    this.deleteElement(key);
  }
  getInfo(key: any): Promise<{ key: any; data: SegmentDataObject; scores: CalculatorResponse[]; }> {
    return this.getElementById(key).then(r=>{
      let obj:any = {}
      obj.key=r.key;
      obj.scores = r.Scores;
      obj.data=r.SegmentDataObject;
      return obj;
    });
  }

};

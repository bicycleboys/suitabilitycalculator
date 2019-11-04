import {fbdao} from "./fbdao.js"
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

test("constructor",()=>{
    expect(new fbdao());
});

test('construct and immediately add',()=>{
    let toAdd = {
        segmentName: "test"
    };
    let scoresArray = ["A", 0.0];
    let myfbdao = new fbdao();
    //console.log(myfbdao);
    //console.log(myfbdao.db);
    myfbdao.add(toAdd, scoresArray);
})

test('get added object', ()=>{
  let toAdd = {
      segmentName: "test2",
      otherData: 10
  }
  let myfbdao = new fbdao();
  let scoresArray = ["F", 98.6];
  myfbdao.add(toAdd, scoresArray);
  let element = myfbdao.getElementBySegmentName("test2");
  expect(element).toBeDefined();
  console.log(element);
  return element.then((array)=>{
    expect(array[0].SegmentDataObject).toEqual({segmentName:"test2", otherData:10})
    expect(array[0].Scores).toEqual(["F", 98.6])
  })
});


test("is logic broken",()=>{
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
  return db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  })
  // .then(function() {
  //   console.log("Document successfully written!");
  //   expect(true).toBeFalsy();
  // })
})

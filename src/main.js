import * as lts from './calculators/lts.js'
import * as blos from './calculators/blos.js'
import * as plos from './calculators/plos.js'


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
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

//set cache size to be as big as we need
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

//enable persistence
firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

function writeToFirebase(SegmentDataObject, calculatedBLOS, calculatedPLOS, calculatedLTS){
  //TODO: figure out how we want the data organized, write the write method
  db.collection("Segments").add({
    SegmentName: SegmentDataObject.name,
    BLOS: calculatedBLOS,
    PLOS: calculatedPLOS,
    LTS: calculatedLTS,
    Timestamp: firebase.firestore.FieldValue.serverTimestamp(),

    //do we want to pull all of the info out of the SegmentDataObject? or just store it

})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}
/***
 * Checks form valididty and runs calculations
 */
function doCalculate() {
    if(form.reportValidity()){
        var infoObject = gatherData(form);
        resetForm();
        var ltsData = lts.calculate(infoObject);
        var plosData = plos.calculate(infoObject);
        var blosData = blos.calculate(infoObject);
        ltsData.name="LTS";
        plosData.name = "PLOS";
        blosData.name = "BLOS";
        doSave(infoObject,ltsData,blosData,plosData);
        display(ltsData);
        display(blosData);
        display(plosData);
    }
}
/**
 * Displays the data passed in
 * @param {name:string,grade:string,points:number} data
 */
function display(data){
    //data should have a grade which is a letter and a percentage/point score
    var grade = document.createElement("p")
    if(!data.grade){
        throw Error("Cannot display "+data.name+" without a grade");
    }
    grade.textContent = `${data.name}: ${data.grade} (${data.points})`;
    document.body.appendChild(grade);
}

function doSave(infoObject, ...calculatedData){
    //TODO implement saving
}


/***
 * Creates a Segment Data Object from the fields of the passed-in-form
 * @param form form to gather data from
 * @returns {SegmentDataObject} object with all info about segment
 */
function gatherData(form){
    if (form==null) throw Error("Invalid form passed in");
    let obj = {};
    let elements = form.querySelectorAll( "input, select, textarea" );

    for( let element of elements ) {
        var name = element.name;
        var value = element.value;
        if( name ) {
            obj[ name ] = value;
        }
    }

    obj.lanesCombinedWidth = obj.adjacent? obj.width:NaN;
    obj.laneWidth = obj.adjacent?NaN:obj.width;

    return obj;
}

/***
 * Resets attached form (clears text values, resets dropdowns back to non-options)
 */
function resetForm(){
    form.reset();
    type.selectedIndex = -1;
    blockage.selectedIndex = -1;
}

/**
 * Runs once DOM has loaded
 */
document.addEventListener('DOMContentLoaded', function () {
    var type = document.getElementById("type");
    var blockage = document.getElementById("blockage");
    var submit = document.getElementById("submit");
    var form = document.getElementById("form");

    var lastType = false;
    resetForm();
    //Clear selection dropdowns so we don't accidentally record inaccurate data

    type.addEventListener("input", function (e) {
        if (lastType) {
            switch (lastType) {
                case "bike lane":
                    document.querySelectorAll(".if-bike-lane").forEach(function (e) {
                        e.removeAttribute("required");
                    });
                    break;
                case "mixed traffic":
                    document.querySelectorAll(".if-mixed").forEach(function (e) {
                        e.removeAttribute("required");
                    });
                    break;
            }
        }
        lastType = type.value;
        switch (type.value) {
            case "stand-alone":
            case "segregated":
                break;
            case "bike lane":
                var req = document.querySelectorAll(".if-bike-lane");
                req.forEach(function (e) {
                    e.setAttribute("required", "");
                });
                break;
            case "mixed traffic":
                var req = document.querySelectorAll(".if-mixed");
                req.forEach(function (e) {
                    e.setAttribute("required", "");
                });
                break;
        }
    });

    submit.addEventListener("click", (event) => {
        doCalculate()
    });

    //Useful for demos, can show off without having to manually input data
    window.fill = ()=>{
        document.getElementsByName("segmentName")[0].value="Cramer: Park-Newberry";
        document.getElementsByName("segmentType")[0].value="mixed traffic"
    }
})

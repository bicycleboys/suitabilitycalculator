import * as lts from './calculators/lts'
import * as blos from './calculators/blos'
import * as plos from './calculators/plos'
import "./styles.css";
import "./manifest.json"
import { FBDao } from './daos/fbdao'
import { MDCMenu } from '@material/menu';
import { MDCSelect } from '@material/select';
import {MDCDialog} from '@material/dialog';
import { scoreToDiv } from './calculators/calculatorUtils';
import {MDCSnackbar} from '@material/snackbar';

var dao: FBDao;

if ('serviceWorker' in navigator) {
  //service-worker.js generated by webbox webpack plugin
  navigator.serviceWorker.register('./service-worker.js').then(function (reg) {

    if (reg.installing) {
      console.log('Service worker installing');
    } else if (reg.waiting) {
      console.log('Service worker installed');
    } else if (reg.active) {
      console.log('Service worker active');
    }

  }).catch(function (error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

/***
* Checks form valididty and runs calculations
*/
function doSubmit(form:any) {
  if (form.reportValidity()) {
    var infoObject:SegmentDataObject = gatherData(form);
    var ltsData = lts.calculate(infoObject);
    var plosData = plos.calculate(infoObject);
    var blosData = blos.calculate(infoObject);
    try {
      doSave(infoObject, ltsData, blosData, plosData).then(id=>{
        const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
        snackbar.open()
      });
    } catch (e) { console.log(e) }
  }
}

/**
* Displays the data from the form
* @param HTMLFormElement form
*/
function displayResults(form: HTMLFormElement=null) {
  const scoreDiv = document.getElementById("results");

  if(form==null){
    form=(document.getElementById("form") as HTMLFormElement);
  }
  var infoObject: SegmentDataObject = gatherData(form);

  var ltsData = lts.calculate(infoObject);
  var plosData = plos.calculate(infoObject);
  var blosData = blos.calculate(infoObject);

  scoreDiv.innerHTML = "";
  for (let s of [ltsData, plosData, blosData]) {
    scoreDiv.appendChild(scoreToDiv(s));
  }
}

function doSave(infoObject:any, ...calculatedData:CalculatorResponse[]):Promise<string> {
  let saveDao = new FBDao();
  return saveDao.add(infoObject, calculatedData);
}


/***
* Creates a Segment Data Object from the fields of the passed-in-form
* @param form form to gather data from
* @returns {SegmentDataObject} object with all info about segment
*/
function gatherData(form: any):SegmentDataObject {
  if (form == null) throw Error("Invalid form passed in");
  let obj = {};
  let elements:any[] = form.querySelectorAll("input, select, textarea");

  for (let element of elements) {
    var name = element.name;
    var value = element.value;
    if (element.type == "radio") {
      if (!element.checked) continue;
    }
    if (element.type == "number") {
      value = parseFloat(value);
    }
    if (value == "false") value = false;
    if (value == "true") value = true;
    if (name) {
      (obj as any)[name] = value;
    }
  }
  (obj as any).lanesCombinedWidth = (obj as any).adjacent ? (obj as any).wbl + (obj as any).parkingWidth : NaN;
  (obj as any).laneWidth = (obj as any).adjacent ? NaN : (obj as any).wbl;
  return (obj as SegmentDataObject);
}

/***
* Resets attached form (clears text values, resets dropdowns back to non-options)
*/
function resetForm() {
  window.location.search="";
}

function setNameValue(name:string, value:any) {
  let el:NodeListOf<HTMLInputElement> = (document.getElementsByName(name) as NodeListOf<HTMLInputElement>)
  if (el.length == 1) {
    el[0].value = value;
  } else {
    for (let name in el) {
      let e = el[name];
      if (e.value == value)
        if ("checked" in e) e.checked = true
        else console.error("attempted to set checked on", e)
    }
  }
}

/**
 * Fill the form with data from a dataObject
 * @param data Data to fill the page with
 */
function fillPage(data: SegmentDataObject){
  for(let n in data){
    setNameValue(n,(data as any)[n])
  }
  displayResults();
}

/**
 * Set the key to fill the form with
 * @param k
 */
function setKey(k:string){
  if(dao==null)
      dao=new FBDao();
  let element = dao.getElementById(k);
  element.then(res=>{
      fillPage(res.SegmentDataObject);
  }).catch(err=>{
      console.log(err)
  })
}

/**
* Runs once DOM has loaded
*/
document.addEventListener('DOMContentLoaded', function () {
  var submit = document.getElementById("submit");
  var clear = document.getElementById("new");
  var form:HTMLFormElement = (document.getElementById("form") as HTMLFormElement);
  var sidewalkWidthButton = document.getElementById("sidewalkWidthButton");
  var bufferButton = document.getElementById("bufferButton");
  var barrierButton = document.getElementById("barrierButton");
  var facilityButton = document.getElementById("facilityButton");
  var occupancyButton = document.getElementById("occupancyButton");
  var numberTravelLanesButton = document.getElementById("#travelLanesButton")
  var travelLanesButtonAgain = document.getElementById("#travelLanesButtonAgain");
  var medianButton = document.getElementById("medianButton");
  var ratingButton = document.getElementById("ratingButton");
  var heavyVehiclesButton = document.getElementById("heavyVehiclesButton");
  var islandButton = document.getElementById("islandButton");
  var unsignalizedButton = document.getElementById("unsignalizedButton");
  var numberRightTurnsButton = document.getElementById("#rightTurnsButton");
  var straightBikeLaneButton = document.getElementById("straightBikeLaneButton");
  const heavyVehiclesDialog = new MDCDialog(document.querySelector('.mdc-dialog1'));
  const unsignalizedDialog = new MDCDialog(document.querySelector('.mdc-dialog2'));
  const pavementRatingDialog = new MDCDialog(document.querySelector('.mdc-dialog3'));
  const bufferDialog = new MDCDialog(document.querySelector('.mdc-dialog4'));
  const sidewalkWidthDialog = new MDCDialog(document.querySelector('.mdc-dialog5'));
  const continuousBarrierDialog = new MDCDialog(document.querySelector('.mdc-dialog6'));
  const bikeFacilityTypeDialog = new MDCDialog(document.querySelector('.mdc-dialog7'));
  const occupancyDialog = new MDCDialog(document.querySelector('.mdc-dialog8'));
  const medianDialog = new MDCDialog(document.querySelector('.mdc-dialog9'));
  const crossingIslandsDialog = new MDCDialog(document.querySelector('.mdc-dialog10'));
  const rightTurnsDialog = new MDCDialog(document.querySelector('.mdc-dialog11'));
  const travelLanesDialog = new MDCDialog(document.querySelector('.mdc-dialog12'));
  const straightBikeLaneDialog = new MDCDialog(document.querySelector('.mdc-dialog13'));
  //Clear selection dropdowns so we don't accidentally record inaccurate data

  const search = window.location.search.slice(1);
  if(search)
    setKey(search);
  form.addEventListener("change", (ev) => displayResults(form));
  displayResults(form);

  straightBikeLaneButton.onclick = (event) => {
    straightBikeLaneDialog.open();
  };

  sidewalkWidthButton.onclick = (event) => {
    sidewalkWidthDialog.open()
  };

  bufferButton.onclick = (event) => {
    bufferDialog.open()
  };

  barrierButton.onclick = (event) => {
    continuousBarrierDialog.open()
  };

  facilityButton.onclick = (event) =>{
    bikeFacilityTypeDialog.open()
  };

  occupancyButton.onclick = (event) => {
    occupancyDialog.open()
  };

  numberTravelLanesButton.onclick = (event) => {
    travelLanesDialog.open()
  };

  travelLanesButtonAgain.onclick = (event) => {
    travelLanesDialog.open()
  };

  medianButton.onclick = (event) => {
    medianDialog.open()
  };

  ratingButton.onclick = (event) => {
    pavementRatingDialog.open()
  };

  heavyVehiclesButton.onclick = (event) => {
    heavyVehiclesDialog.open()
  };

  islandButton.onclick = (event) => {
    crossingIslandsDialog.open()
  };

  unsignalizedButton.onclick = (event) => {
    unsignalizedDialog.open()
  };

  numberRightTurnsButton.onclick = (event) => {
    rightTurnsDialog.open()
  };

  submit.onclick = (event) => {
    doSubmit(form)
  };

  clear.onclick = (event) => {
    resetForm();
  };


  (window as any).fill = () => {
    setNameValue("segmentName", "Test")
    setNameValue("segmentBetween1","t")
    setNameValue("segmentBetween2","tt")
    setNameValue("laneCount", 1)
    setNameValue("median", "false")
    setNameValue("runningSpeed", 30)
    setNameValue("adt", 12000)
    setNameValue("wol", 11)
    setNameValue("wbl", 5.0)
    setNameValue("wos", 8.5)
    setNameValue("curb", "true")
    setNameValue("ppk", 50)
    setNameValue("pc", 4.0)
    setNameValue("phv", 4.0)
    setNameValue("wbuf", 5.0)
    setNameValue("waa", 6.0)
    setNameValue("fb", "false")
    setNameValue("segmentType", "mixed traffic")
    setNameValue("totalLanes", 2)
    setNameValue("runningSpeed", 30)
    setNameValue("centerline", "false")
  }
})

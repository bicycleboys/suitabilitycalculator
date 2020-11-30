import { FBDao } from './daos/fbdao';
import "./styles.css";

var dao = new FBDao();
let arrayOfNames = ["segmentName", "RLCount", "RLLength", "adt", "blockage", "centerline", "curb", "fb", "laneCount", "laneShift", "laneWidth", "lanesCombinedWidth", "median", "parkingWidth", "pc", "phv", "ppk", "runningSpeed", "segmentBetween1", "segmentBetween2", "segmentType", "speed", "totalLanes", "turningSpeed", "waa", "wbl", "wbuf", "wol", "wos", "xStreetWidth"];
let scoresCount = 3;

document.addEventListener("DOMContentLoaded", _ => {
  let table = document.querySelector("table");
  getListAndPopulate(dao, table);
})

async function getListAndPopulate(dao: Dao, table: HTMLTableElement) {
  const l = await dao.getList();
  console.log(Object.entries(l));
  console.log("l:", l);
  generateTableHead(table, l);
  generateTable(table, l);
}

function makeandappendheader(name: string, row: HTMLTableRowElement) {
  let th = document.createElement("th");
  th.innerText = name;
  row.appendChild(th);
  return th;
}

function generateTableHead(table: HTMLTableElement, dataList: any[]) {
  //This is mad ugly, but we need it working for the demo
  let thead = table.createTHead();
  let row = thead.insertRow();

  for (let i = 0; i < scoresCount; i++) {
    makeandappendheader("Name", row);
    makeandappendheader("Because", row);
    makeandappendheader("Grade", row);
    makeandappendheader("Points", row);
  }

  for (let i in arrayOfNames) {
    makeandappendheader(arrayOfNames[i], row);
  }

  let timestampHeader = makeandappendheader("Timestamp", row);
  timestampHeader.classList.add("Long")


  /***
  for (let i in Object.values(key)){
  if (typeof Object.values(key)[i] === 'undefined'){
  th = document.createElement("th");
  text = document.createTextNode(" ");
  th.appendChild(text);
  row.appendChild(th);
  console.log("Hit undefined");
  //ntext = document.createTextNode( ntext.wholeText + " " + element[key]);
  }
  else{
  let array = Object.values(key)[i];
  //ntext = document.createTextNode( ntext.wholeText+ ' ' + printObject(array, document, row));
  for(let j in Object.values(array)){
  if (isNaN(Object.keys(array)[j])){
  if(Object.keys(array)[j] === "grade"){

  th = document.createElement("th");
  text = document.createTextNode("because");
  th.appendChild(text);
  row.appendChild(th);
  }
  else if (Object.keys(array)[j] === "name") {
  th = document.createElement("th");
  text = document.createTextNode("score");
  th.appendChild(text);
  row.appendChild(th);
  th = document.createElement("th");
  text = document.createTextNode("name");
  th.appendChild(text);
  row.appendChild(th);
  th = document.createElement("th");
  text = document.createTextNode("points");
  th.appendChild(text);
  row.appendChild(th);

  }else{
  th = document.createElement("th");
  text = document.createTextNode(Object.keys(array)[j]);
  th.appendChild(text);
  row.appendChild(th);
  }
  }
  }

  }
  }

  if('RLCount' === Object.keys(key)[0]){
  console.log("Into RLCount");
  //ntext = document.createTextNode( ntext.wholeText+ ' ' + printObject(element[key], document, row));
  for (let k in Object.keys(Object.values(key))){
  th = document.createElement("th");
  text = document.createTextNode(Object.keys(key)[k]);
  th.appendChild(text);
  row.appendChild(th);
  }
  }
  else if ('seconds' === Object.keys(key)[0]) {
  th = document.createElement("th");
  th.classList.add("Long")
  text = document.createTextNode("Timestamp (Date Submitted to Firebase)");
  th.appendChild(text);
  row.appendChild(th);
  }
  else{
  console.log("Oops, wrote the conditions wrong");
  }
*/
}


/*
for (let i in Object.values(key)){
if(!(typeof data[key] === 'undefined'||typeof data[key][i] === 'undefined')){
let array = data[key][i];
for(let e in Object.values(array)){
console.log(Object.values(array)[e]);
let th = document.createElement("th");
let text = document.createTextNode(key[i]);
th.appendChild(text);
row.appendChild(th);
}
}
else{
let th = document.createElement("th");
let text = document.createTextNode(key[i]);
th.appendChild(text);
row.appendChild(th);
}
}
*/


function generateTable(table: HTMLTableElement, data: DaoOutput[]) {
  console.log("data:", data);
  data.sort((d1, d2) => d1.Timestamp.seconds - d2.Timestamp.seconds);
  //Same here. mad ugly, but it's demo time and the for loops aren't working
  //maybe iterate over every Firebase object, add each key to a list, and then
  //use that list?
  for (let element of data) {
    let row = table.insertRow();

    // First, scores
    for (const score of element.Scores) {
      addScoreToRow(score, row);
    }

    // Second, all data
    addSegmentDataToRow(element.SegmentDataObject, document, row);

    // Third, timestamp (as date)
    addTimestampToRow(element.Timestamp, row);
  }
}

//TODO this "any" is gross
function addScoreToRow(score: any, row: HTMLTableRowElement) {
  var pointsHeaderOrder = ["name", "because", "grade", "points"];

  for (var property of pointsHeaderOrder) {
    if (property in score) {
      createandappendcell(score[property], row);
    } else {
      createandappendemptycell(row);
    }
  }
}

function addTimestampToRow(timestamp: any, row: HTMLTableRowElement) {
  let cell = row.insertCell();
  var timeText = document.createTextNode(timestamp.toDate());
  cell.appendChild(timeText);
}

function createandappendcell(text: string, row: HTMLTableRowElement) {
  let cell = row.insertCell();
  cell.innerText = text;
}
function createandappendemptycell(row: HTMLTableRowElement) {
  let cell = row.insertCell();
  cell.innerText = "";
}

function addSegmentDataToRow(obj: any, document: HTMLDocument, row: HTMLTableRowElement) {
  for (var property of arrayOfNames) {
    if (property in obj) {
      createandappendcell(obj[property], row);
    }
    else {
      createandappendemptycell(row);
    }
  }
}

function isIterable(obj: any) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

function isString(x: any) {
  return Object.prototype.toString.call(x) === "[object String]"
}

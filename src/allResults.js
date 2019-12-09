import {FBDao} from './daos/fbdao';
import calculatorUtils from './calculators/calculatorUtils'
import "./styles.css";

var dao = new FBDao();
let table = document.querySelector("table");


function getListAndPopulate(dao, table){
  var list = dao.getList()
  return list.then(function (l) {
    console.log(Object.values(list));
    let data = Object.values(l[0]);
    console.log(l);
    console.log(Object.entries(l));
    console.log(typeof l);
    console.log("l:",l)
    generateTable(table, l);
    generateTableHead(table, data);
  });
}

getListAndPopulate(dao, table);

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    console.log(key);
    let th;
    let text;

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
              text = document.createTextNode("Because");
              th.appendChild(text);
              row.appendChild(th);
            }
            th = document.createElement("th");
            text = document.createTextNode(Object.keys(array)[j]);
            th.appendChild(text);
            row.appendChild(th);
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
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (let key in element) {
      let text = document.createTextNode(element[key]);
      let ntext = document.createTextNode("");
      //ntext = document.createTextNode( ntext.wholeText + " " + element[key]);
      for (let i in Object.values(key)){
        if (typeof element[key][i] === 'undefined'){
          //let cell = row.insertCell();
          //ntext = document.createTextNode(" ");
          //cell.appendChild(ntext);
          //console.log("Hit undefined");
        }
        else{
          let array = element[key][i];
          //console.log(array);
          //console.log(Object.values(array));
          //ntext = document.createTextNode( ntext.wholeText+ ' ' + printObject(array, document, row));
          console.log(array);
          printArrayObject(array, document, row);
        }
      }
      if('RLCount' in element[key]){
        //ntext = document.createTextNode( ntext.wholeText+ ' ' + printObject(element[key], document, row));
        printObject(element[key], document, row);
      }
      else if ('seconds' in element[key]) {
        let cell = row.insertCell();
        ntext = document.createTextNode( ntext.wholeText + " " + element[key].toDate());
        cell.appendChild(ntext);
      }


    }

  }
}

function printObject(obj, document, row){
  //console.log(obj);
  //this for loop doesn't handle when an object has a property that another doesn't
  //it results in an uneven table
  /*for (let property in obj) {
    //if(!(Number.isNaN(obj[property]) || obj[property] === "NaN" || obj[property] === " " || obj[property] == "")){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj[property]);
    cell.appendChild(ntext);
    //}
  }*/

  if("RLCount" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["RLCount"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("RLLength" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["RLLength"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("adt" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["adt"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("blockage" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["blockage"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("centerline" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["centerline"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("curb" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["curb"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("fb" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["fb"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("laneCount" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["laneCount"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("laneShift" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["laneShift"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("laneWidth" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["laneWidth"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("lanesCombinedWidth" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["lanesCombinedWidth"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("median" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["median"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("parkingWidth" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["parkingWidth"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("pc" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["pc"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("phv" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["phv"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("ppk" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["ppk"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("runningSpeed" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["runningSpeed"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("segmentBetween1" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["segmentBetween1"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("segmentBetween2" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["segmentBetween2"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("segmentName" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["segmentName"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("segmentType" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["segmentType"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("speed" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["speed"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("totalLanes" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["totalLanes"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("turningSpeed" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["turningSpeed"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("waa" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["waa"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("wbl" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["wbl"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("wbuf" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["wbuf"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }if("wol" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["wol"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("wos" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["wos"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("xStreetWidth" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["xStreetWidth"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }

  //console.log(output);
  return;
}
function printArrayObject(obj, document, row){
  console.log(obj);
  //this is disgusting and it hurt to write, but
  //I can't get the for loop to work for the life of me
  if("because" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["because"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("grade" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["grade"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("name" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["name"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }
  if("points" in obj){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj["points"]);
    cell.appendChild(ntext);
  }
  else{
    let cell = row.insertCell();
    let ntext = document.createTextNode("");
    cell.appendChild(ntext);
  }

  //console.log(output);
  return;
}
//The old, working but ugly print object
//function printObject(obj){
//  var output = '';
//  for (var property in obj) {
//    if(!(Number.isNaN(obj[property]) || obj[property] === "NaN" || obj[property] === " " || obj[property] == "")){
//      output += property + ': ' + obj[property]+'; \n';
//    }
//  }
//  console.log(output);
//  return output;
//}



function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

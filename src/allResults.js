import {FBDao} from './daos/fbdao';
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
      text = document.createTextNode("Timestamp");
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
          printObject(array, document, row);
        }
      }
      if('RLCount' in element[key]){
        //ntext = document.createTextNode( ntext.wholeText+ ' ' + printObject(element[key], document, row));
        printObject(element[key], document, row);
      }
      else if ('seconds' in element[key]) {
        let cell = row.insertCell();
        ntext = document.createTextNode( ntext.wholeText + " " + element[key]);
        cell.appendChild(ntext);
      }


    }

  }
}

function printObject(obj, document, row){
  console.log(obj);
  for (let property in obj) {
    //if(!(Number.isNaN(obj[property]) || obj[property] === "NaN" || obj[property] === " " || obj[property] == "")){
    let cell = row.insertCell();
    let ntext = document.createTextNode(obj[property]);
    cell.appendChild(ntext);
    //}
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

import {FBDao} from './daos/fbdao';
import "./styles.css";

var dao = new FBDao();
let table = document.querySelector("table");


function getListAndPopulate(dao, table){
  var list = dao.getList()
  return list.then(function (l) {
    console.log(Object.values(list));
    let data = Object.keys(l[0]);
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
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      let ntext = document.createTextNode("");
    //ntext = document.createTextNode( ntext.wholeText + " " + element[key]);
      console.log(element[key]);
      for (let i in Object.values(key)){
        if (typeof element[key][i] === 'undefined'){
          console.log("Hit undefined");
          //ntext = document.createTextNode( ntext.wholeText + " " + element[key]);
        }
        else{
          let array = element[key][i];
          console.log(array);
          console.log(Object.values(array));
          ntext = document.createTextNode( ntext.wholeText+ ' ' + printObject(array));
          for(let e in Object.values(array)){
            console.log(Object.values(array)[e]);
            //ntext = document.createTextNode(ntext.wholeText + " " + Object.values(array)[e]);
          }
        }
      }
      if('RLCount' in element[key]){
        console.log("Into if block");
        console.log(element[key]);
        ntext = document.createTextNode( ntext.wholeText+ ' ' + printObject(element[key]));
      }
      else if ('seconds' in element[key]) {
        ntext = document.createTextNode( ntext.wholeText + " " + element[key]);
      }

      cell.appendChild(ntext);
    }

  }
}

function printObject(obj){
  var output = '';
  for (var property in obj) {
    output += property + ': ' + obj[property]+'; \n';
  }
  console.log(output);
  return output;
}

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

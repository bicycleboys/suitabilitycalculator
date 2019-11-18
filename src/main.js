import * as lts from './calculators/lts'
import * as blos from './calculators/blos'
import * as plos from './calculators/plos'
import "./styles.css";
import { FBDao } from './daos/fbdao.ts'
import { MDCMenu } from '@material/menu';
import { MDCSelect } from '@material/select';


if ('serviceWorker' in navigator) {
    //service-worker.js generated by webbox webpack plugin
    navigator.serviceWorker.register('/service-worker.js').then(function(reg) {
  
      if(reg.installing) {
        console.log('Service worker installing');
      } else if(reg.waiting) {
        console.log('Service worker installed');
      } else if(reg.active) {
        console.log('Service worker active');
      }
  
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }

/***
* Checks form valididty and runs calculations
*/
function doCalculate() {
  if (form.reportValidity()) {
    var infoObject = gatherData(form);
    console.log(infoObject);
    //resetForm();
    var ltsData = lts.calculate(infoObject);
    var plosData = plos.calculate(infoObject);
    var blosData = blos.calculate(infoObject);
    try {
      doSave(infoObject, ltsData, blosData, plosData);
    } catch (e) { console.log(e) }
    try {
      display(ltsData);
      display(blosData);
      display(plosData);
    } catch (e) { console.log(e) }
  }
}
/**
* Displays the data passed in
* @param CalculatorResponse data
*/
function display(data) {
  //interface SegmentGrade{
  //     points: number
  //     grade: string
  //     name: string
  // }

  // interface NotCalculated{
  //     name: string;
  //     because: string;
  // }
  var responseDisplay = document.createElement("p")
  if (data.hasOwnProperty("because")) {
    responseDisplay.textContent = `${data.name} not calculated because ${data.because} was missing`;
  } else {
    if (!data.grade) {
      throw Error("Cannot display " + data.name + " without a grade");
    }
    responseDisplay.textContent = `${data.name}: ${data.grade} (${data.points})`;
  }
  document.body.appendChild(responseDisplay);
}

function doSave(infoObject, ...calculatedData) {
  let saveDao = new FBDao();
  saveDao.add(infoObject, calculatedData);
}


/***
* Creates a Segment Data Object from the fields of the passed-in-form
* @param form form to gather data from
* @returns {SegmentDataObject} object with all info about segment
*/
function gatherData(form) {
  if (form == null) throw Error("Invalid form passed in");
  let obj = {};
  let elements = form.querySelectorAll("input, select, textarea");

  for (let element of elements) {
    var name = element.name;
    var value = element.value;
    if (element.type == "radio"){
      if (!element.checked) continue;
    }
    if (element.type == "number"){
      value = parseFloat(value);
    }
    if (value == "false") value = false;
    if (value == "true") value = true;
    if (name) {
      obj[name] = value;
    }
  }

  obj.lanesCombinedWidth = obj.adjacent ? obj.width : NaN;
  obj.laneWidth = obj.adjacent ? NaN : obj.width;

  return obj;
}

/***
* Resets attached form (clears text values, resets dropdowns back to non-options)
*/
function resetForm() {
  form.reset();
}

/**
* Runs once DOM has loaded
*/
document.addEventListener('DOMContentLoaded', function () {
  var submit = document.getElementById("submit");
  var form = document.getElementById("form");
  //Clear selection dropdowns so we don't accidentally record inaccurate data

  /*
    const select1 = new MDCSelect(document.querySelector('.mdc-select-1'));
    const select2 = new MDCSelect(document.querySelector('.mdc-select-2'));
    const select3 = new MDCSelect(document.querySelector('.mdc-select-3'));

  select1.listen('MDCSelect:change', () => {
    console.log(`Selected option at index ${select1.selectedIndex} with value "${select1.value}"`);
  });

  select2.listen('MDCSelect:change', () => {
    console.log(`Selected option at index ${select2.selectedIndex} with value "${select2.value}"`);
  });

  select3.listen('MDCSelect:change', () => {
    console.log(`Selected option at index ${select3.selectedIndex} with value "${select3.value}"`);
  });*/


  submit.onclick = (event) => {
    doCalculate()
  };


  window.fill = () => {
    function setNameValue(name, value) {
      let el = document.getElementsByName(name)
      if (el.length == 1) {
        el[0].value = value;
      } else {
        for (let e of el) {
          if (e.value == value)
            if ("checked" in e) e.checked = true
            else console.log(e)
        }
      }
    }
    setNameValue("segmentName", "Test")
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

import * as lts from './calculators/lts'
import * as blos from './calculators/blos'
import * as plos from './calculators/plos'
import "./styles.css";
import {FBDao} from './daos/fbdao.ts'
import {MDCMenu} from '@material/menu';
import {MDCSelect} from '@material/select';
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
        doSave(infoObject, ltsData, blosData, plosData);
        display(ltsData);
        display(blosData);
        display(plosData);
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
function resetForm(){
  form.reset();
  //type.selectedIndex = -1;
  //blockage.selectedIndex = -1;
}

/**
* Runs once DOM has loaded
*/
document.addEventListener('DOMContentLoaded', function () {
  //var type = document.getElementById("type");
  //var blockage = document.getElementById("blockage");
  var submit = document.getElementById("submit");
  var form = document.getElementById("form");

    var lastType = false;
    resetForm();
    //Clear selection dropdowns so we don't accidentally record inaccurate data

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
    });

    /* type.addEventListener("input", function (e) {
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
    });*/

    submit.onclick = (event) => {
        doCalculate()
    };
})

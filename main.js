import * as lts from './calculators/lts.js';
import {IDBDao} from './idbdao.js';

var myDao;

function doCalculate() {
    if(form.reportValidity()){
        var infoObject = gatherData();
        resetForm();
        var ltsData = lts.calculate(infoObject);
        ltsData.name="LTS";
        doSave(infoObject,ltsData);
        display(ltsData);
    }
}

function display(data){
    //data should have a grade which is a letter and a percentage/point score
    var grade = document.createElement("p")
    if(!data.grade){
        throw Error("Aaaaa");
    }
    grade.textContent = `${data.name}: ${data.grade} (${data.points})`;
    document.body.appendChild(grade);
}

function doSave(infoObject, ...pointsData){
    infoObject.pointsData = pointsData;
    myDao.add(infoObject);
}

function gatherData(){
    const name = document.getElementById("segment-name")
    const adjacent = document.getElementById("lanes-adjacent");
    const width = document.getElementById("width");
    const speed = document.getElementById("speed");
    const totalLanes = document.getElementById("total-lanes");
    const median = document.getElementById("median");
    const laneCount = document.getElementById("lane-count");
    const centerline = document.getElementById("centerline");
    const adt = document.getElementById("adt");

    let obj = {};
    obj.segmentType = type.value;
    obj.lanesAdjacent = adjacent.value;
    obj.lanesCombinedWidth = obj.lanesAdjacent? width.value:NaN;
    obj.laneWidth = obj.lanesAdjacent?NaN:width.value;
    obj.speed = speed.value;
    obj.laneCount = laneCount.value;
    obj.median = median.value;
    obj.blockage = blockage.value;
    obj.totalLanes = totalLanes.value;
    obj.centerline = centerline.value;
    obj.adt = adt.value;

    obj.segmentName = name.value;
    return obj;
}

function resetForm(){
    form.reset();
    type.selectedIndex = -1;
    blockage.selectedIndex = -1;
}

document.addEventListener('DOMContentLoaded', function () {
    myDao = new IDBDao();
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

})
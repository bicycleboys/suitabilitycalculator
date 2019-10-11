import * as lts from './calculators/lts.js'

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

function doSave(){
    //TODO implement saving
}

function gatherData(){
    const adjacent = document.getElementById("lanes-adjacent");
    const width = document.getElementById("width");
    const speed = document.getElementById("speed");
    const totalLanes = document.getElementById("total-lanes");
    const median = document.getElementById("median");
    const laneCount = document.getElementById("lane-count");
    const centerline = document.getElementById("centerline");
    const adt = document.getElementById("adt");

    let obj = {
        segmentType : type.value,
        lanesAdjacent : adjacent.value,
        lanesCombinedWidth : adjacent.value? width.value:NaN,
        laneWidth : adjacent.value?NaN:width.value,
        speed : speed.value,
        laneCount : laneCount.value,
        median : median.value,
        blockage : blockage.value,
        totalLanes : totalLanes.value,
        centerline : centerline.value,
        adt : adt.value
    }
    return obj;
}

function resetForm(){
    form.reset();
    type.selectedIndex = -1;
    blockage.selectedIndex = -1;
}

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

})
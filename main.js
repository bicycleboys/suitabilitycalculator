import * as lts from './calculators/lts.js'

function doCalculate() {
    if(form.reportValidity()){
        var infoObject = gatherData();
        resetForm();
        var ltsData = lts.calculate(infoObject);
        display(ltsData);
        doSave(infoObject,ltsData);
    }
}

function display(data){
    //data should have a grade which is a letter and a percentage/point score
    var grade = document.createElement("p")
    if(!data.grade){
        throw Error("Aaaaa");
    }
    grade.textContent = data.grade;
    document.body.appendChild(grade);
}

function doSave(){
    //TODO implement saving
}

function gatherData(){
    var obj = {};
    obj.segmentType = type.value;
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
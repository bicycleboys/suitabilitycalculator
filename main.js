import * as lts from './calculators/lts.js'

function doCalculate() {
    if(form.reportVailidity()){
        var infoObject = gatherData();
        lts.calculate(infoObject);
    }
}

function gatherData(){
    var obj = {};
    obj.segmentType = type.value;
    return obj;
}

document.addEventListener('DOMContentLoaded', function () {
    var type = document.getElementById("type");
    var block = document.getElementById("blockage");
    var submit = document.getElementById("submit");
    var form = document.getElementById("form");

    var lastType = false;

    //Clear selection dropdowns so we don't accidentally record inaccurate data
    type.selectedIndex = -1;
    block.selectedIndex = -1;

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
                console.log("saaa");
                break;
            case "segregated":
                console.log("seeeee");
                break;
            case "bike lane":
                console.log("blllll");
                var req = document.querySelectorAll(".if-bike-lane");
                req.forEach(function (e) {
                    e.setAttribute("required", "");
                });
                break;
            case "mixed traffic":
                console.log("mx");
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
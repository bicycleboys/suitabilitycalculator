/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/calculators/blos.js":
/*!*********************************!*\
  !*** ./src/calculators/blos.js ***!
  \*********************************/
/*! exports provided: calculate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculate\", function() { return calculate; });\nfunction calculate(o) {\n    let wosstar; //$w_{os}^*$, adjusted width of shoulder\n    let wt; //$W_{t}$, space available for bikes\n    let wv;\n    let we;\n    let phva;\n    let sra;\n    let vma;\n    let blos;\n    if (o.curb) wosstar = Math.max(0.0, o.wos - 1.5);\n    else wosstar = o.wos;\n    if (o.ppk = 0.0) wt = o.wol + o.wbl + wosstar;\n    else wt = o.wol + o.wbl;\n    if (o.devided || o.vm > 160) wv = wt;\n    else wv = wt * (2 - .005 * o.vm);\n    if (o.wbl + wosstar < 4.0) we = Math.max(wv - (10 * o.ppk), 0.0);\n    else we = Math.max(wv + o.wbl + wosstar - (20 * o.ppk), 0.0);\n    if ((o.vm * (1 - .001 * o.phv) < 200.0) && o.phv > 50.0) phva = 50.0;\n    else phva = o.phv;\n    sra = Math.max(21, o.sr);\n    vma = Math.max(o.vm, 4 * o.laneCount);\n    blos = .760 + (-.005 * Math.pow(we, 2)) + (.507 * Math.log(vma / (4 * o.laneCount))) +\n        (.199 * (1.1199 * Math.log(sra - 20) + .8103) * (1 + .1038 * Math.pow(phva, 2))) +\n        (7.066 / Math.pow(o.pc, 2));\n\n\n    let grade;\n    if(blos<=2){\n        grade=\"A\"\n    }else if(blos<=2.75){\n        grade=\"B\"\n    }else if(blos<=3.5){\n        grade=\"C\"\n    }else if(blos<=4.25){\n        grade=\"D\"\n    }else if(blos<=5){\n        grade=\"E\"\n    }else grade=\"F\"\n    return {points:blos, grade: grade};\n}\n\n//# sourceURL=webpack:///./src/calculators/blos.js?");

/***/ }),

/***/ "./src/calculators/lts.js":
/*!********************************!*\
  !*** ./src/calculators/lts.js ***!
  \********************************/
/*! exports provided: calculate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculate\", function() { return calculate; });\n//Level of Traffic Stress calculator\n//Using level of traffic stress calculations from Peter Furth at http://www.northeastern.edu/peter.furth/research/level-of-traffic-stress/\n\n\n/**\n * Calculates the Level of Traffic Stress of a particular segment\n * @param {SegmentDataObject} obj Object containing information on a road segment\n * @returns {grade:string, points:number} grade as a letter grade and a numerical value\n */\nfunction calculate(obj) {\n  //we expect obj to have fields for calculation\n  //in this case, that's segmentType, right turn lane, lanecount, laneadjacent, lanewidth/parking&lanewidth, speed, blockagefreqency, markedCenterLines, ADT\n  if (!obj.hasOwnProperty('segmentType')) {\n    console.log(obj);\n    throw Error(\"Invalid argument, needs segment type\");\n  }\n\n  var grade, points;\n\n  switch (obj.segmentType) { // TODO: Should really be enums or something\n    case 'stand-alone':\n    case 'segregated':\n      points = 1;\n      break;\n    case 'bike lane':\n      points = bikeLaneCalculate(obj);\n      break;\n    case 'mixed traffic':\n      points = mixedTrafficCalculate(obj);\n      break;\n    default:\n      throw Error(\"improper segment type\");\n  }\n\n  switch (points) { //semi-arbitrarily defined letter grades to match style of other calculators\n    case 1: grade = 'A'; break;\n    case 2: grade = 'B'; break;\n    case 3: grade = 'D'; break;\n    case 4: grade = 'F'; break;\n    default: throw Error(\"points is invalid: \"+points);\n  }\n  return { grade: grade, points: points };\n\n}\n\nfunction bikeLaneCalculate(o) {\n  let lanesLTS;\n  let widthLTS;\n  let speedLTS;\n  let blockageLTS;\n  if (o.lanesAdjacent) {\n    {//Lanes LTS block\n      if (o.laneCount < 2) lanesLTS = 1;\n      else lanesLTS = 3;\n    }\n    { //Width LTS block\n      if (o.lanesCombinedWidth >= 15) widthLTS = 1;\n      else if (o.lanesCombinedWidth > 13.5) widthLTS = 2;\n      else widthLTS = 3;\n    }\n    { //Speed LTS block\n      if (o.speed <= 25) speedLTS = 1;\n      else if (o.speed < 35) speedLTS = 2;\n      else if (o.speed < 40) speedLTS = 3;\n      else speedLTS = 4;\n    }\n  } else {\n    { //Lanes LTS block\n      if (o.laneCount == 1) lanesLTS = 1;\n      else if (o.laneCount == 2) {\n        if (o.median) lanesLTS = 2;\n        else lanesLTS = 3;\n      } else lanesLTS = 3;\n    }\n    { //Width LTS block\n      if (o.laneWidth >= 6) widthLTS = 1;\n      else widthLTS = 2;\n    }\n    { //Speed LTS block\n      if (o.speed <= 30) speedLTS = 1;\n      else if (o.speed < 40) speedLTS = 3;\n      else speedLTS = 4;\n    }\n  }\n\n  switch(o.blockage){\n    case 'rarely':\n      blockageLTS = 1;\n      break;\n    case 'frequently':\n      blockageLTS = 3;\n      break;\n    default:\n      throw Error(\"invalid blockage, must be \\'rarely\\' or \\'frequently\\'\")\n  }\n\n  const p = Math.max(lanesLTS, widthLTS, speedLTS, blockageLTS);\n  return p;\n}\n\nfunction mixedTrafficCalculate(o) {\n  let p;\n  if (o.totalLanes >= 6) p = 4;\n  else if (o.totalLanes > 3) {\n    if (o.speed >= 30) p = 4;\n    else p = 3;\n  } else {\n    if (o.speed >= 35) p = 4;\n    else {\n      if (o.speed == 30) p = 3;\n      else if (o.speed <= 25) p = 2;\n\n      if (!o.centerlines && (o.adt <= 3000)) {\n        p -= 1;\n      }\n    }\n  }\n  return p;\n}\n\n\n//# sourceURL=webpack:///./src/calculators/lts.js?");

/***/ }),

/***/ "./src/calculators/plos.js":
/*!*********************************!*\
  !*** ./src/calculators/plos.js ***!
  \*********************************/
/*! exports provided: calculate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculate\", function() { return calculate; });\n\n\nfunction calculate(o) {\n    let wosstar;\n    let wt;\n    let wv;\n    let w1;\n    let plos\n    if (o.curb) wosstar = Math.max(0.0, o.wos - 1.5);\n    else wosstar = o.wos;\n    if (o.ppk = 0.0) wt = o.wol + o.wbl + wosstar;\n    else wt = o.wol + o.wbl;\n    if (o.devided || o.vm > 160) wv = wt;\n    else wv = wt * (2 - .005 * o.vm);\n    if (o.ppk < .25 || o.parkingStriped) w1 = o.wbl + wosstar;\n    else w1 = 10.0;\n    plos = 6.0468 + (-1.2276 * Math.log(wv + .5 * w1 + 50 * o.ppk + o.wbuf * o.fb + o.waa * (6.0 - .3 * o.waa))) +\n        (.0091 * o.vm / (4 * o.laneCount)) + (4 * Math.pow(o.sr / 100, 2));\n\n    let grade;\n    if(plos<=2){\n        grade=\"A\"\n    }else if(plos<=2.75){\n        grade=\"B\"\n    }else if(plos<=3.5){\n        grade=\"C\"\n    }else if(plos<=4.25){\n        grade=\"D\"\n    }else if(plos<=5){\n        grade=\"E\"\n    }else grade=\"F\"\n    return {points:plos, grade: grade};\n}\n\n//# sourceURL=webpack:///./src/calculators/plos.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _calculators_lts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculators/lts.js */ \"./src/calculators/lts.js\");\n/* harmony import */ var _calculators_blos_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculators/blos.js */ \"./src/calculators/blos.js\");\n/* harmony import */ var _calculators_plos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calculators/plos.js */ \"./src/calculators/plos.js\");\n\n\n\n\n/***\n * Checks form valididty and runs calculations\n */\nfunction doCalculate() {\n    if(form.reportValidity()){\n        var infoObject = gatherData(form);\n        resetForm();\n        var ltsData = _calculators_lts_js__WEBPACK_IMPORTED_MODULE_0__[\"calculate\"](infoObject);\n        var plosData = _calculators_plos_js__WEBPACK_IMPORTED_MODULE_2__[\"calculate\"](infoObject);\n        var blosData = _calculators_blos_js__WEBPACK_IMPORTED_MODULE_1__[\"calculate\"](infoObject);\n        ltsData.name=\"LTS\";\n        plosData.name = \"PLOS\";\n        blosData.name = \"BLOS\";\n        doSave(infoObject,ltsData,blosData,plosData);\n        display(ltsData);\n        display(blosData);\n        display(plosData);\n    }\n}\n/**\n * Displays the data passed in\n * @param {name:string,grade:string,points:number} data \n */\nfunction display(data){\n    //data should have a grade which is a letter and a percentage/point score\n    var grade = document.createElement(\"p\")\n    if(!data.grade){\n        throw Error(\"Cannot display \"+data.name+\" without a grade\");\n    }\n    grade.textContent = `${data.name}: ${data.grade} (${data.points})`;\n    document.body.appendChild(grade);\n}\n\nfunction doSave(infoObject, ...calculatedData){\n    //TODO implement saving\n}\n\n\n/***\n * Creates a Segment Data Object from the fields of the passed-in-form\n * @param form form to gather data from\n * @returns {SegmentDataObject} object with all info about segment\n */\nfunction gatherData(form){\n    if (form==null) throw Error(\"Invalid form passed in\");\n    let obj = {};\n    let elements = form.querySelectorAll( \"input, select, textarea\" );\n\n    for( let element of elements ) {\n        var name = element.name;\n        var value = element.value;\n        if( name ) {\n            obj[ name ] = value;\n        }\n    }\n\n    obj.lanesCombinedWidth = obj.adjacent? obj.width:NaN;\n    obj.laneWidth = obj.adjacent?NaN:obj.width;\n\n    return obj;\n}\n\n/***\n * Resets attached form (clears text values, resets dropdowns back to non-options)\n */\nfunction resetForm(){\n    form.reset();\n    type.selectedIndex = -1;\n    blockage.selectedIndex = -1;\n}\n\n/**\n * Runs once DOM has loaded\n */\ndocument.addEventListener('DOMContentLoaded', function () {\n    var type = document.getElementById(\"type\");\n    var blockage = document.getElementById(\"blockage\");\n    var submit = document.getElementById(\"submit\");\n    var form = document.getElementById(\"form\");\n\n    var lastType = false;\n    resetForm();\n    //Clear selection dropdowns so we don't accidentally record inaccurate data\n\n    type.addEventListener(\"input\", function (e) {\n        if (lastType) {\n            switch (lastType) {\n                case \"bike lane\":\n                    document.querySelectorAll(\".if-bike-lane\").forEach(function (e) {\n                        e.removeAttribute(\"required\");\n                    });\n                    break;\n                case \"mixed traffic\":\n                    document.querySelectorAll(\".if-mixed\").forEach(function (e) {\n                        e.removeAttribute(\"required\");\n                    });\n                    break;\n            }\n        }\n        lastType = type.value;\n        switch (type.value) {\n            case \"stand-alone\":\n            case \"segregated\":\n                break;\n            case \"bike lane\":\n                var req = document.querySelectorAll(\".if-bike-lane\");\n                req.forEach(function (e) {\n                    e.setAttribute(\"required\", \"\");\n                });\n                break;\n            case \"mixed traffic\":\n                var req = document.querySelectorAll(\".if-mixed\");\n                req.forEach(function (e) {\n                    e.setAttribute(\"required\", \"\");\n                });\n                break;\n        }\n    });\n\n    submit.addEventListener(\"click\", (event) => {\n        doCalculate()\n    });\n\n    //Useful for demos, can show off without having to manually input data\n    window.fill = ()=>{\n        document.getElementsByName(\"segmentName\")[0].value=\"Cramer: Park-Newberry\";\n        document.getElementsByName(\"segmentType\")[0].value=\"mixed traffic\"\n    }\n})\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });
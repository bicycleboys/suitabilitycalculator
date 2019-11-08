//Level of Traffic Stress calculator
//Using level of traffic stress calculations from Peter Furth at http://www.northeastern.edu/peter.furth/research/level-of-traffic-stress/


/**
 * Calculates the Level of Traffic Stress of a particular segment
 * @param {SegmentDataObject} obj Object containing information on a road segment
 * @returns CalculatorResponse grade as a letter grade and a numerical value or NotCalculated with name
 */
export function calculate(obj:SegmentDataObject):CalculatorResponse {
  //we expect obj to have fields for calculation
  //in this case, that's segmentType, right turn lane, lanecount, laneadjacent, lanewidth/parking&lanewidth, speed, blockagefreqency, markedCenterLines, ADT
  if(!(obj.hasOwnProperty("segmentType"))) return {name: "LTS", because: "segmentType"} //NotCalculated

  var grade: string, points: number|string;


  switch (obj.segmentType) { // TODO: Should really be enums or something
    case 'stand-alone':
    case 'segregated':
      points = 1;
      break;
    case 'bike lane':
      points = bikeLaneCalculate(obj);      
      break;
    case 'mixed traffic':
      points = mixedTrafficCalculate(obj);
      break;
    default:
      throw Error("improper segment type: "+obj.segmentType);
  }

  if (typeof(points)=='number'&&isNaN(points)) return {name:"LTS", because: ""}
  if (typeof points=='string') return {name:"LTS", because:points}

  switch (points) { //semi-arbitrarily defined letter grades to match style of other calculators
    case 1: grade = 'A'; break;
    case 2: grade = 'B'; break;
    case 3: grade = 'D'; break;
    case 4: grade = 'F'; break;
    default: throw Error("points is invalid: "+points);
  }
  return { grade: grade, points: points, name: "LTS" };

}

function bikeLaneCalculate(o:SegmentDataObject) {
  let lanesLTS: number;
  let widthLTS: number;
  let speedLTS: number;
  let blockageLTS: number;
  if (!('lanesAdjacent' in o)) return NaN;
  if (o.lanesAdjacent) {
    {//Lanes LTS block
      if(!('laneCount' in o)) return NaN;
      if (o.laneCount < 2) lanesLTS = 1;
      else lanesLTS = 3;
    }
    { //Width LTS block
      if(!('lanesCombinedWidth' in o)) return NaN;
      if (o.lanesCombinedWidth >= 15) widthLTS = 1;
      else if (o.lanesCombinedWidth > 13.5) widthLTS = 2;
      else widthLTS = 3;
    }
    { //Speed LTS block
      if(!('speed' in o)) return NaN;
      if (o.speed <= 25) speedLTS = 1;
      else if (o.speed < 35) speedLTS = 2;
      else if (o.speed < 40) speedLTS = 3;
      else speedLTS = 4;
    }
  } else {
    { //Lanes LTS block
      if(!('laneCount' in o)) return NaN;
      if (o.laneCount == 1) lanesLTS = 1;
      else if (o.laneCount == 2) {
        if(!('median' in o)) return NaN;
        if (o.median) lanesLTS = 2;
        else lanesLTS = 3;
      } else lanesLTS = 3;
    }
    { //Width LTS block
      if(!('laneWidth' in o)) return NaN;
      if (o.laneWidth >= 6) widthLTS = 1;
      else widthLTS = 2;
    }
    { //Speed LTS block
      if(!('speed' in o)) return NaN;
      if (o.speed <= 30) speedLTS = 1;
      else if (o.speed < 40) speedLTS = 3;
      else speedLTS = 4;
    }
  }

  switch(o.blockage){
    case 'rarely':
      blockageLTS = 1;
      break;
    case 'frequently':
      blockageLTS = 3;
      break;
    default:
      throw Error("invalid blockage, must be \'rarely\' or \'frequently\'")
  }

  const p = Math.max(lanesLTS, widthLTS, speedLTS, blockageLTS);
  return p;
}

function mixedTrafficCalculate(o: SegmentDataObject) {
  let p: number;
  if (!('totalLanes' in o)) return 'totalLanes';
  if (o.totalLanes >= 6) p = 4;
  else if (o.totalLanes > 3) {
    if(!('speed' in o)) return 'speed';
    if (o.speed >= 30) p = 4;
    else p = 3;
  } else {
    if(!('speed' in o)) return 'speed';
    if (o.speed >= 35) p = 4;
    else {
      if (o.speed == 30) p = 3;
      else if (o.speed <= 25) p = 2;

      if(!('centerline' in o&&'adt' in o)) return 'centerline or adt';
      if (!o.centerline && (o.adt <= 3000)) {
        p -= 1;
      }
    }
  }
  return p;
}

//Level of Traffic Stress calculator
//Using level of traffic stress calculations from Peter Furth at http://www.northeastern.edu/peter.furth/research/level-of-traffic-stress/

export function calculate(obj) {
  //we expect obj to have fields for calculation
  //in this case, that's segmentType, right turn lane, lanecount, laneadjacent, lanewidth/parking&lanewidth, speed, blockagefreqency, markedCenterLines, ADT
  if (!obj.hasOwnProperty('segmentType')) {
    console.log(obj);
    throw Error("Invalid argument, needs segment type");
  }

  var grade, points;

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
  }

  switch (points) { //semi-arbitrarily defined letter grades to match style of other calculators
    case 1: grade = 'A'; break;
    case 2: grade = 'B'; break;
    case 3: grade = 'D'; break;
    case 4: grade = 'F'; break;
    default: throw Error("points is invalid");
  }
  return { grade: grade, points: points };

}

function bikeLaneCalculate(o) {
  let lanesLTS;
  let widthLTS;
  let speedLTS;
  let blockageLTS;
  if (o.lanesAdjacent) {
    {//Lanes LTS block
      if (o.laneCount < 2) lanesLTS = 1;
      else lanesLTS = 3;
    }
    { //Width LTS block
      if (o.lanesCombinedWidth >= 15) widthLTS = 1;
      else if (o.lanesCombinedWidth > 13.5) widthLTS = 2;
      else widthLTS = 3;
    }
    { //Speed LTS block
      if (o.speed <= 25) speedLTS = 1;
      else if (o.speed < 35) speedLTS = 2;
      else if (o.speed < 40) speedLTS = 3;
      else speedLTS = 4;
    }
  } else {
    { //Lanes LTS block
      if (o.laneCount == 1) lanesLTS = 1;
      else if (o.laneCount == 2) {
        if (o.median) lanesLTS = 2;
        else lanesLTS = 3;
      } else lanesLTS = 3;
    }
    { //Width LTS block
      if (o.laneWidth >= 6) widthLTS = 1;
      else widthLTS = 2;
    }
    { //Speed LTS block
      if (o.speed <= 30) speedLTS = 1;
      else if (o.speed < 40) speedLTS = 3;
      else speedLTS = 4;
    }
  }

  if (o.blockage == 'rarely')
    blockageLTS = 1;
  else if (o.blockage == 'frequently')
    blockageLTS = 3

  const p = max(lanesLTS, widthLTS, speedLTS, blockageLTS);
  return p;
}

function mixedTrafficCalculate(o) {
  let p;
  if (o.laneCount >= 6) p = 4;
  else if (o.laneCount > 3) {
    if (o.speed >= 30) p = 4;
    else p = 3;
  } else {
    if (o.speed >= 35) p = 4;
    else {
      if (o.speed == 30) p = 3;
      else if (o.speed <= 25) p = 2;

      if (!o.centerlines && (o.adt <= 3000)) {
        p -= 1;
      }
    }
  }
  return p;
}

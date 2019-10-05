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
      grade = 'A';
      points = 1;
      break;
    case 'bike lane':
      [grade,points] = bikeLaneCalculate(obj);
      break;
    case 'mixed traffic':
      [grade,points] = mixedTrafficCalculate(obj);
      break;
  }

  return { grade: grade, points: points };

}

function bikeLaneCalculate(o){
  return ['B',2];
}

function mixedTrafficCalculate(o){
  return ['C',3];
}

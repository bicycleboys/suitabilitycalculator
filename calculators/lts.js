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
    default:
      throw Error("improper segment type");
  }

  switch (points) { //semi-arbitrarily defined letter grades to match style of other calculators
    case 1: grade = 'A'; break;
    case 2: grade = 'B'; break;
    case 3: grade = 'D'; break;
    case 4: grade = 'F'; break;
    default: throw Error("points is invalid: "+points);
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

  console.log(lanesLTS, widthLTS, speedLTS, blockageLTS);
  const p = Math.max(lanesLTS, widthLTS, speedLTS, blockageLTS);
  return p;
}

function mixedTrafficCalculate(o) {
  let p;
  if (o.totalLanes >= 6) p = 4;
  else if (o.totalLanes > 3) {
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

//putting this here because I don't know where else to put it
fucntion bicycleLevelOfService(o){
  let wosstar; //$w_{os}^*$, adjusted width of shoulder
  let wt; //$W_{t}$, space available for bikes
  let wv;
  let we;
  let phva;
  let sra;
  let vma;
  let blos;
  if (o.curb) wosstar = max(0.0, o.wos-1.5);
  else wosstar = o.wos;
  if(o.ppk = 0.0) wt = o.wol + o.wbl + wosstar;
  else wt = o.wol + o.wbl;
  if(o.devided || o.vm > 160) wv = wt;
  else wv = wt * (2 - .005 * o.vm);
  if(o.wbl + wosstar < 4.0) we = Math.max(wv-(10*o.ppk),0.0);
  else we = Math.max(wv + o.wbl + wosstar - (20*o.ppk), 0.0);
  if((o.vm*(1-.001*o.phv) < 200.0) && o.phv > 50.0) phva = 50.0;
  else phva = o.phv;
  sra = Math.max(21, o.sr);
  vma = Math.max(o.vm, 4*o.laneCount);
  blos = .760 + (-.005*Math.pow(we, 2)) + (.507*Math.ln(vma/(4*o.laneCount))) +
  (.199*(1.1199*Math.ln(sra - 20) + .8103)*(1+.1038* Math.pow(phva, 2))) +
  (7.066/Math.pow(o.pc, 2));
  return blos;
}

function pedestrianLevelOfService(o){
  let wosstar;
  let wt;
  let wv;
  let w1;
  let plos
  if (o.curb) wosstar = max(0.0, o.wos-1.5);
  else wosstar = o.wos;
  if(o.ppk = 0.0) wt = o.wol + o.wbl + wosstar;
  else wt = o.wol + o.wbl;
  if(o.devided || o.vm > 160) wv = wt;
  else wv = wt * (2 - .005 * o.vm);
  if(o.ppk < .25 || o.parkingStriped) w1 = o.wbl + wosstar;
  else w1 = 10.0;
  plos = 6.0468 + (-1.2276 * Math.ln(wv + .5 * w1 + 50 * o.ppk + o.wbuf * o.fb + o.waa * (6.0 - .3 * o.waa))) +
  (.0091* o.vm/(4*o.laneCount)) + (4*Math.pow(o.sr/100, 2));
  return plos;

}

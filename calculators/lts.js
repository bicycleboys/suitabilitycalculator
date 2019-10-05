export function calculate(obj){
  console.log("we calculting bois");
  //we expect obj to have fields for calculation
  //in this case, that's Segment type, right turn lane, lanecount, laneadjacent, lanewidth/parking&lanewidth, speed, blockagefreqency, markedCenterLines, ADT
  if(!obj.hasOwnProperty('segmentType')){
    console.log(obj);
    throw new Error("Invalid argument, needs segment type");
  }

  switch(obj.segmentType){ // TODO: Should really be enums or something
    case '':break;
  }

}

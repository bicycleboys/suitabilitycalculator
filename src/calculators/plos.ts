

export function calculate(o:SegmentDataObject):CalculatorResponse {
    let wosstar;
    let wt;
    let wv;
    let w1;
    let plos;
    let vm;
    let fb;
    let ppk=o.ppk/100;
    if(o.fb) fb = 5.37;
    else fb = 1;
    vm = o.adt/20
    if (o.curb) wosstar = Math.max(0.0, o.wos - 1.5);
    else wosstar = o.wos;
    if (ppk == 0.0) wt = o.wol + o.wbl + wosstar;
    else wt = o.wol + o.wbl;
    if (o.median || vm > 160) wv = wt;
    else wv = wt * (2 - .005 * vm);
    if (ppk < .25 || o.parkingStriped) w1 = o.wbl + wosstar;
    else w1 = 10.0;
    let fsw = (6.0 - .3 * o.waa)
    let fw = (-1.2276 * Math.log(wv + (.5 * w1) + (50 * ppk) + (o.wbuf * fb) + (o.waa * fsw)));
    let fv = (.0091 * vm / (4 * o.laneCount));
    let fs = (4 * Math.pow(o.runningSpeed / 100, 2));
    plos = 6.0468 + fw + fv + fs;
    plos = plos.toFixed(2);
    plos = parseFloat(plos);

    if(isNaN(plos)){
        return {name: "PLOS", because: ""}
    }

    let grade;
    if(plos<=2){
        grade="A"
    }else if(plos<=2.75){
        grade="B"
    }else if(plos<=3.5){
        grade="C"
    }else if(plos<=4.25){
        grade="D"
    }else if(plos<=5){
        grade="E"
    }else grade="F"
    return {points:plos, grade: grade, name: "PLOS"};
}

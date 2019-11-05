export function calculate(o:SegmentDataObject):SegmentGrade {
    let wosstar; //$w_{os}^*$, adjusted width of shoulder
    let wt; //$W_{t}$, space available for bikes
    let wv;
    let we;
    let phva;
    let sra;
    let vma;
    let blos;
    let vm;
    let appk;
    let c1, c2, c3, c4;
    let ppk = o.ppk/100;
    vm = o.adt / 20;
    if (o.curb) wosstar = Math.max(0.0, o.wos - 1.5);
    else wosstar = o.wos;
    if (ppk == 0.0) wt = o.wol + o.wbl + wosstar;
    else wt = o.wol + o.wbl;
    if (o.devided || vm > 160) wv = wt;
    else wv = wt * (2 - .005 * vm);
    if (o.wbl + o.wos < 4.0) we = Math.max(wv - (10 * ppk), 0.0);
    else we = Math.max(wv + o.wbl + o.wos - (20 * ppk), 0.0);
    if ((vm * (1 - .001 * o.phv) < 200.0) && o.phv > 50.0) phva = 50.0;
    else phva = o.phv;
    sra = Math.max(21, o.runningSpeed);
    vma = Math.max(vm, 4 * o.laneCount);
    c1 = (-.005 * Math.pow(we, 2));
    c2 = (.507 * Math.log(vma / (4 * o.laneCount)));
    c3 = (.199 * (1.1199 * Math.log(sra - 20) + .8103) * (Math.pow(1 + .1038 *phva, 2)));
    c4 = (7.066 / Math.pow(o.pc, 2));
    blos = ((.760) + c1 + c2 +c3 +c4).toFixed(2);
    blos = parseFloat(blos);

    let grade;
    if(blos<=2){
        grade="A"
    }else if(blos<=2.75){
        grade="B"
    }else if(blos<=3.5){
        grade="C"
    }else if(blos<=4.25){
        grade="D"
    }else if(blos<=5){
        grade="E"
    }else grade="F"
    return {points:blos, grade: grade, name: "BLOS"};
}

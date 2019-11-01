export function calculate(o:SegmentDataObject):SegmentGrade {
    let wosstar; //$w_{os}^*$, adjusted width of shoulder
    let wt; //$W_{t}$, space available for bikes
    let wv;
    let we;
    let phva;
    let sra;
    let vma;
    let blos;
    if (o.curb) wosstar = Math.max(0.0, o.wos - 1.5);
    else wosstar = o.wos;
    if (o.ppk = 0.0) wt = o.wol + o.wbl + wosstar;
    else wt = o.wol + o.wbl;
    if (o.devided || o.vm > 160) wv = wt;
    else wv = wt * (2 - .005 * o.vm);
    if (o.wbl + wosstar < 4.0) we = Math.max(wv - (10 * o.ppk), 0.0);
    else we = Math.max(wv + o.wbl + wosstar - (20 * o.ppk), 0.0);
    if ((o.vm * (1 - .001 * o.phv) < 200.0) && o.phv > 50.0) phva = 50.0;
    else phva = o.phv;
    sra = Math.max(21, o.sr);
    vma = Math.max(o.vm, 4 * o.laneCount);
    blos = .760 + (-.005 * Math.pow(we, 2)) + (.507 * Math.log(vma / (4 * o.laneCount))) +
        (.199 * (1.1199 * Math.log(sra - 20) + .8103) * (1 + .1038 * Math.pow(phva, 2))) +
        (7.066 / Math.pow(o.pc, 2));


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
    return {points:blos, grade: grade, name: blos};
}
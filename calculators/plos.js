

export function calculate(o) {
    let wosstar;
    let wt;
    let wv;
    let w1;
    let plos
    if (o.curb) wosstar = Math.max(0.0, o.wos - 1.5);
    else wosstar = o.wos;
    if (o.ppk = 0.0) wt = o.wol + o.wbl + wosstar;
    else wt = o.wol + o.wbl;
    if (o.devided || o.vm > 160) wv = wt;
    else wv = wt * (2 - .005 * o.vm);
    if (o.ppk < .25 || o.parkingStriped) w1 = o.wbl + wosstar;
    else w1 = 10.0;
    plos = 6.0468 + (-1.2276 * Math.log(wv + .5 * w1 + 50 * o.ppk + o.wbuf * o.fb + o.waa * (6.0 - .3 * o.waa))) +
        (.0091 * o.vm / (4 * o.laneCount)) + (4 * Math.pow(o.sr / 100, 2));
    return {points:plos, grade: "GRADE NOT IMPLEMENTED"};
}
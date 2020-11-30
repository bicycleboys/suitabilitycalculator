export function calculate(o: SegmentDataObject): CalculatorResponse {
    let properties: NotCalculated | null = requireProperties(o, 'adt', 'ppk', 'curb', 'wos', 'wol', 'median', 'wbl', 'wos', 'runningSpeed', 'laneCount', 'phv', 'pc')
    if (properties != null) return properties;
    let wv;
    let we;
    let phva;
    let sra;
    let vma;
    let blos;
    let appk;
    let c1, c2, c3, c4;
    let ppk = o.ppk / 100;

    const vm = o.adt / 20;

    const wosstar = (o.curb) ? Math.max(0.0, o.wos - 1.5) : o.wos; //$w_{os}^*$, adjusted width of shoulder

    const wt = (ppk == 0.0) ? o.wol + o.wbl + wosstar : o.wol + o.wbl; //$W_{t}$, space available for bikes
    if (o.median || vm > 160) wv = wt;
    else wv = wt * (2 - .005 * vm);
    if (o.wbl + o.wos < 4.0) we = Math.max(wv - (10 * ppk), 0.0);
    else we = Math.max(wv + o.wbl + o.wos - (20 * ppk), 0.0);
    if ((vm * (1 - .001 * o.phv) < 200.0) && o.phv > 50.0) phva = 50.0;
    else phva = o.phv;
    sra = Math.max(21, o.runningSpeed);
    vma = Math.max(vm, 4 * o.laneCount);
    c1 = (-.005 * Math.pow(we, 2));
    c2 = (.507 * Math.log(vma / (4 * o.laneCount)));
    c3 = (.199 * (1.1199 * Math.log(sra - 20) + .8103) * (Math.pow(1 + .1038 * phva, 2)));
    c4 = (7.066 / Math.pow(o.pc, 2));
    blos = ((.760) + c1 + c2 + c3 + c4).toFixed(2);
    blos = parseFloat(blos);

    if (isNaN(blos)) {
        return { name: "BLOS", because: "" }
    }

    let grade;
    if (blos <= 2) {
        grade = "A"
    } else if (blos <= 2.75) {
        grade = "B"
    } else if (blos <= 3.5) {
        grade = "C"
    } else if (blos <= 4.25) {
        grade = "D"
    } else if (blos <= 5) {
        grade = "E"
    } else grade = "F"

    return { points: blos, grade: grade, name: "BLOS" };
}

function requireProperties(o: Object, ...properties: string[]): NotCalculated | null {
    for (var p of properties) {
        if (!(p in o))
            return { name: "BLOS", because: p }
    }
    return null;
}

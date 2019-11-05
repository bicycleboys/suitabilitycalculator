interface SegmentGrade{
    points: number
    grade: string
    name: string
}

interface NotCalculated{
    name: string
}

type CalculatorResponse = SegmentGrade|NotCalculated;

interface SegmentDataObject{
    parkingStriped?: boolean;
    wbuf?: any;
    fb?: any;
    waa?: number;
    totalLanes?: number;
    centerlines?: boolean;
    adt?: number;
    lanesAdjacent?: any;
    lanesCombinedWidth?: number;
    speed?: number;
    median?: any;
    laneWidth?: number;
    blockage?: any;
    segmentType?: any;
    curb?: any;
    wos?: number;
    ppk?: number;
    wol?: any;
    wbl?: any;
    devided?: boolean;
    vm?: number;
    phv?: number;
    runningSpeed?: any;
    laneCount?: number;
    pc?:number;
    name: string
}

interface Calculator{
    calculate(o:SegmentDataObject):CalculatorResponse;
}

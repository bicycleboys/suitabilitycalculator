interface SegmentGrade{
    points: number
    grade: string
    name: string
}

interface NotCalculated{
    name: string;
    because: string;
}

type CalculatorResponse = SegmentGrade|NotCalculated;

interface SegmentDataObject{
    parkingStriped?: boolean;
    wbuf?: any;
    fb?: any;
    waa?: number;
    totalLanes?: number;
    centerline?: boolean;
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
    //devided?: boolean; now median
    vm?: number;
    phv?: number;
    runningSpeed?: any;
    laneCount?: number;
    pc?:number;
    island?: boolean;
    unsignalized?: boolean;
    xStreetWidth?: number;
    squeezed?: boolean; //If cyclists are between driving lane and right turn lane at intersection approach
    turningSpeed?: number;
    RLCount?: number; //count of right turn lanes
    laneShift?: string;
    RLLength?:number;
    segmentName: string
}

interface Calculator{
    calculate(o:SegmentDataObject):CalculatorResponse;
}

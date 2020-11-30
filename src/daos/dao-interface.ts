interface Dao{
    add(data:SegmentDataObject, scores: CalculatorResponse[]):Promise<key>;
    remove(key:any):void
    getList():Promise<DaoOutput[]>
    getInfo(key: any):Promise<{key:any, data: SegmentDataObject, scores: CalculatorResponse[]}>
}

type key= string;

interface DaoOutput{
    key:any,
    SegmentDataObject: SegmentDataObject,
    Scores: CalculatorResponse[],
    Timestamp: {nanoseconds: number, seconds: number}
}
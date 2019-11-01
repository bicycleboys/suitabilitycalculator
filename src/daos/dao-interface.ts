interface Dao{
    add(data:SegmentDataObject, scores: CalculatorResponse[]):void;
    remove(key:any):void
    getList():Promise<{key:any, data: SegmentDataObject, scores: CalculatorResponse[]}[]>
    getInfo(key: any):Promise<{key:any, data: SegmentDataObject, scores: CalculatorResponse[]}>
}
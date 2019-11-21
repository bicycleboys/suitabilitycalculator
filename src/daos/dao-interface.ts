interface Dao{
    add(data:SegmentDataObject, scores: CalculatorResponse[]):Promise<key>;
    remove(key:any):void
    getList():Promise<{key:any, data: SegmentDataObject, scores: CalculatorResponse[]}[]>
    getInfo(key: any):Promise<{key:any, data: SegmentDataObject, scores: CalculatorResponse[]}>
}

type key= string;
interface Dao{
    add(data:SegmentDataObject, scores: CalculatorResponse[]):Promise<any>;
    remove(key:any):void
    getList():Promise<{key:any, data: SegmentDataObject, scores: CalculatorResponse[], lastModified: Date}[]>
    getInfo(key: any):Promise<{key:any, data: SegmentDataObject, scores: CalculatorResponse[], lastModified: Date}>
}
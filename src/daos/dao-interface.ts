interface Dao{
    add(data:SegmentDataObject, scores: SegmentGrade[]):void;
    remove(key:any):void
    getList():Promise<{key:any, data: SegmentDataObject, scores: SegmentGrade[]}[]>
    getInfo(key: any):Promise<{key:any, data: SegmentDataObject, scores: SegmentGrade[]}>
}
import {openDB, DBSchema, IDBPDatabase} from 'idb'

interface MyDB extends DBSchema {
    'segments': {
      key: number;
      value: {
          data: SegmentDataObject;
          scores: CalculatorResponse[];
      };
    };
  }

/***
 * Data Access Object for indexedDB
 */
export class IDBDao implements Dao{
    dbPromise:Promise<IDBPDatabase<MyDB>>;

    constructor(){
        if(typeof window.indexedDB == 'undefined'){
            throw Error("Your environment doesn't support IndexedDB");
        }
        
        this.dbPromise = openDB<MyDB>("Segment Data",2,{
            upgrade(db,oldVersion,newVersion,transaction){
                if(oldVersion==2&&newVersion==3){
                    db.clear("segments").then(()=>
                    db.createObjectStore("segments",{autoIncrement: true}))
                }
            },
            blocked(){
                console.log("Please close all other tabs with this site open!");
            },
            blocking(){}
        });
    }

    async add(data: SegmentDataObject, scores: CalculatorResponse[]): Promise<any> {
        return (await this.dbPromise.then(d=>d.put("segments",{data,scores})))
    }

    async getList(){
        return (await this.dbPromise).getAll("segments");
    }

    async getInfo(key:any){
        try{
            let res = (await this.dbPromise).get("segments",key);
            res.then(e=>((e as any)['key']=key));
        }catch(error){
            throw Error("Invalid Key")
        }
    }

    remove(key: any): void {
        throw new Error("Method not implemented.");
    }
}
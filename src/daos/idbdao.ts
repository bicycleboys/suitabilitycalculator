import {openDB, DBSchema, IDBPDatabase} from 'idb'
import { numberLiteralTypeAnnotation } from '@babel/types';

interface MyDB extends DBSchema {
    'segments': {
      key: number;
      value: {
          key?: number;
          data: SegmentDataObject;
          scores: CalculatorResponse[];
          lastModified: Date;
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
                    db.createObjectStore("segments",{autoIncrement: true, keyPath: 'key'}))
                }else{
                    db.createObjectStore("segments",{autoIncrement: true, keyPath: 'key'})
                }
            },
            blocked(){
                console.log("Please close all other tabs with this site open!");
            },
            blocking(){}
        });
    }

    async add(data: SegmentDataObject, scores: CalculatorResponse[]): Promise<any> {
        let dt: Date = new Date();
        return (await this.dbPromise.then(d=>d.put("segments",{data,scores, lastModified:dt})))
    }

    async getList(){
        return (await this.dbPromise).getAll("segments") as unknown as Promise<{key:any, data:SegmentDataObject, scores:CalculatorResponse[], lastModified: Date}[]>;
    }

    async getInfo(key:any){
        try{
            return (await this.dbPromise).get("segments",key) as unknown as Promise<{key:any, data:SegmentDataObject, scores:CalculatorResponse[], lastModified:Date}>;
        }catch(error){
            throw Error("Invalid Key")
        }
    }

    remove(key: any): void {
        this.dbPromise.then(e=>e.delete("segments",key))
    }
}
import {IDBDao} from './idbdao.js'

document.addEventListener("DOMContentLoaded",()=>{
    let myDao = new IDBDao();

    document.getElementById("resultsButton").addEventListener("click",()=>{
        myDao.getList().then((e)=>console.log(e));
    }
    )
})
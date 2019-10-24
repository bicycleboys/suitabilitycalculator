import {IDBDao} from './daos/idbdao.js'

document.addEventListener("DOMContentLoaded",()=>{
    let myDao = new IDBDao();

    let table = document.createElement("table");
    myDao.getList().then((e)=>{
        for (let data of e){
            console.log(data);
            addPopulatedRow(table, data.segmentName, pointsDataToString(data.pointsData[0]), pointsDataToString(data.pointsData[1]),pointsDataToString(data.pointsData[2]), makeEditButton(data))
        }
    });
    document.body.appendChild(table);
})

/**
 * Turn points data into a readable string
 * @param {name,grade,points} pointsData data stored about points assigned to a particular segment by a particular calculator
 */
function pointsDataToString(pointsData){
    return `${pointsData.name}: ${pointsData.points}, ${pointsData.grade}`
}

/**
 * Add an arbitrary number of elements into a table row, and add that table row onto the specified table
 * @param {HTMLTableElement} table Table to add row to
 * @param  {...any} data information to be added into the table, can be HTMLElement or string
 */
function addPopulatedRow(table, ...data){
    const r = table.insertRow();
    for (let d of data){
        const c = r.insertCell();
        if (typeof d == "string"){
            c.innerText = d;
        }else if(typeof d == 'object'){
            c.innerHTML = d.outerHTML;
        }else {
            console.log(Object.getPrototypeOf(Object.getPrototypeOf(d)))
            throw Error(`${typeof d} not a valid parameter type`);
        }
    }
    return r;
}

/**
 * Create a button linking to an edit page for a particular segment
 * @param {SegmentData} data information about the segment, used to get the identifier the edit button should link to
 */
function makeEditButton(data){
    const edit = document.createElement('a');
    edit.href = '#'
    edit.innerText = "Edit (not implemented)"
    //TODO
    return edit;
}
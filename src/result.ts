import {FBDao, documentElement} from './daos/fbdao';
import "./styles.css";
import { scoreToDiv } from './calculators/calculatorUtils';

var dao:FBDao;

function fillPage(data:documentElement){
    fillName(data.SegmentDataObject.segmentName);
    fillScores(data.Scores);
    addTime(data.Timestamp);
}

function fillScores(scores: CalculatorResponse[]){
    const scoreDiv = document.getElementById("scores");
    scoreDiv.innerHTML = "";
    for(let s of scores){
        scoreDiv.appendChild(scoreToDiv(s));
    }
}

function addTime(timestamp:any){
    const timeDiv = document.getElementById("timestamp");
    timeDiv.innerHTML = "<p> Logged:  "+timestamp.toDate()+"</p>";
}

function fillName(name: string){
    const nameDiv = document.getElementById("segmentName")
    nameDiv.innerText = name;
}


function scoreIsNotCalculated(score: CalculatorResponse):score is NotCalculated{
    return "because" in score
}

function setKey(k:any){
    var key = k
    if(dao==null)
        dao=new FBDao();
    let element = dao.getElementById(k);
    element.then(res=>{
        fillPage(res);
    }).catch(err=>{
        console.log(err)
        let p = document.createElement("p");
        p.innerText = "That's a fake id!\n"
        document.body.appendChild(p);
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const search = window.location.search.slice(1);
    setKey(search);

    (window as any).setKey = setKey;
})
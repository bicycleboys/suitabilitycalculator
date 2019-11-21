import {FBDao, documentElement} from './daos/fbdao';
import { domainToASCII } from 'url';

var dao:FBDao;

function fillPage(data:documentElement){
    fillScores(data.scores);
}

function fillScores(scores: CalculatorResponse[]){
    const scoreDiv = document.getElementById("scores");
    scoreDiv.innerHTML = "";
    for(let s of scores){
        const scoreBox = document.createElement("div")
        const name = document.createElement("h2")
        name.innerHTML = s.name;
        scoreBox.appendChild(name)
        
        if(scoreIsNotCalculated(s)){
            const no = document.createElement("h5")
            no.innerHTML = "Not Calculated";
            scoreBox.appendChild(no)
        }else{

        }
        scoreDiv.appendChild(scoreBox);
    }
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
        console.log(res);
    }).catch(err=>{
        console.log(err)
        let p = document.createElement("p");
        p.innerText = "That's a fake id!\n"
        document.appendChild(p);
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const path = window.decodeURIComponent(window.location.pathname);
    const page = path === '/' ? 'view1' : path.slice(1);
    console.log(page);

    (window as any).setKey = setKey;
})
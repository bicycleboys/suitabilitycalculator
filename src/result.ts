import {FBDao, documentElement} from './daos/fbdao';
import "./styles.css";

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
        const scoreBox = document.createElement("div")
        scoreBox.className = "scoreBox "
        const name = document.createElement("h2")
        name.innerHTML = s.name;
        const infoLink = document.createElement("a")
        infoLink.href="./"+s.name+".html"
        infoLink.innerText = "🛈";
        name.appendChild(infoLink);

        console.log(name)

        scoreBox.appendChild(name)
        
        if(scoreIsNotCalculated(s)){
            const no = document.createElement("h5")
            no.innerHTML = "Not Calculated";
            scoreBox.appendChild(no)
        }else{
            const grade = document.createElement("h5");
            grade.id = "grade"
            grade.innerText = "Grade: "+s.grade;
            scoreBox.appendChild(grade);
            const points = document.createElement("h5");
            points.id = "points"
            points.innerText = "Points: "+s.points;
            scoreBox.appendChild(points);
            
            scoreBox.className = scoreBox.className+" "+s.grade;
        }
        scoreDiv.appendChild(scoreBox);
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
    const path = window.decodeURIComponent(window.location.pathname);
    const page = path === '/' ? 'view1' : path.slice(1);
    console.log(page);

    (window as any).setKey = setKey;
})
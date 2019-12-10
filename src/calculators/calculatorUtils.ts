export function scoreToDiv(score: CalculatorResponse) {
    const scoreBox = document.createElement("div")
    scoreBox.className = "scoreBox "
    const name = document.createElement("h2")
    name.innerHTML = score.name;
    const infoLink = document.createElement("a")
    infoLink.href = "./" + score.name + ".html"
    infoLink.innerText = "ⓘ";
    name.appendChild(infoLink);

    scoreBox.appendChild(name)

    if (scoreIsNotCalculated(score)) {
        const no = document.createElement("h5")
        no.innerHTML = "Not Calculated";
        scoreBox.appendChild(no)
    } else {
        const grade = document.createElement("h5");
        grade.id = "grade"
        grade.innerText = "Grade: " + score.grade;
        scoreBox.appendChild(grade);
        const points = document.createElement("h5");
        points.id = "points"
        points.innerText = "Points: " + score.points;
        scoreBox.appendChild(points);

        scoreBox.className = scoreBox.className + " " + score.grade;
    }
    return scoreBox;
}


export function scoreIsNotCalculated(score: CalculatorResponse): score is NotCalculated {
    return "because" in score
}

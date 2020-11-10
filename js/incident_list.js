class IncidentList{

    constructor(d){
        this.data = d;

        //add event listener
        document.getElementById("scroll").addEventListener("input", printValue);
    }

    draw(){
        //add svg and g element
        //map rectangles
        //map text labels
        //draw rectangl
        //TODO: fill this in
    }

    update(){
        //TODO: fill this in
    }
}

let printValue = function(){
    let temp = document.getElementById("scroll").value
    console.log(temp);
}

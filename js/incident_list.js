class IncidentList{

    constructor(d){
        this.data = d;

        //add event listener
    }

    draw(){
        document.getElementById("scroll").addEventListener("input", printValue);

        let selection = d3.select(".incident_list").append("svg").attr("id", "incident-box-container")
            .attr("width", "280") 
            .attr("height", "500") 
            .attr("transform", "translate(-10, -260)"); 
            
            //use the selection to append a group of rectangles who's y position are changed based on the slider position

        let eventList = d3.select("#incident-box-container").append("g").attr("id", "incident-list");
        let rects = eventList.selectAll("rect").data(this.data[0]);

        //create the rectangles for each event
        let that = this;
        rects.join(
            enter =>
                enter
                .append("rect")
                .attr("x", "10")
                //.attr("y", "10")
                .attr("y", function(d, i){
                    return i * 45 ;
                })
                .attr("width", "260")
                .attr("height", "40")
                .attr("opacity", ".6")
                .style("fill", "steelBlue")
                .on("mouseover", function(d){
                    d3.select(this).attr("opacity", "1")
                })
                .on("mouseout", function(d){
                    d3.select(this).attr("opacity", ".6")
                })
        )

        //create the text labels for each rect
        eventList = d3.select("#incident-box-container").append("g").attr("id", "incident-list-text");
        let labels = eventList.selectAll("text").data(this.data[0])
        labels.join(
            enter =>
                enter
                .append("text")
                .attr("font-family", "sans-serif")
                .attr("font-size", "16")
                .attr("transform", function(d, i){
                    return "translate(20," + (i * 45 + 30) + ")";
                })
                .text(function(d){
                    return d.date + " id: " + d.id;
                })
        )

        let outline = d3.select("#incident-box-container").append("g").attr("id", "incident-box-left");
        //left 
        outline.append("line")
            .attr("x1", "5")
            .attr("x2", "5")
            .attr("y1", "0")
            .attr("y2", "500")
            .attr("stroke", "black")
            .attr("opacity", ".8")
            .attr("stroke-width", "4");
        //right 
        outline.append("line")
            .attr("x1", "275")
            .attr("x2", "275")
            .attr("y1", "0")
            .attr("y2", "500")
            .attr("stroke", "black")
            .attr("opacity", ".8")
            .attr("stroke-width", "4");
        //top
        outline.append("line")
            .attr("x1", "5")
            .attr("x2", "275")
            .attr("y1", "2")
            .attr("y2", "2")
            .attr("stroke", "black")
            .attr("opacity", ".8")
            .attr("stroke-width", "4");
        //bottom
        outline.append("line")
            .attr("x1", "5")
            .attr("x2", "275")
            .attr("y1", "498")
            .attr("y2", "498")
            .attr("stroke", "black")
            .attr("opacity", ".8")
            .attr("stroke-width", "4");
    }

    update(){
        //TODO: fill this in
    }
}

let printValue = function(){
    let temp = document.getElementById("scroll").value
    //console.log(temp);
}

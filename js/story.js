class Story{

    constructor(d){
        this.data = d;
    }

    draw(){
         let eventPane = d3.select(".story").append("svg").attr("id", "incident-pane")
                .attr("width", "280")
                .attr("height", "500")
                .attr("transform", "translate(16, 4)")
                //.attr("transform", "translate(-10, -260)");
         let outline = d3.select("#incident-pane").append("g").attr("id", "incident-pane-outline");
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

class IncidentList{

    constructor(d){
        //assign data
        this.data = d;
        //section data into year, and month arrys and then display to screen
        
        //store each incident in it's respectie month
        this.incidents = [];
        let date = "2013-01";

        //TODO: update on click event for the rects so that they update the story pan information box

        this.temp = []
        for(let i = 0; i < this.data[0].length; i++){
            //if the date for the event matches the month, push the data to the array
            if(this.data[0][i].date.substr(0,7) === date){
                this.temp.push(this.data[0][i])
            }
            //otherwise we're done reading that month, push it to the list and start on the new month
            else{
                this.incidents.push(this.temp)
                date = this.data[0][i].date.substr(0,7);
                this.temp = [];
            }
        }
    }

    draw(){
        document.getElementById("scroll").addEventListener("input", scrollBoxes);

        let selection = d3.select(".incident_list").append("svg").attr("id", "incident-box-container")
            .attr("width", "280") 
            .attr("height", "500") 
            .attr("transform", "translate(-10, -260)"); 
            
            //use the selection to append a group of rectangles who's y position are changed based on the slider position

        let eventList = d3.select("#incident-box-container").append("g").attr("id", "incident-list");
        //let rects = eventList.selectAll("rect").data(this.data[0]);
        let rects = eventList.selectAll("rect").data(this.incidents[0]);

        //create the rectangles for each event
        let that = this;
        rects.join(
            enter =>
                enter
                .append("rect")
                .attr("x", "10")
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
                .on("click", function(d){
                    //add text label for each value in the event's object
                    //add on click event for the text to open the event web page
                })
        )

        //create the text labels for each rect
        eventList = d3.select("#incident-box-container").append("g").attr("id", "incident-list-text");
        //let labels = eventList.selectAll("text").data(this.data[0])
        let labels = eventList.selectAll("text").data(this.incidents[0])
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

        let outline = d3.select("#incident-box-container").append("g").attr("id", "incident-box-outline");
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

let scrollBoxes = function(){
    //scroll scaling is done to scale the range (1 - 100) to the actual number of events.
    //the scaler is stored in the placeholder attribute of the scroll dom object as a hacky workaround since it's not needed for a scroll bar
    let temp = document.getElementById("scroll").value
    let scrollScale = document.getElementById("scroll").placeholder;
    console.log(scrollScale)
    d3.select("#incident-list").attr("transform", "translate(0," + (-45 * (temp/scrollScale)) + ")");//.selectAll("rect")
    d3.select("#incident-list-text").attr("transform", "translate(0," + (-45 * (temp/scrollScale)) + ")");
}

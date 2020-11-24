class IncidentList{

    constructor(d){
        //assign data
        this.data = d;
        //section data into year, and month arrys and then display to screen
        
        //store each incident in it's respectie month
        this.incidents = [];
        let date = "2013-01";

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

        //select dropdown menu and add the update function to it's event handler
        let that = this;
        document.getElementById("scroll").addEventListener("input", scrollBoxes);

        let selection = d3.select(".incident_list").append("svg").attr("id", "incident-box-container")
            .attr("width", "280") 
            .attr("height", "500") 
            .attr("transform", "translate(-10, -260)"); 
            
            //use the selection to append a group of rectangles who's y position are changed based on the slider position

        let eventList = d3.select("#incident-box-container").append("g").attr("id", "incident-list");
        let rects = eventList.selectAll("rect").data(this.incidents[12]);
        d3.select("#scroll").attr("placeholder", this.incidents[12].length);

        //create the rectangles for each event
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
                    //console.log(this.__data__)
                    d3.select("#stateData").text(this.__data__.state);
                    d3.select("#municipalityData").text(this.__data__.municipality);
                    d3.select("#addressData").text(this.__data__.address);
                    d3.select("#dateData").text(this.__data__.date);
                    d3.select("#mortalityData").text(this.__data__.deaths + " : " + this.__data__.injuries);
                    d3.select("#incidentIdData").text(this.__data__.id);
                    d3.select("#newsUrl").text(this.__data__.source);
                    d3.select("#archiveUrl").text(this.__data__.url);
                })
        )

        //create the text labels for each rect
        eventList = d3.select("#incident-box-container").append("g").attr("id", "incident-list-text");
        let labels = eventList.selectAll("text").data(this.incidents[12])
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

    storyUpdate(states){
        //TODO: finish filtering data befor making new rects
        //check the timeline for each of the following
        //fileterBy, ascending/descending, year, month
        //then join() all the rects and text labels based on that selection combination
        //don't forget to update the scroll scaler and secret tags
        //the incidents[] is an array of arrays with each index representing 1 month
        console.log(states)
        let filterBy = document.getElementById("dataFilter").value;
        let sort = document.getElementById("orderSelect").value;
        let year = document.getElementById("yearFilter").value;
        let month = document.getElementById("monthFilter").value;
    
        //then check filter criteria filterBy
        //then d3 filter that month for the states
        //then sort in ascending or descending based on the filter criteria
        //then bind that sorted data to the rects and text labels
        let index = 0;
        if(year === "2014"){index = 12}
        else if(year === "2015"){index = 24}
        else if(year === "2016"){index = 36}
        else if(year === "2017"){index = 48}
        else if(year === "2018"){index = 60};
        //find the month index
        if(month === "February"){index += 1}
        else if(month === "March"){index += 2}
        else if(month === "April"){index += 3}
        else if(month === "May"){index += 4}
        else if(month === "June"){index += 5}
        else if(month === "July"){index += 6}
        else if(month === "August"){index += 7}
        else if(month === "September"){index += 8}
        else if(month === "October"){index += 9}
        else if(month === "November"){index += 10}
        else if(month === "December"){index += 11};

        //filter out only the states that matter out of the states in the specified time range
        let newData = this.incidents[index].filter(function (d){
            return states.has(d.state);
        })
        //now sort by one of the following, alphabetical by state name, municipality name, 
            //number of deaths, number of injuries, and event date

        //bind all the data and update shit
      let rects = d3.select("#incident-list").selectAll("rect").data(newData); 
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
                    //console.log(this.__data__)
                    d3.select("#stateData").text(this.__data__.state);
                    d3.select("#municipalityData").text(this.__data__.municipality);
                    d3.select("#addressData").text(this.__data__.address);
                    d3.select("#dateData").text(this.__data__.date);
                    d3.select("#mortalityData").text(this.__data__.deaths + " : " + this.__data__.injuries);
                    d3.select("#incidentIdData").text(this.__data__.id);
                    d3.select("#newsUrl").text(this.__data__.source);
                    d3.select("#archiveUrl").text(this.__data__.url);
                }),
             update =>
                update
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
                    //console.log(this.__data__)
                    d3.select("#stateData").text(this.__data__.state);
                    d3.select("#municipalityData").text(this.__data__.municipality);
                    d3.select("#addressData").text(this.__data__.address);
                    d3.select("#dateData").text(this.__data__.date);
                    d3.select("#mortalityData").text(this.__data__.deaths + " : " + this.__data__.injuries);
                    d3.select("#incidentIdData").text(this.__data__.id);
                    d3.select("#newsUrl").text(this.__data__.source);
                    d3.select("#archiveUrl").text(this.__data__.url);
                }),
             exit => exit.remove()
        );
        //update the placeholder for scrolling purposes
        d3.select("#scroll").attr("placeholder", newData.length);

        let labels = d3.select("#incident-list-text").selectAll("text").data(newData)
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
                }),
            update =>
                update
                .attr("font-family", "sans-serif")
                .attr("font-size", "16")
                .attr("transform", function(d, i){
                    return "translate(20," + (i * 45 + 30) + ")";
                })
                .text(function(d){
                    return d.date + " id: " + d.id;
                }),
            exit => exit.remove()
        )
}

}



let scrollBoxes = function(){
    //scroll scaling is done to scale the range (1 - 100) to the actual number of events.
    //the scaler is stored in the placeholder attribute of the scroll dom object as a hacky workaround since it's not needed for a scroll bar
    let temp = document.getElementById("scroll").value
    let scrollScale = document.getElementById("scroll").placeholder;
    //console.log(scrollScale)
    d3.select("#incident-list").attr("transform", "translate(0,"  +(-45 * temp * (scrollScale / 100)) + ")");//.selectAll("rect")
    d3.select("#incident-list-text").attr("transform", "translate(0," +(-45 * temp * (scrollScale / 100)) + ")");
}

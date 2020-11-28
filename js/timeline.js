class Timeline{

    constructor(d){
        this.data = d;
        //get min and max violence rate
        this.ratios = [];
        this.currentStates = []; 
        this.colors = ["#b32222", "#22b39b", "#7b22b3", "#b322a0", "#b37222"];
    }

    //performs first time setup of the timeline
    draw(){

        let globalRate = []
        //the default date
        let date = "2013-01";
        let counter = 0

        //for every event
        for(let i = 0; i < this.data[0].length; i++){
            //if it's date is equal to the current one, increment
            if(this.data[0][i].date.substr(0,7) === date){
                counter++;
            }
            //if it's not, we're done counting events in that month
            else{
                globalRate.push(counter);
                date = this.data[0][i].date.substr(0,7);
                counter = 0;
            }
        }

        //add up the total population for each year
        let population = []
        population["2013"] = 0;
        population["2014"] = 0;
        population["2015"] = 0;
        population["2016"] = 0;
        population["2017"] = 0;
        population["2018"] = 0;

        for(let i = 0; i < this.data[1].length; i++){
            population["2014"] += parseInt(this.data[1][i].pop2014);
            population["2015"] += parseInt(this.data[1][i].pop2015);
            population["2016"] += parseInt(this.data[1][i].pop2016);
            population["2017"] += parseInt(this.data[1][i].pop2017);
            population["2018"] += parseInt(this.data[1][i].pop2018);
        }

        //build an array that is the ratio of gun violence/population for each month
        //2014
        for(let i = 0; i < 12; i++){
            this.ratios[i] = globalRate[i+12] / population["2014"]
        }
        //2015
        for(let i = 0; i < 12; i++){
            this.ratios[i+12] = globalRate[i+24] / population["2015"]
        }
        //2016
        for(let i = 0; i < 12; i++){
            this.ratios[i+24] = globalRate[i+36] / population["2016"]
        }
        //2017
        for(let i = 0; i < 12; i++){
            this.ratios[i+36] = globalRate[i+48] / population["2017"]
        }
        //2018 only has 3 months of data
        for(let i = 0; i < 2; i++){
            this.ratios[i+48] = globalRate[i+60] / population["2018"]
        }

        //setup scales
        //set a scale for the first year recorded
        let pane = d3.select(".timeline").append("svg").attr("id", "timeline-pane")
            .attr("width", "650")
            .attr("height", "450")
        let timeAxis = d3.select("#timeline-pane").append("g")
            .attr("id" , "timelineAxis")
            .attr("stroke-width" , "3")
            .attr("transform", "translate(20,440)")

        let tempScale = d3.scaleLinear().domain([0, 11]).range([0, 600]);
        let xAxis = d3.axisBottom(tempScale).ticks(12).tickSize("10")

        //style axis
        let axis = d3.select("#timelineAxis").call(xAxis)
            axis.select('.domain').attr("opacity", "0")
            axis.selectAll("text").remove();
        
        //draw global path
        let yScale = d3.scaleLinear().domain([0, 0.000045]).range([400, 0])
        let ALineGenerator = d3
            .line()
            .x((d, i) => tempScale(i))
            .y(d => yScale(d))
        let ALineChart = d3.select("#timeline-pane").append("g").append("path").attr("id", "countryPath")
            .attr("transform", " translate(20, 45)")
            .attr("fill", "none")
            .attr("stroke-width", "3")
            .attr("stroke", "steelBlue")
        //datum is the year 2014
            .datum(this.ratios.slice(12,24))
            .attr("d", function(d){
                return ALineGenerator(d);
            });

       //draw 5 more paths to be updated later
        for(let i = 0; i < 5; i++){
            let idString = "path" + i;
            let ALineChart = d3.select("#timeline-pane").append("g").append("path").attr("id", idString)
            .attr("transform", " translate(20, 45)")
            .attr("fill", "none")
            .attr("stroke-width", "3")
            .attr("stroke", "steelBlue")
            .attr("opacity", "0")
            //datum is the year 2014
            .datum(this.ratios.slice(12,24))
            .attr("d", function(d){
                return ALineGenerator(d);
            });
        }

        //draw chart label
        d3.select("#timeline-pane").append("g").append("text").text("Gun Crimes per 10,000 People").attr("id", "chartLabel")
            .attr("transform", "translate(100, 24)")
            .attr("font-family", "sans-serif")
            .attr("font-size", "16")
            .attr("font-weight", "bold")
            .style("fill", "black")

        //draw legend for global rate
        d3.select("#timeline-pane").append("g").append("text").text("USA").attr("id", "countryLegend")
            .attr("transform", "translate(10, 24)")
            .attr("font-family", "sans-serif")
            .attr("font-size", "16")
            .attr("font-weight", "bold")
            .style("fill", "steelBlue")

        //draw timeline legend 
        for (let i = 0; i < 5; i++){
            let that = this;
            let idString = "label" + i;
            //append the colored path
            d3.select("#timeline-pane").append("g").append("text").text("state").attr("id", idString)
                .attr("transform", function(d){
                    return "translate(10,"+ (i * 20 + 40) +")"
                })
            .attr("font-family", "sans-serif")
            .attr("font-size", "16")
            .attr("font-weight", "bold")
            .style("fill", function(d){
                return that.colors[i]
                })
            .attr("opacity", "0")
        }

        }

        chartUpdate(newStates){

            //update the class' states model
            if(typeof(newStates) != "undefined"){
                this.currentStates = Array.from(newStates);
                //console.log(this.currentStates)
            }
            else{
                console.log("there are no states")
            }
            //transition the ratio line for the whole country between years on update
            //x scale
        let tempScale = d3.scaleLinear().domain([0, 11]).range([0, 600]);
            //y scale
        let yScale = d3.scaleLinear().domain([0, 0.000045]).range([400, 0])
        let ALineGenerator = d3
            .line()
            .x((d, i) => tempScale(i))
            .y(d => yScale(d))

         let year = document.getElementById("yearFilter").value;
          let pathData = []
           if(year ==="2014"){pathData = this.ratios.slice(0,12)}
            else if(year ==="2015"){pathData = this.ratios.slice(12,24)}
            else if(year ==="2016"){pathData = this.ratios.slice(24,36)}
            else if(year ==="2017"){pathData = this.ratios.slice(36,48)}
            else if(year ==="2018"){pathData = this.ratios.slice(48,)};

            //draw a new path for the country
             d3.select("#countryPath")
            .datum(pathData)
            .transition().attr("d", function(d){
                return ALineGenerator(d);
            })

            //for state in states
            //  loop through the that state's yearly data
            //  divide it by the state's population
            console.log("all Data")
            //console.log(this.data)

            //select the path at i and update it
            let tempRate = [];
            for(let i = 0; i < 5; i ++){
                let pathString = "#path" + i;
                let labelString = "#label" + i;

                if(i < this.currentStates.length){
                    //get the state data for the given state at the specific year
                    console.log("current state at 2014 population")
                    let tempState = this.data[2].filter(d => d.state === this.currentStates[i])
                    //console.log(tempState[0].pop2014)
                    let stateIncidents = this.data[0].filter(d => d.state === this.currentStates[i]).filter(d => d.date.slice(0,4) === year);
                    console.log("state Incidents")
                    //console.log(stateIncidents)

                    //count the incidents for each month
                    let incidentCount = [0,0,0,0,0,0,0,0,0,0,0,0];
                    for(let j = 0; j < stateIncidents.length; j++){
                        //the incident's month - 1 is the index
                        incidentCount[parseInt(stateIncidents[j].date.slice(5,7)) - 1] += 1
                    }

                    //divide by the yearly population to get the rate data
                    for(let j = 0; j < incidentCount.length; j++){
                        //TODO: change this to pick year dynamically
                        let pop = 1;
                        if(year === "2014"){pop = tempState[0].pop2014}
                        else if(year === "2015"){pop = tempState[0].pop2015}
                        else if(year === "2016"){pop = tempState[0].pop2016}
                        else if(year === "2017"){pop = tempState[0].pop2017}
                        else if(year === "2018"){pop = tempState[0].pop2018}
                        
                        incidentCount[j] = incidentCount[j] / pop; 
                    }
                    //now incidentCount at each month has the ratio of gun volence per capita
                    
                    console.log("ratio's for the selected state")
                    //console.log(incidentCount)
                    d3.select(pathString)
                    .datum(incidentCount)
                    .transition().attr("d", function(d){
                        return ALineGenerator(d);
                    })
                    .attr("opacity", "1")
                    .attr("stroke", this.colors[i])

                    d3.select(labelString)
                    .text(this.currentStates[i])
                    .transition()
                    .duration(200)
                    .attr("opacity", "1")
                }
                else{
                    d3.select(pathString).transition().duration(200).attr("opacity", "0");
                    d3.select(labelString).transition().duration(200).attr("opacity", "0");
                }
            }
    }
    

    
}

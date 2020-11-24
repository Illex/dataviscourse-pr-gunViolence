class Story{

    constructor(d){
        this.data = d;
        //TODO: tweak styling so it doesn't look like garbage
    }

    draw(){
         let eventPane = d3.select(".story").append("svg").attr("id", "incident-pane")
                .attr("width", "300")
                .attr("height", "500")
                .attr("transform", "translate(16, 4)")
                //.attr("transform", "translate(-10, -260)");
         let outline = d3.select("#incident-pane").append("g").attr("id", "incident-pane-outline");
                outline.attr("transform", "translate(-10,-5)")

        outline.append("text")
            .attr("id", "state")
            .attr("x", " 10")
            .attr("y", " 20")
            .text("State")
            .attr("font-family", "sans-serif")
            .attr("font-size", "16");
        outline.append("text")
            .attr("id", "stateData")
            .attr("x", " 10")
            .attr("y", " 40")
            .text("Pennsylvania")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11");

        outline.append("text")
            .attr("id", "municipality")
            .attr("x", " 10")
            .attr("y", " 60")
            .text("City/County")
            .attr("font-family", "sans-serif")
            .attr("font-size", "16");
        outline.append("text")
            .attr("id", "municipalityData")
            .attr("x", " 10")
            .attr("y", " 80")
            .text("Mckeesport")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11");

        outline.append("text")
            .attr("id", "address")
            .attr("x", " 10")
            .attr("y", " 100")
            .text("Address")
            .attr("font-family", "sans-serif")
            .attr("font-size", "16");
        outline.append("text")
            .attr("id", "addressData")
            .attr("x", " 10")
            .attr("y", " 120")
            .text("1506 Versailles Avenue and Coursin Street")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11");

        outline.append("text")
            .attr("id", "date")
            .attr("x", " 10")
            .attr("y", " 140")
            .text("Date")
            .attr("font-family", "sans-serif")
            .attr("font-size", "16");
        outline.append("text")
            .attr("id", "dateData")
            .attr("x", " 10")
            .attr("y", " 160")
            .text("2013-01-01")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11");

        outline.append("text")
            .attr("id", "mortality")
            .attr("x", " 10")
            .attr("y", " 180")
            .text("Deaths : Injuries")
            .attr("font-family", "sans-serif")
            .attr("font-size", "16");
        outline.append("text")
            .attr("id", "mortalityData")
            .attr("x", " 10")
            .attr("y", " 200")
            .text("0 : 4")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11");

        outline.append("text")
            .attr("id", "incidentId")
            .attr("x", " 10")
            .attr("y", " 220")
            .text("Incident Id")
            .attr("font-family", "sans-serif")
            .attr("font-size", "16");
        outline.append("text")
            .attr("id", "incidentIdData")
            .attr("x", " 10")
            .attr("y", " 240")
            .text("461105")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11");

        //hidden news story url
        outline.append("text")
            .attr("id", "newsUrl")
            .text("www.post-gazette.com/local/south/2013/01/17/Man-arrested-in-New-Year-s-Eve-shooting-in-McKeesport/stories/201301170275");
        //news story
        outline.append("rect").attr("id", "srcButton")
            .attr("x", "20")
            .attr("y", "260")
            .attr("width", "150")
            .attr("height", "50")
            .attr("opacity", ".6")
            .style("fill", "steelBlue")
            .on("click", function(d){
                let url = d3.select("#newsUrl").text()
                console.log(url)
                window.open(url);
            })
            .on("mouseover", function(d){
                d3.select(this).attr("opacity", "1")
            })
            .on("mouseout", function(d){
                d3.select(this).attr("opacity", ".6")
            })

        //gunviolence.org
        //make a hiddent text lable containing the archive url
        outline.append("text")
            .attr("id", "archiveUrl")
            .text("http://www.gunviolencearchive.org/incident/461105")

        outline.append("rect").attr("id", "urlButton")
            .attr("x", "20")
            .attr("y", "330")
            .attr("width", "150")
            .attr("height", "50")
            .attr("opacity", ".6")
            .style("fill", "steelBlue")
            .on("click", function(d){
                //access the hidden url text label and use it to navigate to the new web page
                 let url = d3.select("#archiveUrl").text()
                window.open(url);
            })
            .on("mouseover", function(d){
                d3.select(this).attr("opacity", "1")
            })
            .on("mouseout", function(d){
                d3.select(this).attr("opacity", ".6")
            })

        //src tag text
        outline.append("text")
            .attr("id", "srcTag")
            .attr("x", " 35")
            .attr("y", " 288")
            .text("Open Source")
            .attr("font-family", "sans-serif")
            .attr("font-size", "14");

        //archive tag text
        outline.append("text")
            .attr("id", "archiveTag")
            .attr("x", " 35")
            .attr("y", " 360")
            .text("Open Archive")
            .attr("font-family", "sans-serif")
            .attr("font-size", "14");

        //TODO:find a way to update the url's for each button as an attribute 
    }
}

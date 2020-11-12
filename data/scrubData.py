#open the file
import json
from csv import reader

#data processing for gun violence events
with open("gunViolenceData.csv", 'r') as f:
    #skip first line
    f.readline()
    #make array to store all dicts
    eventList = []
    #make a while loop for all lines
    for line in reader(f):
        #make a temp dict
        temp = {
                "id": "",
                "date":"",
                "state":"",
                "city/county":"",
                "address":"",
                "deaths":"",
                "injuries":"",
                "url":"",
                "source":"",
                "sex":"",
                }

        #fields = line.split(",")
        #print(line)
        fields = line

        #print(len(fields))
        if len(line) < 21 :
            continue

        temp["id"] = fields[0].strip(',')
        temp["date"] = fields[1].strip(',')
        temp["state"] = fields[2].strip(',')
        temp["city/county"] = fields[3].strip(',')
        temp["address"] = fields[4].strip(',')
        temp["deaths"] = fields[5].strip(',')
        temp["injuries"] = fields[6].strip(',')
        temp["url"] = fields[7].strip(',')
        temp["source"] = fields[8].strip(',')
        temp["sex"] = fields[21].strip(',')
        #load dict with all values
        #add dict to array
        eventList.append(temp)

#make a new file to put json in
with open ("data.txt", 'w') as out:
    #for every dict
    out.write("[")
    for item in eventList:
        #write object to the file
        json.dump(item, out)
        out.write(",")
        out.write("\n")
    out.write("]")
#make a new file and write the array as json

#data processing for census data
with open("censusPopulation.csv", 'r') as f:
    #skip first 10 lines
    for i in range(0,9):
        f.readline()


    states= []
    for line in f:
        if fields[0] == "":
            break

        state = {
                "state":"",
                "pop2013":"",
                "pop2014":"",
                "pop2015":"",
                "pop2016":"",
                "pop2017":"",
                "pop2018":""
                }
        fields = line.split(",")
        state["state"] = fields[0].strip(".")
        state["pop2013"] = fields[7]
        state["pop2014"] = fields[8]
        state["pop2015"] = fields[9]
        state["pop2016"] = fields[10]
        state["pop2017"] = fields[11]
        state["pop2018"] = fields[12]

        states.append(state)

#make a json file for all the states
with open("stateData.txt", 'w') as out:
    out.write("[")
    for item in states:
        json.dump(item, out)
        out.write(",")
        out.write("\n")
    out.write("]")

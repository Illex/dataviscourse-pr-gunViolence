#open the file
import json

with open("gunViolenceData.csv", 'r') as f:
    #skip first line
    f.readline()
    #make array to store all dicts
    eventList = []
    #make a while loop for all lines
    for line in f:
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
                "source":""
                }

        fields = line.split(",")

        #print(len(fields))
        if len(fields) < 9 :
            continue
        #print(fields)
        #print()

        temp["id"] = fields[0].strip(',')
        temp["date"] = fields[1].strip(',')
        temp["state"] = fields[2].strip(',')
        temp["city/county"] = fields[3].strip(',')
        temp["address"] = fields[4].strip(',')
        temp["deaths"] = fields[5].strip(',')
        temp["injuries"] = fields[6].strip(',')
        temp["url"] = fields[7].strip(',')
        temp["source"] = fields[8].strip(',')
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


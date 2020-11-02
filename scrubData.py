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
                "state":"",
                "city/county":"",
                "addres":"",
                "deaths":"",
                "injuries":"",
                "url":"",
                "source":""
                }

        fields = line.split(",")

        #print(len(fields))
        if len(fields) < 8 :
            continue
        #print(fields)
        #print()

        temp["id"] = fields[0]
        temp["state"] = fields[1]
        temp["city/county"] = fields[2]
        temp["address"] = fields[3]
        temp["deaths"] = fields[4]
        temp["injuries"] = fields[5]
        temp["url"] = fields[6]
        temp["source"] = fields[7]
        #load dict with all values
        #add dict to array
        eventList.append(temp)

#make a new file to put json in
with open ("data.txt", 'w') as out:
    #for every dict
    for item in eventList:
        #write object to the file
        json.dump(item, out)
#make a new file and write the array as json


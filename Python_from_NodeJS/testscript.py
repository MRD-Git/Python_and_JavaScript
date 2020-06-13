import sys
import json
received_array = json.loads(sys.argv[1]) # mistype "sys" as "sy" to prodcuce an error
pyList = []
for i in range(len(received_array)):
    pyList.append(received_array[i]**2)
print(json.dumps(pyList))
# in some cases, the separators need further specification, e.g., like this:
# json.dumps(pyList, separators=(',', ': '))

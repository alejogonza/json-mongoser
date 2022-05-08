# json-mongoser
![image](https://raw.githubusercontent.com/alejogonza/json-mongoser/main/images/image.png)    
Console application to read JSON files and upload them to MongoDB
## OPTIONS

***-h***: get help

***-v***: view version

***-d***: path to JSON files directory

***-c***: url to connect mongoDB and create the collections

***-m***: directory path to add your mongoose model

## USAGE:
***set model***
```
json-mongoser -m YOUR_PATH
```
***save data***
```
json-mongoser -d YOUR_PATH -c MONGOURL_CONNECTION
```
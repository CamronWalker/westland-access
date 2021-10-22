People Export Command:
```
firestore-export --accountCredentials private-key.json --backupFile exportTest.json --prettyPrint --nodePath projects/S590/people
```

Import People Command: 
```
firestore-import --accountCredentials private-key.json --backupFile importPeople.json --nodePath projects/S590/people
```

Delete People Command:
```
firestore-clear --accountCredentials private-key.json --nodePath projects/S590/people
```
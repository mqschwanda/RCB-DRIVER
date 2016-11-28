# RCB-MLSD #

## APP ##
Fly around on a map and show others flying around on a live map

### USE CASE ###
#### USER: ####
1. Fly around on map
  * send coordinates to server while flying around
2. User / Map settings
3. View Map that displays other users flying around
  * pull all moving marker coordinates from server

## TODO ##
1. Store ID and Name of user in local browser storage for access latter. (/RCB-MLSD/public/assets/javascripts/home.js [line 18])

done 2. Update the code so that the wanderdrone featureLayer is updating instead of adding to map. (/RCB-MLSD/public/assets/javascripts/map.js [line 139])

3. Either send data via the post or update a master api route that will serve data similar to wanderdrone. (/RCB-MLSD/public/assets/javascripts/map.js [line 138])
4. Insert 'player.name 'into mySQL database and return primary key as id (/RCB-MLSD/controller/map.js [line 8])
5. Insert 'player' object into mySQL database to update position and direction (/RCB-MLSD/controller/map.js [line 31])
6. Select all from players table where the current player id does not equal the record's id (/RCB-MLSD/controller/map.js [line 33]) *this may be changed to a master api route with geoJSON data*
7. Presentation

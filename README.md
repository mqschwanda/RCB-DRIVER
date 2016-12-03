# ✈️ **DRIVER** ✈️ #
# 🕹 APP 🕹 #
A simple game where the user flies around the map exploring the world while also being able to observe in real time the location of all other current users.
<br/>
### 👥 USE CASES 👥 ###
* Input username
  1. CLIENT: The user enters A username into the form on the home page. This username does not need to be unique to all users playing the game. *A user can choose to play as a guest by not using the username input*
  2. CLIENT: When the user submits the form (by pressing the play button) the input is sent to the server.
  3. SERVER: The server receives the username and inserts it into a user table in the database. When this record is created a unique id is automatically generated so that the record can be identified.
* Fly around map
  1. CLIENT: A map of the earth is rendered along with an airplane object representing the user. This vehicle's location is generated randomly.
  2. CLIENT: The user’s airplane moves forward while they steer around the map using the arrow keys on their keyboard.
  3. CLIENT: As the airplane object is moving around the map the coordinates and bearing are sent to the server.
  4. SERVER: The server receives the coordinates and bearing of the user’s plane object and inserts them into the user table. This process is updating the previous record that was created when establishing a username.
  5. SERVER: The username, coordinates, and bearing of all users is selected from the database and sent to the client.
  6. CLIENT: The client takes the information received from the server and removes the information relating to the user before rendering the information as markers on the map. *This logic is handled client side to alleviate processing on the server*

***************  

### 💽 DATABASE STRUCTURE 💽 ###
  * #### User ####
    * ##### Id #####
      * primary key
      * automatically generated
      * integer
      * not null
    * ##### Name #####
      * username submited by client form
      * variable length character string
      * not null
    * ##### Longitude #####
      * automatically generated from client longitude
      * decimal
    * ##### Latitude #####
      * automatically generated from client latitude
      * decimal
    * ##### Direction #####
      * automatically generated from client direction
      * decimal

*************

### 👍 RESOLVED ISSUES 👍 ###
* Minimizing processing on the server-side to make objects render closer to real time.  
  * SERVER:   
  `User.findAll({`  
  ..`where: {`  
  ....`id: {`  
  ......`$ne: data.id`  
  ....`}`  
  ..`}`  
  `})`
  * CLIENT:  
  `featureLayer.setGeoJSON(geoJSON);`  
 * SERVER:  
 `User.findAll()`  
** VS. **  
 * CLIENT:  
`for (var i = 0; i < geoJSON.features.length; i++) {`   
 ..`if (geoJSON.features[i].properties.id == currentUserID) {`  
....`delete geoJSON.features[i];`  
..`}`  
`}`  
`featureLayer.setGeoJSON(geoJSON);`
* Interfacing with the Mapbox API
  * Adding depreciated features that are no longer supported
  *
* Asynchronicity disrupting the flow of data between server and client
  * Nested functions with callbacks on the front-end
  * Used sequelize promises to control async flow

*************

### 🙏🏻 WISH LIST 🙏🏻 ###
* Add CSS class to the vehicle object so that direction of all users can be observed by the client.
* Encrypt the connection between the server and client so that the user cannot alter the front-end javascript to move other players objects.
* Add a settings page so that the experience can be customized by the user.
* Add more features so that users can interact with each other in realtime as they drive around the map.

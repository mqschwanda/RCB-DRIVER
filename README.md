# RCB-MLSD #

### Driver ###
Players fly around on a map and show others flying around on a live map

## Getting Started ##
The instructions will guide you through to installing the application on your local machine.

## Prerequisites ##
Tools needed:
* Terminal
* MySQL

### Install ###
> npm i 
>

## Built With ##

* body-parser - https://www.npmjs.com/package/body-parser
* express - https://www.npmjs.com/package/express
* express-handlebars - https://www.npmjs.com/package/express-handlebars
* mapbox - https://www.mapbox.com/
* method-override - https://www.npmjs.com/package/method-override
* mysql - https://www.mysql.com/
* path - https://www.npmjs.com/package/path
* request - https://www.npmjs.com/package/request
* sequelize - https://www.npmjs.com/package/sequelize

## Authors ##

* Mark Schwanda
* Stacy Trent
* Louis Huang
* Diliyor Yusupov





### USE CASE ###
#### USER: ####
1. Fly around on map
  * send coordinates to server while flying around
2. User / Map settings
3. View Map that displays other users flying around
  * pull all moving marker coordinates from server

## TODO ##
1. Add direction to geoJSON object that represents all players on map
2. Add CSS Class to geoJSON object that represents all players on map
3. Fix map so that it does not have any whitespace. Currently the map stretches its width but the height will create whitespace when smaller than veiwport.
4. Make sure login asynchronous issue is fixed
5. Implement
6. Add content to the about page to display controls and information about the application and add content to the home page. Use SEO when possible with content.
7. Add SEO meta tags to main.hbs
8. Build up readme file for Presentation
9. Host on server for presentation


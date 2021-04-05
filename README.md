https://mapapp-client.herokuapp.com/

This map-app lets a user explore through a map and drop markers for different places they have been. They can add entries with photos and a description. The user can keep track of different adventures and memories through the years by adding an entry. The user navigates by "grabbing" the screen and zooms by double clicking/ using the zoom buttons in the top left corner. An entry is added by a clicking on the location where the memory happened and filling out the form. The location data (Lat/Long, town, state, country) are added automatically once clicked.

This application was built with a React frontend, featuring React Mapbox for the map functionality and uses a Mapquest API to request geographic data for each potential entry. The requests for entries are made to the Node Js backend, which stores data in MongoDB.

Backend Repo - https://github.com/MichaelC1999/map-app-backend
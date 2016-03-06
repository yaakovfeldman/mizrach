/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};




//listen for deviceready event and launch onDeviceReady when phonegap is fully running
document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
    initializeApp();    //launch the initializeApp function
}
 
function initializeApp(){
    // add a watch for compass.
    navigator.compass.watchHeading(onCompassSuccess, onCompassError);
	navigator.geolocation.getCurrentPosition(function(position)
{
    // just to show how to access latitute and longitude
    var location = [position.coords.latitude, position.coords.longitude];
	var jerusalemDirection = geo.bearing(location[0], location[1], 31.7833, 35.2167);
	//$("#txtLocation").text("lat: " + location[0] + " long: " + location[1]);
	$("#txtDirection").text(jerusalemDirection);
},
function(error)
{
    // error getting GPS coordinates
    alert('code: ' + error.code + ' with message: ' + error.message + '\n');
}, 
{ enableHighAccuracy: true, maximumAge: 9000, timeout: 15000 });
}
 
function onCompassSuccess(heading) {
    // display the bearing
    //document.getElementById("txtBearing").innerHTML = heading.magneticHeading.toFixed(0) + "°";
    //show it in jQuery shorthand (line below is same as line above this line.
    $("#txtBearing").text(heading.magneticHeading.toFixed(0) + "°");
     
    //We'll rotate using the jQueryRoate
    $("#imgRose").rotate(heading.magneticHeading * -1);
     
};
 
 
function onCompassError(error) {
//    alert('CompassError: ' + error.code);
};






    var geo = {
        /**
         * Calculate the bearing between two positions as a value from 0-360
         *
         * @param lat1 - The latitude of the first position
         * @param lng1 - The longitude of the first position
         * @param lat2 - The latitude of the second position
         * @param lng2 - The longitude of the second position
         *
         * @return int - The bearing between 0 and 360
         */
        bearing : function (lat1,lng1,lat2,lng2) {
            var dLon = this._toRad(lng2-lng1);
            var y = Math.sin(dLon) * Math.cos(this._toRad(lat2));
            var x = Math.cos(this._toRad(lat1))*Math.sin(this._toRad(lat2)) - Math.sin(this._toRad(lat1))*Math.cos(this._toRad(lat2))*Math.cos(dLon);
            var brng = this._toDeg(Math.atan2(y, x));
            return ((brng + 360) % 360);
        },

       /**
         * Since not all browsers implement this we have our own utility that will
         * convert from degrees into radians
         *
         * @param deg - The degrees to be converted into radians
         * @return radians
         */
        _toRad : function(deg) {
             return deg * Math.PI / 180;
        },

        /**
         * Since not all browsers implement this we have our own utility that will
         * convert from radians into degrees
         *
         * @param rad - The radians to be converted into degrees
         * @return degrees
         */
        _toDeg : function(rad) {
            return rad * 180 / Math.PI;
        },
    };
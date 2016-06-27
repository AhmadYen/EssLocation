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

//var app = {
//    // Application Constructor
//    initialize: function() {
//        this.bindEvents();
//    },
//    // Bind Event Listeners
//    //
//    // Bind any events that are required on startup. Common events are:
//    // 'load', 'deviceready', 'offline', and 'online'.
//    bindEvents: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//    },
//    // deviceready Event Handler
//    //
//    // The scope of 'this' is the event. In order to call the 'receivedEvent'
//    // function, we must explicitly call 'app.receivedEvent(...);'
//    onDeviceReady: function() {
//        app.receivedEvent('deviceready');
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        //var listeningElement = parentElement.querySelector('.listening');
//        //var receivedElement = parentElement.querySelector('.received');
//
//        //listeningElement.setAttribute('style', 'display:none;');
//        //receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
//    }
//};
//
//app.initialize();



$(document).ready(function() {
    //$('.carousel').carousel('pause');
    $('.carousel').each(function(){
        $(this).carousel({
            interval: false
        });
    });
    getPosition();
    //window.plugins.toast.showShortTop('Hello there!', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    //window.plugins.toast.showLongBottom('Hello there!', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    //window.plugins.toast.show('Hello there!', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
});

$('#device').click(function(){
    location.href="rootPage.html" ;
});

//////////////////////////////////////////////////////////////////////////////////
function getPosition() {
    var options = {
        enableHighAccuracy: true
        //maximumAge: 3600000
    }

    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {
        $('#lat_label').html("Lat : " +position.coords.latitude);
        $('#lng_label').html("Lng : " +position.coords.latitude);
    };

    function onError(error) {
        //console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        window.plugins.toast.showLongBottom('การค้นหาตำแหน่งล้มเหลว', function(a){console.log('toast success: ' + a)}
            , function(b){alert('toast error: ' + b)});
    }
}

function CheckNum() {

    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
    }
}

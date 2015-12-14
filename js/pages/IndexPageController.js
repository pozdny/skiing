/*jslint browser: true*/
/*global console*/

var myapp = myapp || {};
myapp.pages = myapp.pages || {};

myapp.pages.IndexPageController = function (myapp, $$) {
  'use strict';

  // Init method
  (function () {
    document.addEventListener('DOMContentLoaded', ready, false);
    var options = {
      'bgcolor': '#22afee',
      'fontcolor': '#fff',
      'onOpened': function () {
        console.log("welcome screen opened");
      },
      'onClosed': function () {
        console.log("welcome screen closed");
      }
    },
    welcomescreen_slides,
    welcomescreen;

    welcomescreen_slides = [
      {
        id: 'slide0',
        picture: '<div class="welcome-icon"><i class="icon icon-welcome"></i></div>',
        text: ''
      }

    ];

    welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);

    $$(document).on('click', '.tutorial-close-btn', function () {
      welcomescreen.close();
    });

    $$('.tutorial-open-btn').click(function () {
      welcomescreen.open();
    });

    $$(document).on('click', '.tutorial-next-link', function (e) {
      welcomescreen.next();
    });

    $$(document).on('click', '.tutorial-previous-slide', function (e) {
      welcomescreen.previous();
    });

    function ready() {
        JSAPI.keepScreenOn();
        var welcom = $$('.welcomescreen-container');
        var hide_animation = function(){
            welcom.addClass('hideAnimation');
            var hide_welcomescreen = function(){
                welcomescreen.close();
            };
            delyed(hide_welcomescreen, 500);
        };
        delyed(hide_animation, 1000);

        swiperWithTabInitIndex('.swiper-container','.tab-link');

        storageClear();

        if(!storageGet("tracker_status")){
            storageSet("tracker_status", 'stop');
        }
        if(!storageGet("time_milsec_now")){
            storageSet("time_milsec_now", new Date().getTime());
        }
        if(!storageGet("time_milsec_start")){
            storageSet("time_milsec_start", null);
        }

    };


  }());

};


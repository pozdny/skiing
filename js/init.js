var myApp = new Framework7({
  init:false,
  //tapHold: true, //enable tap hold events
  router: true,
  //animateNavBackIcon: true,
  swipeBackPage: false,
  // Enable templates auto precompilation
  precompileTemplates: true,
  // Enabled pages rendering using Template7
  template7Pages: true,
  // Specify Template7 data for pages
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we use fixed-through navbar we can enable dynamic navbar
  dynamicNavbar: true,
  domCache: true,
  uniqueHistory:true
});

//global
n = {
    language:'en',
    free: !0,
    timer: null,
    mySwiper:null,
    mySwiperR:null
};

//localStorage
var storage = window['localStorage'];

myApp.onPageInit('index', function (page) {
    'use strict';
  // to do
});

myApp.onPageInit('statistics', function (page) {
    'use strict';
  // to do
    homeTap();
});
myApp.onPageInit('resorts', function (page) {
    'use strict';
    getAllResorts();
    homeTap();
    trackerTap();
    //backTap();
});
myApp.onPageInit('resort', function (page) {
    'use strict';
    getResort(page.query.id);
    homeTap();
    trackerTap();
    //backTap();
});
myApp.onPageInit('tracker', function (page) {
    'use strict';
    // to do
    homeTap();
    resortsTap();
    //backTap();
    var tracker_status = storageGet('tracker_status');
    var start_button = $$('#start-button');
    showButtonStart(tracker_status);
    if(tracker_status == 'pause' || tracker_status == 'start'){
        //showTimer(tracker_status);
        //clickStartButton(start_button);
    }
    else{
        clickFirstStart();
    }

});

myApp.init();

myApp.ready = (
    function () {
      'use strict';
      var exports = {};
      (function () {
        // Initialize app
        var fw7App = myApp,
            fw7ViewOptions = {

            },
            ipc,
            $$ = Dom7;
        ipc = new myapp.pages.IndexPageController(fw7App, $$);

      }());
      return exports;
    }()
);







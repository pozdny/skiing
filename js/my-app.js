// resorts
function getAllResorts(){
    $$.ajax({   // выводим галерею изображений отелей-------------------------------------------------------------------
        url: 'content/' + n.language + '/resorts.json',
        error: function () {

        },
        success: function (res) {
            var context = JSON.parse(res);
            var target_block = $$('#resorts-block');
            var template = $$('#resort-list').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(context);
            target_block.html(html);
            blockClickAddClass();
        }
    });
}
// one resort
function getResort(id){
    $$.ajax({   // выводим данные по одному отелю-----------------------------------------------------------------------
        url: 'content/' + n.language + '/resorts.json',
        error: function () {

        },
        success: function (res) {
            var context = JSON.parse(res);
            var resort = context.resorts[id];
            var target_block = $$('#resortDescription');
            $$('#resortTitle').html(resort["name"]);

            var template = $$('#resort-description').html();
            var compiledTemplate = Template7.compile(template);
            var html = compiledTemplate(resort);
            target_block.html(html);
        }
    });
}
// click statistic icon
function homeTap(){
    $$('.home').on('click', function(e){
        var viewsElement = $$('.view-main')[0];
        var viewInstance = viewsElement.f7View;
        var history = viewInstance.history;console.log(history);
        mainView.router.back({
            force:true,
            //reload: true,
            //reloadPrevious:true,
            //url: 'index.html'
            pageName:'index'
        });
    });
}
// click resorts icon
function resortsTap(){
    $$('.resort-i').on('click', function(e){
        var viewsElement = $$('.view-main')[0];
        var viewInstance = viewsElement.f7View;
        var history = viewInstance.history; console.log(history);
        var flag = false;
        $$.each(history, function(i, val){
            if(val == 'resorts.html'){
                flag = true;
                mainView.router.back({
                    force:true,
                    pageName:'resorts'
                });
            }
        });
        if(!flag){
            mainView.router.loadPage('resorts.html');
        }

    });
}
// click tracker icon
function trackerTap(){
    $$('.tracker-i').on('click', function(e){
        var viewsElement = $$('.view-main')[0];
        var viewInstance = viewsElement.f7View;
        var history = viewInstance.history;console.log(history);
        var flag = false;
        $$.each(history, function(i, val){ //console.log(val);
            if(val == 'tracker.html'){
                flag = true;
                mainView.router.back({
                    force:true,
                    pageName:'tracker'
                });
            }
        });

        if(!flag){
            mainView.router.loadPage('tracker.html');
        }

    });
}
function backTap(){
    $$('.back').on('click', function(e){
        var viewsElement = $$('.view-main')[0];
        var viewInstance = viewsElement.f7View;console.log(viewInstance);
        var history = viewInstance.history;
    });
}
function blockClickAddClass(){
    var resort_img = $$('.resort-img');
    $$.each(resort_img, function(i, val){
        $$(val).on('click', function(){
            var that = $$(this);
            that.addClass('clicked');
            //that.css({background:"green"});
            var removeClass = function(){
                that.removeClass('clicked');
            };
            delyed(removeClass, 100);
        });
    });
}

function swiperWithTabInitIndex(container, tab_link){
    n.mySwiper = myApp.swiper(container, {
        pagination:null,
        initialSlide: 0,
        loop: false
    });

    var tab_link = $$(tab_link);
    $$.each(tab_link, function(i, val){
        $$(val).on('click', function(){
            $$.each(tab_link, function(i, val){
                $$(val).removeClass('active');
            });
            $$(this).addClass('active');
            n.mySwiper.slideTo(i);
        });
    });
    //console.log(n.mySwiper.activeIndex);
    n.mySwiper.on('slideChangeStart', function () {
        $$.each(tab_link, function(i, val){
            $$(val).removeClass('active');
            if(i  == n.mySwiper.activeIndex){
                $$(val).addClass('active');
            }

        });
    });
}

function showButtonStart(tracker_status){
    var start_button = $$('#start-button');
    if(tracker_status == 'start'){
        start_button.toggleClass('pause');
    }
    start_button.on('click', function(){
       var that = $$(this);

        //clickStartButton(that);
    })
}
function clickFirstStart(){
    var start_button = $$('#start-button');
    start_button.on('click', function(){
        var that = $$(this);
        var flag = false;
        if(that.hasClass('start') || that.hasClass('pause')){
            flag = true;
        }
        clickStartButton(that);
        if(!flag){
            var options = {};
            n.timer = myApp.tracker(options);
        }
        else{
            
        }


    })
}
function clickStartButton(button){ console.log('111');
    if(button.hasClass('pause')){
        button.removeClass('pause');
        button.addClass('start');
    }
    else{
        button.removeClass('start');
        button.addClass('pause');

    }

}
function showTimer(tracker_status){
    var options = {
        tracker_status: tracker_status
    };
    n.timer = myApp.tracker(options);
}
function storageGet(name) {
    return JSON.parse(localStorage.getItem(name));
}

function storageSet(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}

function storageRemoveKey(name) {
    localStorage.removeItem(name);
}
function storageClear(){
    localStorage.clear();
}

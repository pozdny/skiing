/**
 * Created by user on 11.12.15.
 */
Framework7.prototype.plugins.tracker = function (app, globalPluginParams) { console.log(app);
    'use strict';

    var Tracker;
    Tracker = function (options) {
        var self = this,
            counterTimer = null,
            counterTimerAfterTrip = null,
            block_time = $$('#time'),
            hour_elem = block_time.find('.hour-elem'),
            minutes_elem = block_time.find('.minutes-elem'),
            seconds_elem = block_time.find('.seconds-elem'),
            defaults = {
                tracker_status: "stop"
            };

        self.start = function(){
            var start = 0,
                time = 0,
                elapsed = '0.0',
                delay = 0;

                start = new Date().getTime();

            //console.log(storage);

            function instance() {
                time += 1000;
                elapsed = parseInt(time/1000);

                var hour = parseInt(elapsed/(60*60))%24; //hours
                var minutes = parseInt(elapsed/60)%60;   //minutes
                var seconds = parseInt(elapsed)%60;      //seconds

                var diff = (new Date().getTime() - start) - time;

                // строка вермени
                if (hour < 10) {
                    hour = '0' + hour;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }

                hour_elem.html(hour);
                minutes_elem.html(minutes);
                seconds_elem.html(seconds);

                counterTimer = window.setTimeout(instance, (1000 - diff));
            };
            counterTimer = window.setTimeout(instance, 1000);
        };

        self.start_after_trip = function(in_time) {
            console.log('after_trip');
            var start = new Date().getTime(),
                time = 0,
                last_time = in_time,
                elapsed = '0.0',
                delay = 0;

            var raz = start - last_time; console.log(raz);
            elapsed = parseInt(raz/1000);
            var hour = parseInt(elapsed/(60*60))%24; //hours
            var minutes = parseInt(elapsed/60)%60;   //minutes
            var seconds = parseInt(elapsed)%60;      //seconds
            // строка вермени
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            hour_elem.html(hour);
            minutes_elem.html(minutes);
            seconds_elem.html(seconds);

            function instance() {
                raz += 1000;
                time += 1000;
                elapsed = parseInt(raz/1000);

                var hour = parseInt(elapsed/(60*60))%24; //hours
                var minutes = parseInt(elapsed/60)%60;   //minutes
                var seconds = parseInt(elapsed)%60;      //seconds

                var diff = (new Date().getTime() - start) - time;

                // строка вермени
                if (hour < 10) {
                    hour = '0' + hour;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }

                hour_elem.html(hour);
                minutes_elem.html(minutes);
                seconds_elem.html(seconds);
                counterTimer = window.setTimeout(instance, (100 - diff));
            };
            counterTimer = window.setTimeout(instance, 100);
        };
        /**
         * pause
         *
         * @private
         */
        self.pause = function(){
            console.log('pausetttt');
        };

        /**
         * Get tracker status
         *
         * @private
         */
        function getStatus(){
            var tracker_status = storageGet('tracker_status');
            if(tracker_status == 'stop'){
                self.start();
                storageSet('tracker_status', 'start');
                storageSet("time_milsec_start", new Date().getTime());
            }
            else if(tracker_status == 'start'){
                var in_time = storageGet("time_milsec_start");

                self.start_after_trip(in_time);
                //self.pause();
            }
            else if(tracker_status == 'pause'){
                console.log('timer_pause');
            }

        }
        /**
         * Sets the options that were required
         *
         * @private
         */
        function applyOptions() {
            var def;
            options = options || {};
            for (def in defaults) {
                if (typeof options[def] === 'undefined') {
                    options[def] = defaults[def];
                }
            }
        }
        /**
        * Initialize the instance
        *
        * @method init
        */
        (function () {
            applyOptions();
            getStatus();
        }());

        return self;
    };
    app.tracker = function (options) {
        return new Tracker(options);
    };
};


/*
var Timer = function (options) {
    this.color='red';
    var self = this,
        counterTimer = null,
        block_time = $$('#time'),
        hour_elem = block_time.find('.hour-elem'),
        minutes_elem = block_time.find('.minutes-elem'),
        seconds_elem = block_time.find('.seconds-elem'),
        start_status,
        stop_status,
        pause_status,
        defaults = {
            open: true
        };

    /!**
     * Sets the options that were required
     *
     * @private
     *!/
    function applyOptions() {
        var def;
        options = options || {};
        for (def in defaults) {
            if (typeof options[def] === 'undefined') {
                options[def] = defaults[def];
            }
        }
    }

    function start(){
        var start = new Date().getTime(),
            time = 0,
            elapsed = '0.0';
        //console.log(storage);

        function instance() {
            time += 1000;
            elapsed = parseInt(time/1000);

            var hour = parseInt(elapsed/(60*60))%24; //hours
            var minutes = parseInt(elapsed/60)%60;   //minutes
            var seconds = parseInt(elapsed)%60;      //seconds

            var diff = (new Date().getTime() - start) - time;

            // строка вермени
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            hour_elem.html(hour);
            minutes_elem.html(minutes);
            seconds_elem.html(seconds);

            counterTimer = window.setTimeout(instance, (100 - diff));
        }
        counterTimer = window.setTimeout(instance, 100);
    }
    // get current status
    function getStatus(){
        var status = storageGet('tracker_status');
        console.log(status);
    }
    /!**
     * Initialize the instance
     *
     * @method init
     *!/
    self.xxx = function(){
        console.log('self');
    }
    (function () {

        applyOptions();
        getStatus();

    }());

    return self;
};*/

// Copyright 2020, Amr Bedir
// https://fb.com/AmrBedir.eg
// Released under the MIT license.
// https://github.com/pragmaticly/smart-time-ago/blob/master/LICENSE

(function() {
  var TimeAgo;

  TimeAgo = (function() {

    function TimeAgo(element, options) {
      this.startInterval = 60000;
      this.init(element, options);
    }

    TimeAgo.prototype.init = function(element, options) {
      this.$element = $(element);
      this.options = $.extend({}, $.fn.timeago.defaults, options);
      this.updateTime();
      return this.startTimer();
    };

    TimeAgo.prototype.startTimer = function() {
      var self;
      self = this;
      return this.interval = setInterval((function() {
        return self.refresh();
      }), this.startInterval);
    };

    TimeAgo.prototype.stopTimer = function() {
      return clearInterval(this.interval);
    };

    TimeAgo.prototype.restartTimer = function() {
      this.stopTimer();
      return this.startTimer();
    };

    TimeAgo.prototype.refresh = function() {
      this.updateTime();
      return this.updateInterval();
    };

    TimeAgo.prototype.updateTime = function() {
      var self;
      self = this;
      return this.$element.findAndSelf(this.options.selector).each(function() {
        var timeAgoInWords;
        timeAgoInWords = self.timeAgoInWords($(this).attr(self.options.attr));
        return $(this).html(timeAgoInWords);
      });
    };

    TimeAgo.prototype.updateInterval = function() {
      var filter, newestTime, newestTimeInMinutes, newestTimeSrc;
      if (this.$element.findAndSelf(this.options.selector).length > 0) {
        if (this.options.dir === "up") {
          filter = ":first";
        } else if (this.options.dir === "down") {
          filter = ":last";
        }
        newestTimeSrc = this.$element.findAndSelf(this.options.selector).filter(filter).attr(this.options.attr);
        newestTime = this.parse(newestTimeSrc);
        newestTimeInMinutes = this.getTimeDistanceInMinutes(newestTime);
        if (newestTimeInMinutes >= 0 && newestTimeInMinutes <= 44 && this.startInterval !== 60000) {
          this.startInterval = 60000;
          return this.restartTimer();
        } else if (newestTimeInMinutes >= 45 && newestTimeInMinutes <= 89 && this.startInterval !== 60000 * 22) {
          this.startInterval = 60000 * 22;
          return this.restartTimer();
        } else if (newestTimeInMinutes >= 90 && newestTimeInMinutes <= 2519 && this.startInterval !== 60000 * 30) {
          this.startInterval = 60000 * 30;
          return this.restartTimer();
        } else if (newestTimeInMinutes >= 2520 && this.startInterval !== 60000 * 60 * 12) {
          this.startInterval = 60000 * 60 * 12;
          return this.restartTimer();
        }
      }
    };

    TimeAgo.prototype.timeAgoInWords = function(timeString) {
      var absolutTime;
      absolutTime = this.parse(timeString);
      return "" + this.options.lang.suffix + this.options.lang.prefixes.ago + (this.distanceOfTimeInWords(absolutTime));
    };

    TimeAgo.prototype.parse = function(iso8601) {
      var timeStr;
      timeStr = $.trim(iso8601);
      timeStr = timeStr.replace(/\.\d\d\d+/, "");
      timeStr = timeStr.replace(/-/, "/").replace(/-/, "/");
      timeStr = timeStr.replace(/T/, " ").replace(/Z/, " UTC");
      timeStr = timeStr.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
      return new Date(timeStr);
    };

    TimeAgo.prototype.getTimeDistanceInMinutes = function(absolutTime) {
      var timeDistance;
      timeDistance = new Date().getTime() - absolutTime.getTime();
      return Math.round((Math.abs(timeDistance) / 1000) / 60);
    };

    TimeAgo.prototype.distanceOfTimeInWords = function(absolutTime) {
      var dim;
      dim = this.getTimeDistanceInMinutes(absolutTime);
      if (dim === 0) {
        return "" + this.options.lang.prefixes.lt + " " + this.options.lang.units.minute;
      } else if (dim === 1) {
        return "" + this.options.lang.prefixes.about + " " + this.options.lang.units.minute;
      } else if (dim === 2) {
        return "" + this.options.lang.prefixes.about + " " + this.options.lang.units.two_minutes;
      } else if (dim >= 3 && dim <= 10) {
        return "" + dim + " " + this.options.lang.units.minutes;
      } else if (dim >= 11 && dim <= 50) {
        return "" + dim + " " + this.options.lang.units.minute;
      } else if (dim >= 51 && dim <= 89) {
        return "" + this.options.lang.prefixes.about + " "  + this.options.lang.units.hour;
      } else if (dim >= 90 && dim <= 149) {
        return "" + this.options.lang.prefixes.about + " " + this.options.lang.units.two_hours;
      } else if (dim >= 150 && dim <= 599) {
        return "" + (Math.round(dim / 60)) + " " + this.options.lang.units.hours;
      } else if (dim >= 600 && dim <= 1439) {
        return "" + (Math.round(dim / 60)) + " " + this.options.lang.units.hour;
      } else if (dim >= 1440 && dim <= 2519) {
        return "" + this.options.lang.prefixes.about + " " + this.options.lang.units.day;
      } else if (dim >= 2520 && dim <= 3959) {
        return "" + this.options.lang.prefixes.about + " " + this.options.lang.units.two_days;
      } else if (dim >= 3960 && dim <= 14399) {
        return "" + (Math.round(dim / 1440)) + " " + this.options.lang.units.days;
      } else if (dim >= 14400 && dim <= 43199) {
        return "" + (Math.round(dim / 1440)) + " " + this.options.lang.units.day;
      } else if (dim >= 43200 && dim <= 86399) {
        return "" + this.options.lang.prefixes.about + " " + this.options.lang.units.month;
      } else if (dim >= 86400 && dim <= 129599) {
        return "" + this.options.lang.prefixes.about + " " + this.options.lang.units.two_months;
      } else if (dim >= 129600 && dim <= 431999) {
        return "" + (Math.round(dim / 43200)) + " " + this.options.lang.units.months;
      } else if (dim >= 432000 && dim <= 525599) {
        return "" + (Math.round(dim / 43200)) + " " + this.options.lang.units.month;
      } else if (dim >= 525600 && dim <= 655199) {
        return "" + this.options.lang.prefixes.about + " " + this.options.lang.units.year;
      } else if (dim >= 655200 && dim <= 914399) {
        return "" + this.options.lang.prefixes.over + " " + this.options.lang.units.year;
      } else if (dim >= 914400 && dim <= 1051199) {
        return "" + this.options.lang.prefixes.almost + " " + this.options.lang.units.two_years;
      } else if (dim >= 1051200 && dim <= 5184000) {
        return "" + (Math.round(dim / 525600)) + " " + this.options.lang.units.years;
      } else {
        return "" + (Math.round(dim / 525600)) + " " + this.options.lang.units.year;
      }
    };

    return TimeAgo;

  })();

  $.fn.timeago = function(options) {
    if (options == null) {
      options = {};
    }
    return this.each(function() {
      var $this, data;
      $this = $(this);
      data = $this.data("timeago");
      if (!data) {
        return $this.data("timeago", new TimeAgo(this, options));
      } else if (typeof options === 'string') {
        return data[options]();
      }
    });
  };

  $.fn.findAndSelf = function(selector) {
    return this.find(selector).add(this.filter(selector));
  };

  $.fn.timeago.Constructor = TimeAgo;

  $.fn.timeago.defaults = {
    selector: 'time.timeago',
    attr: 'datetime',
    dir: 'up',
    lang: {
      units: {
        second: "ثانية",
        two_seconds: "ثانيتين",
        seconds: "ثواني",
        minute: "دقيقة",
        two_minutes: "دقيقتين",
        minutes: "دقائق",
        hour: "ساعة",
        two_hours: "ساعتين",
        hours: "ساعات",
        day: "يوم",
        two_days: "يومين",
        days: "أيام",
        month: "شهر",
        two_months: "شهرين",
        months: "أشهر",
        year: "سنة",
        two_years: "سنتين",
        years: "سنوات"
      },
      prefixes: {
        lt: "أقل من",
        about: "حوالي",
        over: "أكثر من",
        almost: "قرابة",
        ago: ""
      },
      suffix: 'منذ '
    }
  };

}).call(this);

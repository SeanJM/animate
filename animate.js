/* ------------- Animate v1.1.1 */
// MIT License
// Original Code by Sean MacIsaac

function animate(el) {
  return {
    getCssProperty: function (property) {
      var arr     = ['','ms','webkit','Moz','O'];
      var style   = window.getComputedStyle(el[0]);
      var r;
      function capitalize(str) {
        return str[0].toUpperCase()+str.substr(1,str.length-1);
      }
      if (style !== null) {
        for (var i=0;i < arr.length;i++) {
          if (arr[i].length < 1) {
            r = property;
          } else {
            r = arr[i]+capitalize(property);
          }
          if (typeof style[r] === 'string') {
            return style[r];
          }
        }
      }
      return false;
    },
    getTime: function () {
      var obj = {
        duration : 0,
        delay    : 0
      };
      // For IE 8
      if (typeof window.getComputedStyle === 'function') {
        obj.duration  = animate(el).jsTime(animate(el).getCssProperty('transitionDuration'));
        obj.delay     = animate(el).jsTime(animate(el).getCssProperty('transitionDelay'));

        if (obj.delay === 0 && obj.duration === 0) {
          obj.duration  = animate(el).jsTime(animate(el).getCssProperty('animationDuration'));
          obj.delay     = animate(el).jsTime(animate(el).getCssProperty('animationDelay'));
        }
      }
      return obj;
    },
    jsTime: function (style) {
      if (style) {
        return parseFloat(style.match(/([0-9]+(\.[0-9]+|))s/)[1])*1000;
      } else {
        return 0;
      }
    },
    start: function (callback) {
      return animate(el).init('in',callback);
    },
    end: function (callback) {
      return animate(el).init('out',callback);
    },
    custom: function (name,callback) {
      var time = animate(el).getTime();
      setTimeout(function () {
        el.removeClass(name);
        if (typeof callback === 'function') {
          callback(el);
        }
      },time.duration+time.delay);
      el.addClass(name);
      return el;
    },
    classSwitch: function (arr) {
      el.removeClass('is-animated_'+arr[1]);
      el.addClass('is-animated_'+arr[0]);
      return animate(el);
    },
    ifOut: function (direction,arr,callback) {
      var time = animate(el).getTime();
      setTimeout(function () {
        if (direction === 'out') {
          el.removeClass('is-animated_'+arr[0]);
        }
        if (typeof callback === 'function') {
          callback(el);
        }
      },time.duration+time.delay);
      return animate(el);
    },
    init: function (direction,callback) {
      if (typeof el[0] === 'undefined') {
        return false;
      } else {
        var arr = (direction === 'out')?['out','in']:['in','out'];
        function exe() {
          animate(el).classSwitch(arr).ifOut(direction,arr,callback);
        }
        if (direction === 'in') {
          exe();
        } else if (direction === 'out' && el.hasClass('is-animated_in')) {
          exe();
        }
        return el;
      }
    },
    scroll: function () {
      var time   = 70;
      var pos    = el.offset().top-20;
      var start  = window.pageYOffset;
      var i      = 0;
      var frames = 20;

      function s() {
        i++;
        window.scrollTo(0,(start-((start/frames)*i))+((pos/frames)*i));
        if (i<frames) {
          setTimeout(function () {
            s();
          },(time/frames));
        }
      };
      s();
    }
  }
};
//@ sourceURL=animate.js

/* ------------- Animate v1.1.8 */
// MIT License
// Original Code by Sean MacIsaac

function animate(el) {
  function getCssProperty(property) {
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
  }
  function jsTime(style) {
    if (style) {
      return parseFloat(style.match(/([0-9]+(\.[0-9]+|))s/)[1])*1000;
    } else {
      return 0;
    }
  }
  function getTime() {
    var obj = {
      duration : 0,
      delay    : 0
    };
    // For IE 8
    if (typeof window.getComputedStyle === 'function') {
      obj.duration  = jsTime(getCssProperty('transitionDuration'));
      obj.delay     = jsTime(getCssProperty('transitionDelay'));

      if (obj.delay === 0 && obj.duration === 0) {
        obj.duration  = jsTime(getCssProperty('animationDuration'));
        obj.delay     = jsTime(getCssProperty('animationDelay'));
      }
    }
    return obj.duration+obj.delay;
  }
  return {
    getTime: function () {
      return getTime();
    },
    start: function (callback) {
      return animate(el).init('in',callback);
    },
    end: function (callback) {
      return animate(el).init('out',callback);
    },
    custom: function (name,callback) {
      el.addClass(name);
      var time = getTime();
      setTimeout(function () {
        el.removeClass(name);
        if (typeof callback === 'function') {
          callback(el);
        }
      },time);
      return el;
    },
    toggle: function () {
      if (el.hasClass('_animated-in')) {
        animate(el).end();
      } else {
        animate(el).start();
      }
    },
    ifOut: function (direction,callback) {
      var time = getTime();
      setTimeout(function () {
        if (direction === 'out') {
          el.removeClass('_animated-out');
        }
        if (typeof callback === 'function') {
          callback(el);
        }
      },time);
      return animate(el);
    },
    init: function (direction,callback) {
      if (typeof el[0] === 'undefined') {
        return false;
      } else {
        function exe() {
          if (direction === 'in') {
            el.removeClass('_animated-out');
            el.addClass('_animated-in');
          } else {
            el.addClass('_animated-out');
            el.removeClass('_animated-in');
          }
          animate(el).ifOut(direction,callback);
        }
        exe();
        return el;
      }
    },
    scroll: function () {
      var time   = 70;
      var pos    = (el.offset().top-el.height()/2)-($(window).height()/2);
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
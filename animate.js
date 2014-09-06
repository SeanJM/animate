//@ sourceURL=animate.js

/* 
  Name   : Animate
  Version: 1.2.0
  License: MIT License
  By     : Sean MacIsaac
*/

;function animate(el) {
  var options = {
    'class' : '_animated',
    'in'    : '-in',
    'out'   : '-out'
  }
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
  function init() {
    // Remove the nesting of the arguments from being passed inside an array
    var arr = Array.prototype.slice.apply(arguments[0]);
    $.each(arr,function (i,k) {
      if (typeof k === 'function') {
        options.callback = k;
      } else if (typeof k === 'object') {
        options = $.extend(options,k);
      } else if (typeof k === 'string') {
        options['class'] = k;
      }
    });
    function toggle() {
      if (options['direction'] === 'in') {
        el.removeClass(options['class'] + options['out']);
        el.addClass(options['class'] + options['in']);
      } else {
        el.addClass(options['class'] + options['out']);
        el.removeClass(options['class'] + options['in']);
      }
      setTimeout(function () {
        if (options.direction === 'out') {
          el.removeClass(options['class'] + options['out']);
        }
        if (typeof options.callback === 'function') {
          options.callback(el);
        }
      },getTime());
    }
    if (typeof el[0] === 'undefined') {
      return false;
    } else {
      toggle();
      return el;
    }
  }
  return {
    animatedIn: function () {
      return (el.hasClass(inClass));
    },
    animatedOut: function () {
      return (el.hasClass(outClass));
    },
    start: function (string) {
      options['direction'] = 'in';
      return init(arguments);
    },
    end: function () {
      options['direction'] = 'out';
      return init(arguments);
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
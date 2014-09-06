//@ sourceURL=animate.js

/* 
  Name   : Animate
  Version: 1.2.1
  License: MIT License
  By     : Sean MacIsaac
*/

// animate(options||string).start(el,callback);
// var editIn = animate('edit');
;function animate() {
  var options = {
    'class' : '_animated',
    'start'    : '-in',
    'end'   : '-out'
  }
  var arr = Array.prototype.slice.apply(arguments);
  for (var i = 0;i < arr.length;i++) {
    if (typeof arr[i] === 'string') {
      options['class'] = arr[i];
    } else if (typeof arr[i] === 'object') {
      $.extend(options,arr[i]);
    }
  }
  function getCssProperty(el,property) {
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
  function getTime(el) {
    var obj = {
      duration : 0,
      delay    : 0
    };
    // For IE 8
    if (typeof window.getComputedStyle === 'function') {
      obj.duration  = jsTime(getCssProperty(el,'transitionDuration'));
      obj.delay     = jsTime(getCssProperty(el,'transitionDelay'));

      if (obj.delay === 0 && obj.duration === 0) {
        obj.duration  = jsTime(getCssProperty(el,'animationDuration'));
        obj.delay     = jsTime(getCssProperty(el,'animationDelay'));
      }
    }
    return obj.duration+obj.delay;
  }
  function init() {
    // Remove the nesting of the arguments from being passed inside an array
    var arr = Array.prototype.slice.apply(arguments[0]);
    var el;
    $.each(arr,function (i,k) {
      if (typeof k === 'function') {
        options.callback = k;
      } else if (typeof k === 'object') {
        el = $.extend(options,k);
      }
    });
    function toggle() {
      if (options['direction'] === 'in') {
        el.removeClass(options['class'] + options['end']);
        el.addClass(options['class'] + options['start']);
      } else {
        el.addClass(options['class'] + options['end']);
        el.removeClass(options['class'] + options['start']);
      }
      setTimeout(function () {
        if (options.direction === 'out') {
          el.removeClass(options['class'] + options['end']);
        }
        if (typeof options.callback === 'function') {
          options.callback(el);
        }
      },getTime(el));
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
      return (el.hasClass(options['class'] + options['start']));
    },
    animatedOut: function () {
      return (el.hasClass(options['class'] + options['end']));
    },
    start: function () {
      options['direction'] = 'in';
      return init(arguments);
    },
    end: function () {
      options['direction'] = 'out';
      return init(arguments);
    },
    scroll: function (el) {
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
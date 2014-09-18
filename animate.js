//@ sourceURL=animate.js

/* 
  Name   : Animate
  Version: 1.2.4
  License: MIT License
  By     : Sean MacIsaac
*/

// animate(options||string).start(el,callback);
// var editIn = animate('edit');
;function animate() {
  var options = {
    'class' : '_animated',
    'start' : '-in',
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
  function matchArray(arr,string) {
    var out = false;
    for (var i = 0;i < arr.length;i++) {
      if (arr[i].match(new RegExp(string,'i')) !== null) {
        out = true;
      }
    }
    return out;
  }
  function endName(el) {
    var arr = [];
    // from bootstrap (ish)
    var eventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend',
      'WebkitAnimation'  : 'webkitAnimationEnd',
      'MozAnimation'     : 'animationend',
      'OAnimation'       : 'oAnimationEnd',
      'animation'        : 'animationend',
    }
    for (var name in eventNames) {
      if (typeof el[0].style[name] !== 'undefined' && !matchArray(arr,eventNames[name])) {
        arr.push(eventNames[name]);
      }
    }
    if (arr.length) {
      return arr;
    } else {
      return false;
    }
  }
  function trigger(el,callback) {
    var end = endName(el);
    if (end) {
      for (var i = 0;i<end.length;i++) {
        el[0].addEventListener(end[i], callback, false);
      }
    } else {
      callback();
    }
  }
  function init() {
    // Remove the nesting of the arguments from being passed inside an array
    var arr = Array.prototype.slice.apply(arguments[0]);
    var el;
    $.each(arr,function (i,k) {
      if (typeof k === 'function') {
        options.callback = k;
      } else if (typeof k === 'object') {
        el = k;
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
      // 
      trigger(el,function () {
        if (options.direction === 'out') {
          el.removeClass(options['class'] + options['end']);
        }
        if (typeof options.callback === 'function') {
          options.callback(el);
        }
      });
    }
    if (typeof el[0] === 'undefined') {
      return false;
    } else {
      toggle();
      return el;
    }
  }
  return {
    animatedIn: function (el) {
      return (el.hasClass(options['class'] + options['start']));
    },
    animatedOut: function (el) {
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
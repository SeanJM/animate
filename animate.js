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
  function getName(el,eventNames) {
    var arr = [];
    // from bootstrap (ish)
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
    var end = getName(el,{
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd',
      'transition'       : 'transitionend',
      'WebkitAnimation'  : 'webkitAnimationEnd',
      'MozAnimation'     : 'animationend',
      'OAnimation'       : 'oAnimationEnd',
      'animation'        : 'animationend',
    });
    if (end) {
      for (var i = 0;i<end.length;i++) {
        el[0].removeEventListener(end[i], callback, false);
        el[0].addEventListener(end[i], callback, false);
      }
    } else {
      callback();
    }
  }
  function init(el,direction,callback) {
    // Remove the nesting of the arguments from being passed inside an array
    function toggle(el) {
      if (direction === 'in') {
        el.removeClass(options['class'] + options['end']);
        el.addClass(options['class'] + options['start']);
      } else if (el.hasClass(options['class'] + options['start'])) {
        el.addClass(options['class'] + options['end']);
        el.removeClass(options['class'] + options['start']);
      }
      // 
      trigger(el,function () {
        if (direction === 'out') {
          el.removeClass(options['class'] + options['end']);
        }
        if (typeof callback === 'function') {
          callback(el);
        }
      });
      return el;
    }
    if (!el.size()) {
      return false;
    } else {
      return toggle(el);
    }
  }
  return {
    animatedIn: function (el) {
      return (el.hasClass(options['class'] + options['start']));
    },
    animatedOut: function (el) {
      return (el.hasClass(options['class'] + options['end']));
    },
    start: function (el,callback) {
      return init(el,'in',callback);
    },
    end: function (el,callback) {
      return init(el,'out',callback);
    },
    scroll: function (parent,pos) {
      var time   = 70;
      var start;
      var i      = 0;
      var frames = 20;
      var pos;

      if (parent === window) {
        start = window.pageYOffset
      } else {
        start = parent.offset().top;
      }

      function s() {
        i++;
        parent.scrollTo(0,(start-((start/frames)*i))+((pos/frames)*i));
        if (i<frames) {
          setTimeout(function () {
            s();
          },(time/frames));
        }
      };
      if (parent !== window) {
        parent = parent[0];
      }
      s();
    }
  }
};
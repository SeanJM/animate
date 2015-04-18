/* 
  Name    : Animate
  Version : 1.5.1
  License : MIT License
  By      : Sean MacIsaac
*/

;function animate() {
  var options = {
    protected: {
      className : '_animated',
      start     : '--in',
      end       : '--out'
    }
  };
  for (var i = 0;i < arguments.length;i++) {
    if (typeof arguments[i] === 'string') {
      options.protected.className = arguments[i];
    } else {
      $.extend(options.protected, arguments[i]);
    }
  }
  return animate.compose(options);
}

animate.compose = function (options) {
  function extend(k) {
    return function () {
      return animate.fn[k].apply(options, arguments);
    }
  }
  for (var k in animate.fn) {
    options[k] = extend(k);
  }
  return options;
};

animate.fn = {};

animate.fn.is = function (el) {
  var start = el.hasClass(this.protected.className + this.protected.start);
  var end   = el.hasClass(this.protected.className + this.protected.end);
  if (start) {
    return 'start';
  } else if (end) {
    return 'end';
  } else {
    return false;
  }
};

animate.getTime = function(element) {
  var animation = ['animation', 'transition'];
  var time      = [];
  function add(member) {
    var temp = element.css(member);
    if (typeof temp === 'string') {
      return (parseFloat(temp.split(' ')[1], 10) + parseFloat(temp.split(' ')[3], 10)) * 1000;
    }
    return 0;
  }
  for (var i = 0; i < animation.length; i++) {
    time.push(add(animation[i]));
  }
  time.sort(function (a, b) {
    return a - b;
  });
  return time[1];
};

animate.fn.trigger = function (element, callback) {
  var $this = this;
  var time  = animate.getTime(element);
  setTimeout(function () {
    callback.call($this);
  }, time);
};

animate.clean = function () {
  if (typeof this.callback === 'function') {
    this.callback.call(this);
  }
  if (this.type === 'end') {
    this.element.removeClass(this.addClass);
  }
};

animate.startEnd = function () {
  var className    = this.protected.className;
  var $this        = this;
  this.removeClass = className + this.protected[{start: 'end', end: 'start'}[this.type]];
  this.addClass    = className + this.protected[{start: 'start', end: 'end'}[this.type]];
  this.element.removeClass(this.removeClass);
  this.element.addClass(this.addClass);
  this.trigger(this.element, animate.clean);
  return this.element;
};

animate.fn.start = function (el, callback) {
  this.type     = 'start';
  this.callback = callback;
  this.element  = el;
  return animate.startEnd.call(this);
};

animate.fn.end = function (el, callback) {
  this.type     = 'end';
  this.callback = callback;
  this.element  = el;
  return animate.startEnd.call(this);
};

animate.findParent = function (el) {
  var parent = el.parent();
  while (!parent.is('body')) {
    if (/scroll/.test(parent.css('overflow'))) {
      return parent;
    }
    parent = parent.parent();
  }
  return $(window);
};

animate.fn.scroll = function (el) {
  var parent = animate.findParent(el);
  var start  = parent.scrollTop();
  var pos    = el.offset().top - start - 100;
  var time   = 200;
  var frames = 20;
  function s(i) {
    var scrollTop = start + ((pos / frames) * i);
    parent.scrollTop(scrollTop);
    if (i < frames) {
      setTimeout(function () {
        s(i + 1);
      },(time / frames));
    }
  }
  s(0);
};
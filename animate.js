/* ------------- Animate v1.0 */

// MIT License

// Original Code by Sean MacIsaac

function animate(el) {
  return {
    getCssProperty: function (property) {
      var arr     = ['','ms','webkit','Moz','O'];
      var style   = window.getComputedStyle(el[0]);
      var p;
      var r;
      function capitalize(str) {
        return str[0].toUpperCase()+str.substr(1,str.length-1);
      }
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
      return false;
    },
    getTime: function () {
      var style = window.getComputedStyle(el[0]);
      var obj = {};

      obj.duration  = animate(el).jsTime(animate(el).getCssProperty('transitionDuration'));
      obj.delay     = animate(el).jsTime(animate(el).getCssProperty('transitionDelay'));

      if (obj.delay === 0 && obj.duration === 0) {
        obj.duration  = animate(el).jsTime(animate(el).getCssProperty('animationDuration'));
        obj.delay     = animate(el).jsTime(animate(el).getCssProperty('animationDelay'));
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
    init: function (direction) {
      function animDirection() {
        var time;
        var arr = (direction === 'out')?['out','in']:['in','out'];
        function exe() {
          el.removeClass('is-animated_'+arr[1]);
          el.addClass('is-animated_'+arr[0]);
          time = animate(el).getTime();
          setTimeout(function () {
            el.removeClass('is-animated_'+arr[0]);
            if (direction === 'in') {
              el.addClass('is-animated');
            } else {
              el.removeClass('is-animated');
            }
          },time.duration+time.delay);
        }
        if (direction === 'in') {
          exe();
        } else if (direction === 'out' && el.hasClass('is-animated')) {
          exe();
        }
      }
      animDirection(direction);
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
}
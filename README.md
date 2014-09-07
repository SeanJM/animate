# Animate 1.2.1
The MIT License (MIT)

#### Requirements

- jQuery

### Documentation

#### The Problem

###### CSS

    .menu {
      left       : -10000px;
      opacity    : 0;
      overflow   : hidden;
      position   : absolute;
      transition : opacity 0.3s;
    }

    .menu._animated-in {
      opacity    : 1;
      left       : 0;
    }


When we add `._animated-in`, we get a nice opacity transition--but take it away, and the menu disapears. This is where the script comes into play.

We need an outro class inbetween the hidden state and the visible state. Which is removed once the animation is finished.

#### The Intro Animation

###### JavaScript

    animate().start(el[,callback]);
    animate().out(el[,callback]);

In the case of the outro animation the callback is executed after the animation.

###### CSS

    .menu {
      position   : absolute;
      left       : -10000px;
      opacity    : 0;
      transition : opacity 0.3s;
    }

    .menu._animated-in,
    .menu._animated-out {
      left       : 0;
    }

    .menu._animated-in {
      opacity    : 1;
    }

#### Overriding all defaults with an object

##### 1. Custom class name

###### JavaScript

    var custom = animate('class-name');

    custom.start(el[,callback]);
    custom.end(el[,callback]);

##### 2. Override defaults

###### JavaScript

    var override = animate({
      'class' : '_override',
      'start' : '--in',
      'end'   : '--out'
    });

    override.start(el[,callback]);
    override.end(el[,callback]);

###### CSS

    .menu { ... }

    .menu._override--in,
    .menu._override--out { ... }
    .menu._override--in { ... }

##### 3. Mix and match

    var override = animate('class-name',{'start':'--in','end':'--out'});

The order of the arguments does not matter, you could even call it like this:

    var override = animate({'start':'--in','end':'--out'},'class-name');

#### Support

It has been tested with Chrome, Firefox and IE 8+
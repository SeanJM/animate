# Animate
###### VERSION: 1.0

###### The MIT License (MIT)

###### This script requires jQuery

### Documentation

#### The Problem

If you have a menu and you want to toggle it's visibility and transition those states.
eg:

    .menu {
      height: 0;
      opacity: 0;
      overflow: hidden;
      transition: opacity 0.3s;
    }

    .menu._animated-in {
      height: 100%;
      opacity: 1;
    }

Here, when we remove the class ._animated-in from the .menu, instead of getting our opacity transition--the menu disapears instantly because it's being cropped.

Or, another example; which is my personal choice for the visibility toggle:

    .menu {
      left: -10000px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      transition: opacity 0.3s;
    }

    .menu._animated-in {
      opacity: 1;
      left: 0;
    }


When we add ._animated-in, we get a nice opacity transition--but take it away, and the menu disapears instantly.

So, the problem is fairly clear--we need an outro class inbetween the hidden state and the visible state. This is where this script comes in, solving this problem.

#### The Intro Animation

When you have an element which you want to be animated, let's say a toggle for a dropdown menu.
You would want to have it's 'start' animated. You would then do:

    animate(el).start();

This would add a class of '_animated-in' to the selected element.

#### Example CSS

    .menu {
      position: absolute;
      left: -10000px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .menu._animated-in,
    .menu._animated-out {
      left:0;
    }
    .menu._animated-in {
      opacity: 1;
    }

The default state of .menu would be hidden. The 'start' state ensures that when the intro animation is complete, it will remain visible.

#### The Outro Animation

When I want to dismiss the .menu, I would do

    animate(el).end();

It would remove the class '_animated-in' and add the '_animated-out' for the duration of the transition, which is 0.3s. Once the duration runs out, the class '_animated-out' will be removed, restoring the element back to the default state of invisible.

#### The Callback

    animate(el).end(function (el) {
      // Callback
    });

    animate(el).start(function (el) {
      // Callback
    });

Both 'start' and 'end' support a callback function which is executed after the transition is complete. The argument supplied is the original element.

#### Custom

The custom method will add 'class-name' to the selected element and remove that class once the animation is complete.

    animate(el).start('class-name',function (el) {
      // Callback
    });

When using a string as an argument this custom class name for 'start' will get '-in' appended to it.

    .class-name-in

animate(el).end('class-name',function (el) {
      // Callback
    });

When using a string as an argument this custom class name for 'end' will get '-out' appended to it.

    .class-name-out

#### Overriding all defaults with an object

  animate(el).start({
    'class' : '_animated',
    'in'    : '-in',
    'out'   : '-out'
  },function () { //calback });

  animate(el).start({
    'class' : 'animated',
    'in'    : 'In',
    'out'   : 'Out'
  },function () { //calback });

This would transform the 'start' class to be 'animatedIn' and the 'end' class to be 'animatedOut'

#### Argument order

The order of the arguments does not matter, you could even call it like this:

    animate(el).start('custom-class',{'in':'_start','out':'_end'},function () {});

or

    animate(el).start(function () {},{'in':'_start','out':'_end'},'custom-class');

or

    animate(el).start('custom-class');

This renders the code more flexible to your style

#### Why

Having intro states and active states as well as outro states is not fun to do in CSS and you would need JavaScript anyways. I decided to create a reusable library that I could rely on for many different projects.

In browsers where there is no transition property, the default delay to switch out states is 0--meaning no transition.

#### Support

It has been tested with Chrome, Firefox and IE 8+
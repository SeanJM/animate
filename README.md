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
      -webkit-transition: opacity 0.3s;
      -moz-transition: opacity 0.3s;
      -ms-transition: opacity 0.3s;
      -o-transition: opacity 0.3s;
      transition: opacity 0.3s;
    }

    .menu.is-active {
      height: 100%;
      opacity: 1;
    }

Here, when we remove the class .is-active from the .menu, instead of getting our opacity transition--the menu disapears instantly because it's being cropped.

Or, another example; which is my personal choice for the visibility toggle:

    .menu {
      left: -10000px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      -webkit-transition: opacity 0.3s;
      -moz-transition: opacity 0.3s;
      -ms-transition: opacity 0.3s;
      -o-transition: opacity 0.3s;
      transition: opacity 0.3s;
    }

    .menu.is-active {
      left: 0;
      opacity: 1;
    }

When we add .is-active, we get a nice opacity transition--but take it away, and the menu disapears instantly.

So, the problem is fairly clear--we need an outro class inbetween the hidden state and the visible state. This is where this script comes in, solving this problem.

#### The Intro Animation

When you have an element which you want to be animated, let's say a toggle for a dropdown menu.
You would want to have it's 'in' animated. You would then do:

    animate(el).in();

This would add a class of 'is-animated_in' to the selected element.

#### Example CSS

    .menu {
      position: absolute;
      left: -10000px;
      opacity: 0;
      -webkit-transition: opacity 0.3s;
      -moz-transition: opacity 0.3s;
      -ms-transition: opacity 0.3s;
      -o-transition: opacity 0.3s;
      transition: opacity 0.3s;
    }

    .menu.is-animated_in {
      left:0;
      opacity: 1;
    }

    .menu.is-animated_out {
      left:0;
      opacity: 0;
    }

The default state of .menu would be hidden. The 'in' state ensures that when the intro animation is complete, it will remain visible.

#### The Outro Animation

When I want to dismiss the .menu, I would do

    animate(el).out();

It would remove the class 'is-animated_in' and add the 'is-animated_out' for the duration of the transition, which is 0.3s. Once the duration runs out, the class 'is-animated_out' will be removed, restoring the element back to the default state of invisible.

#### The Callback

    animate(el).out(function (el) {
      // Callback
    });

    animate(el).in(function (el) {
      // Callback
    });

Both 'in' and 'out' support a callback function which is executed after the transition is complete. The argument supplied is the original element.

#### Chaining

Both 'in' and 'out' return the origin element so they can be chained just like any regular jQuery function call:

    animate(el).in().addClass('is-active')
    // Or
    animate(el).out().removeClass('is-active')

#### Why

Having intro states and active states as well as outro states is not fun to do in CSS and you would need JavaScript anyways. I decided to create a reusable library that I could rely on for many different projects.

In browsers where there is no transition property, the default delay to switch out states is 0--meaning no transition.

#### Support

It has been tested with Chrome, Firefox and IE 8+
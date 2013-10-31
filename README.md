# Animate
###### VERSION: 1.0

###### The MIT License (MIT)

###### This script requires jQuery

### Documentation

#### The Intro Animation

When you have an element which you want to be animated, let's say a toggle for a dropdown menu.
You would want to have it's 'in' animated. You would then do:

    animate(el).init('in');

This would do 2 things, it would add a class of is-animated_in to the selected element for the
duration of it's 'animation' or 'transition' property. And once the 'animation' or 'transition' was
complete, it would add a new class 'is-animated'.

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

    .menu.is-animated,
    .menu.is-animated_in {
      left:0;
      opacity: 1;
    }

    .menu.is-animated_out {
      left:0;
      opacity: 0;
    }

The default state of .menu would be hidden. The 'in' state and the 'is-animated' state are the same,
so that when the intro animation is complete, it will remain visible.

#### The Outro Animation

When I want to dismiss the .menu, I would do

    animate(el).init('out');

This would also do 2 things. It would remove the class 'is-animated' and add the 'is-animated_out' for the duration of the transition, which is again 0.3s. Once the duration runs out, the class 'is-animated_out' will be removed.

So, why did I make this?

Having intro states and active states as well as outro states is not fun to do in CSS and you would need JavaScript anyways. I decided to create a reusable library that I could rely on for many different projects.

In browsers where there is no transition property, the default delay to switch out states is 0--meaning no transition.

#### Support

It has been tested with Chrome, Firefox and IE 8+
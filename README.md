# javascript-fun
fun addons in javascript or typescript

## RGB Party Mode

#### Usage

    rgbPartyEffect(elementId:string, speed:number=20, backgroundReset:string='black', start_color:number =0, end_color:number =1)

Include rgb-class.js in a <script> tag in your HTML file before using the class.

The effect works by passing a string for the id of a given element into the class constructor.

Call toggleActive() and the element with the id you provided will begin to cycle through Red, Green, and Blue background colors.


Parameters:

    elementId
The string for the element you want to have the effect on
    speed
How often the background changes color per frame.  This is passed into setInterval.
    backgroundReset
The color, currently one of the named colors in CSS, for the element when you turn off the effect using toggleActive().
    start_color
Unused legacy code
    end_color
Unused legacy code



    rgb-class.ts

Used to generate the javascript file

    rgb-class.js

Defines the rgbPartyEffect class

    rgb-usage.js

An example of how to use the rgbPartyEffect

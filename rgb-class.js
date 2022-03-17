"use strict";
/**********************************************
*               rgb-class.ts                  *
* defines the class for an RGB Party Effect   *
* Copyright (c) 2022 Joe Bussard              *
* Licensed under GNU GPL 3.0                  *
* Include this file before using it           *
**********************************************/
class rgbPartyEffect {
    constructor(elementId, speed = 20, isBackground = false, backgroundReset = 'white', start_color = 0, end_color = 1) {
        if (this.elementId === null) {
            console.error('[RGBParty] Tried to make effect for undefined element %o', elementId);
            throw '[RGBParty] Invalid elementId passed';
            return;
        }
        if (typeof (elementId) == 'string') {
            if (document.getElementById(elementId)) {
                this.elementId = document.getElementById(elementId);
            }
            else {
                console.error('[RGBParty] Could not find HTMLElement with ID %s', elementId);
                throw '[RGBParty] HTMLElement does not exist in this DOM.';
                return;
            }
        }
        else {
            this.elementId = elementId;
        }
        this.start_color = start_color;
        this.end_color = end_color;
        this.speed = speed;
        this.intervalRate = speed;
        this.stepsPerFrame = 1;
        this.colorArray = [0, 0, 0];
        this.colorArray[start_color] = 255;
        this.activeNow = 0;
        this.backgroundReset = this.elementId.style.backgroundColor;
        this.foregroundReset = this.elementId.style.color;
        this.isBackground = isBackground;
        this.i = 0; // decreasing is the ID (0,1,2) of the color that was dominant and is fading out.
        this.j = 1; // increasing is the ID (0,1,2) of the color that is becoming dominant.
        console.log('[RGBParty] constructed effect for %s', this.elementId.id);
    }
    cycleRGB(self) {
        console.log('[RGBParty] [%s] rgb(%s)', self.elementId, self.colorArray.join(','));
        if (self.colorArray[self.i] * self.colorArray[self.j] < 1) {
            self.i = self.j;
            if (self.j == 2) {
                self.j = 0;
            }
            else
                self.j++;
        }
        self.colorArray[self.i] -= self.stepsPerFrame;
        self.colorArray[self.j] += self.stepsPerFrame;
        // I prefer not to have values outside of (0,255) even if the browser can interpret them.
        {
            if (self.colorArray[self.i] < 0)
                self.colorArray[self.i] = 0;
            if (self.colorArray[self.j] < 0)
                self.colorArray[self.j] = 0;
            if (self.colorArray[self.i] > 255)
                self.colorArray[self.i] = 255;
            if (self.colorArray[self.j] > 255)
                self.colorArray[self.j] = 255;
        }
        if (self.isBackground) {
            self.elementId.style.backgroundColor = `rgb(${self.colorArray.join(',')})`;
        }
        else {
            self.elementId.style.color = `rgb(${self.colorArray.join(',')})`;
        }
    }
    changeIntervalRate(intervalRate) {
        var self = this;
        this.intervalRate = intervalRate;
        if (this.activeNow == 1) {
            this.toggleActive(self);
            this.toggleActive(self);
        }
    }
    changeStepsPerFrame(stepsPerFrame) {
        var self = this;
        this.stepsPerFrame = stepsPerFrame;
        if (this.activeNow = 1) {
            this.toggleActive(self);
            this.toggleActive(self);
        }
    }
    toggleActive(self) {
        var self = self;
        self.activeNow = 1 - self.activeNow;
        //console.log(`[RGBParty] ${self.elementId.id} is ${self.activeNow ? 'ON' : 'OFF'}`)
        if (self.activeNow > 0) {
            self.intervalId = setInterval(self.cycleRGB, self.intervalRate, self);
        }
        else {
            self.elementId.style.backgroundColor = self.backgroundReset;
            self.elementId.style.color = self.foregroundReset;
            clearInterval(self.intervalId);
        }
    }
    turnOn() {
        var self = this;
        if (this.activeNow == 1) {
            console.warn('[RGBParty] %s is already on', this.elementId.id);
        }
        else {
            this.toggleActive(self);
        }
    }
    turnOff() {
        var self = this;
        if (this.activeNow == 0) {
            console.warn('[RGBParty] %s is already off', this.elementId.id);
        }
        else {
            this.toggleActive(self);
        }
    }
}

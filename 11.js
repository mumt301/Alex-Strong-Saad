"use strict";

let autotunebutton=0;
let reverbbutton=0;

let reverb = new Pizzicato.Effects.Reverb({
    time: 5,
    decay: 5,
    reverse: false,
    mix: 0.0
});

// Turn theremin on
function thereminOn(oscillator) {
    oscillator.play();
}

// Control the theremin
function thereminControl(e, oscillator, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

    let minFrequency = 220.0;
    let maxFrequency = 880.0;
    let freqRange = maxFrequency - minFrequency;
    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

    if (autotunebutton=true) { thereminFreq = frequencyToMidi(thereminFreq);
       thereminFreq = midiToFrequency(thereminFreq); }
 
       // I have no idea why this code runs all the time, even when autotunebutton=false

    if (reverbbutton=true) { reverb.mix = 0.7}

    console.log("Frequency: ", thereminFreq);
    oscillator.frequency = thereminFreq;
    console.log("Volume: ", thereminVolume);
    oscillator.volume = thereminVolume;
 
    let frequency = document.getElementById("frequency");
    frequency.innerHTML = thereminFreq + " Hz";
    let note = document.getElementById("note");
    note.innerHTML = noteFromFrequency(thereminFreq, true);
}

// Turn theremin off
function thereminOff(oscillator) {
    oscillator.stop();
}

function runAfterLoadingPage() {
    // Instantiate a sine wave with pizzicato.js
    let oscillator = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: "sawtooth",
            frequency: 220
        }
    });

    var reverb = new Pizzicato.Effects.Reverb({
        time: 5,
        decay: 5,
        reverse: false,
        mix: 0.7
    });

    oscillator.addEffect(reverb);

    // Get the theremin div from the html
    const theremin = document.getElementById("thereminZone");

    // Theremin plays when the mouse enters the theremin div
    theremin.addEventListener("mouseenter", function () {
        thereminOn(oscillator);
    });

    // Theremin is controlled while the mouse is inside the theremin div
    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator, theremin);
    });

    // Theremin stops when the mouse leaves the theremin div
    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator);
    });
    
    const oscillatorType = document.getElementById("oscillatorType");

    oscillatorType.addEventListener('change', function () {

        console.log('hi', oscillatorType.value)
        oscillator = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: oscillatorType.value,
                frequency: 220
            }
        }); 
    });

    const autotunebutton = document.getElementById("autotunebutton");
    autotunebutton.addEventListener('change', function () {

        console.log('hi', autotunebutton.checked);
    }); 

     const reverbbutton = document.getElementById("reverbbutton");
    reverbbutton.addEventListener('change', function () {
        
        console.log('hello', reverbbutton.checked)
        }); 
        
}

window.onload = runAfterLoadingPage;
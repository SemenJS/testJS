window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    class Options {
        constructor(height, width, bg, fontSize, textAlign){
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
        }

        makeDiv(text){
            let div = document.createElement('div');
                div.textContent = text;
                div.style.cssText =
                `height: ${this.height};
                 width: ${this.width};
                 background-color: ${this.bg};
                 font-size: ${this.fontSize};
                 text-align: ${this.textAlign};`

            document.body.appendChild(div);     
        }
    }

    let opt = new Options('300px', '400px', 'red', '14px', 'center');
    opt.makeDiv('раз, два, три');

})































































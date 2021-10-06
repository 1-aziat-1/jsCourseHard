document.addEventListener('DOMContentLoaded',function(){

    'use strict';

        const divElement = document.createElement('div');

    function Domelement(selector, height, width, bg, fontSize){
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
    }

    Domelement.prototype.buildElement = function(){

        divElement.style.cssText = `height: ${this.height};
                             width: ${this.width};
                             background-color: ${this.bg};
                             font-size: ${this.fontSize};
                             position: absolute;
                            `; 
        if(this.selector.charAt(0) === '.'){
            divElement.className = this.selector.substring(1);
            return document.body.prepend(divElement);
        }
        if(this.selector.charAt(0) === '#'){
            divElement.id = this.selector.substring(1);
            return document.body.prepend(divElement);
        }

    };


    const nameClass = new Domelement('#vfvfdsaf','100px','100px','red','40px');
    nameClass.buildElement();
    
    let chisloHorizon = 0, chisloVertical = 0;
    const divStyle = function(){
        return function(event){
         if(event.key == 'ArrowRight'){
            divElement.style.left = `${chisloHorizon+=10}px`;
         }
         if(event.key == 'ArrowLeft'){
            divElement.style.left = `${chisloHorizon-=10}px`;
         }
         if(event.key == 'ArrowUp'){
             divElement.style.top = `${chisloVertical-=10}px`;
         }
         if(event.key == 'ArrowDown'){
             divElement.style.top = `${chisloVertical+=10}px`;
         }
        };
    };
    
    document.addEventListener('keydown', divStyle());

});



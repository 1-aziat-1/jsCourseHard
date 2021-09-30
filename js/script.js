'use strict';

document.querySelector('.change').addEventListener('click', function(){
    let randomChislo = '#' + (Math.floor(Math.random() * 16777216)).toString(16);
    document.querySelector('body').style.backgroundColor = randomChislo;
    document.querySelector('.color').textContent = randomChislo;
    document.querySelector('.change').style.color = randomChislo;
    return randomChislo;
});
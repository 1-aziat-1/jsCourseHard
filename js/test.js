'use strict';

let s = 1;

function fact(c){
  c--;
  if(c > 1){
    s=s*c;
    fact(c);
    return s;
  }
}


fact(5);
console.log('fact(5);: ', fact(5));
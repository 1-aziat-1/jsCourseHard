'use strict';

const one = function(a){
  if(typeof(a) === 'string'){
    let b = a.trim();
    console.log(b);
    if(b.length > 30){
       console.log(b.slice(0, 30).concat("","..."));
    };
  }else{
    alert("Введена не строка");
  }
};
let b = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa    ";
one(b);

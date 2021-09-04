"use strict";

const elemLang = document.querySelector('html');
const elemAtribut = elemLang.getAttribute('lang');
if(elemAtribut == 'ru'){
    console.log("понедельник, вторник, среда, четврг, пятница, суббота, воскресенье");
}else{
    console.log(   "monday, tuesday, wednesday, thursday, friday, saturday, sunday");
};

switch(elemAtribut){
    case 'ru':
        console.log("понедельник, вторник, среда, четврг, пятница, суббота, воскресенье");
        break;
    case 'en':
        console.log(   "monday, tuesday, wednesday, thursday, friday, saturday, sunday");
        break;
};



let arr = {
    "ru" : ["понедельник", "вторник", "среда", "четврг", "пятница", "суббота", "воскресенье"],
    "en" : ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
}



let namePerson = prompt('как ваше имя?', 'Артем');
let ifnamePerson = (namePerson == "Артем")? console.log("директор"): (namePerson == "Максм")? console.log("преподаватель"): console.log("студент");


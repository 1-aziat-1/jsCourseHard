"use strict";

function myTyme(){

let day = new Date();


let arrWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота","Воскресенье"];

let arrMonth = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];

const timeEnd = function(hour){
     
    let message = "";
    hour == 1 ? message = " час " : hour == 2 || hour == 3 || hour == 4 ?  message = " часа "  : message = " часов ";
    return message;
};

const pluseZero = function(chislo){

    let message = "";

    // chislo.toString.length == 1 ? message = "0" + chislo : message = chislo ; ПОЧЕМУ НЕ РАБОТАЕТ??

    String(chislo).length == 1 ? message = "0" + chislo : message = chislo ; 

    return message;
}



let str1 = "Сегодня " +  arrWeek[(day.getDay() + 6) % 7] + ", " + day.getDay() + " " +  arrMonth[day.getMonth()] + " " + day.getFullYear() + ", " + day.getHours() + timeEnd((day.getHours())) + day.getMinutes() + " минут " + day.getSeconds() + " секунды" ;

let str2 = pluseZero(day.getDay()) + "." + pluseZero(day.getMonth())  + "." +  day.getFullYear() + " - " + pluseZero(day.getHours()) + ":" + pluseZero(day.getMinutes()) + ":" + pluseZero(day.getSeconds());

document.querySelector('.time1').innerHTML = str1;
document.querySelector('.time2').innerHTML = str2;
}
setInterval(myTyme);
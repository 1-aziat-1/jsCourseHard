"use strict";

let money = 500;
let addExpenses = "Интернет, такси, Комуналка";
let deposit = true;
let mission = 10000;
let period= 3;
let income = "фриланс";
let num = 266219;
let SumNum = 0;
let sNum = num.toString().split('');
let arr = sNum.map(Number);
for (let i = 0; i < arr.length; i++) {
    SumNum += arr[i];
};
SumNum **=3;
console.log(SumNum.toString().substring(0,2));

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log("Период равен " + period+" месяцев");
console.log("Цель заработать " + mission+" рублей");

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(`, `));

let budgetDay = money/30;
console.log('budgetDay: ', budgetDay);

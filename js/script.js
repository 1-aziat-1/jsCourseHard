let arr = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота","Воскресенье"];


let date = new Date();
let chisloDate = (6 + date.getDay()) % 7;

for(let i = 0; i < arr.length; i++){
  if(arr[i] == "Суббота" || arr[i] == "Воскресенье"){
    arr[i] = arr[i].italics();
  }
  else if(arr[i] == arr[chisloDate]){
    arr[i] = arr[i].bold();
  } 
}
arr.forEach(item => document.write("<p>" + item + "<p>"));


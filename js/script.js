let arr = ["Воскресенье","Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];


let date = new Date();
let chisloDate = date.getDay();


for(let i = 0; i < arr.length; i++){
  if(arr[i] == "Суббота" || arr[i] == "Воскресенье"){
    arr[i] = arr[i].italics();
  }
  else if(arr[i] == arr[chisloDate]){
    arr[i] = arr[i].bold();
  } 
}
arr.forEach(item => document.write("<p>" + item + "<p>"));


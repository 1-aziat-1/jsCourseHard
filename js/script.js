let arr = ["Воскресенье","Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];


let date = new Date();
let chisloDate = date.getDay();


for(let i = 0; i < arr.length; i++){
  if(arr[i] == "Суббота" || arr[i] == "Воскресенье"){
    document.write("<p>" + arr[i].italics() + "<p>")
  }
  else if(arr[i] == arr[chisloDate]){
    document.write("<p>" + arr[i].bold() + "<p>")
  }
  else {
    document.write("<p>" + arr[i] + "<p>");
  };
}

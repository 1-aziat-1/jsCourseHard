'use strict';

let arr = [1, 2, 3, 4, 5, 6, 7];

// for(let i = 0; i<arr.length; i++){
//   if(arr[i] === 2 || arr[i] === 4){
//     console.log(arr[i]);
//   }
// }

arr.forEach(elem => {elem == 2 || elem == 4? console.log(elem):1});



let flag = true;
for(let i = 2; i < 100 ; i++){
  for(let j = 2; j < i; j++){
    if(i % j == 0){
      flag = false;
    }
  } 
  if(flag == true){
    console.log(i);
  }
  flag = true;
};






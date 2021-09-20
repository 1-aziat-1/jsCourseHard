'use strict';

  let start = document.getElementById('start'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      depositCheck = document.querySelector('#deposit-check'),
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      accumulatedMonthValue = document.getElementsByClassName('accumulated_month_value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesTitle = document.querySelector('.expenses-title[type="text"]'),
      expensesAmount = document.querySelector('.expenses-amount'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpenses = document.querySelector('.additional_expenses'),
      periodSelect = document.querySelector('.period-select'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      incomeItem = document.querySelectorAll('.income-items'),
      periodAmount = document.querySelector('.period-amount'),
      inputPlaceholder = document.getElementsByTagName('input');
      // inputPlaceholder = document.getElementsByClassName('income-title')[1];

  



  let isNumber = function(n){
      return !isNaN(parseFloat(n)) && isFinite(n);
  };




let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    incomeMonth: 0,
    deposit: false,
    moneyDeposit: 0,
    percentDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function(){
      
      appData.budget =  +salaryAmount.value;
      // appData.checkplaceholder();
      appData.getExpenses();
      appData.getIncome();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();
      appData.showResult();
      console.log(expensesTitle);
    },
    showResult: function(){
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = Math.ceil(appData.budgetDay);
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth()); //достижение цели
      incomePeriodValue.value = appData.calcPeriod();
      periodSelect.addEventListener('input', function(){
          incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
          return incomePeriodValue.value;
      });
    },
    addExpensesBlock: function(){   //Обязательные расходы: кнопка плюс;                          
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      for(let i = 0; i< cloneExpensesItem.childNodes.length; i++){
        cloneExpensesItem.childNodes[i].value = '';
      }
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
      }

    },
    addIncomeBlock: function(){   
      
      let cloneIncomeItem = incomeItem[0].cloneNode(true);
      for(let i = 0; i< cloneIncomeItem.childNodes.length; i++){
        cloneIncomeItem.childNodes[i].value = '';
      }
      incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItem = document.querySelectorAll('.income-items');
      if(incomeItem.length === 3){
        incomePlus.style.display = 'none';
      }

    },
    getExpenses: function(){                                      //Обязательные расходы: добавление в объект;
      expensesItems.forEach(function(item){                                     
        let itemExpenses = item.querySelector('.expenses-title').value; //Обязательные расходы: поле - наименование;
        let cashExpenses = item.querySelector('.expenses-amount').value;//Обязательные расходы: поле - сумма;
        if(itemExpenses !== '' && cashExpenses !== ''){
          appData.expenses[itemExpenses] = cashExpenses;
        }
        
      });
    },
    getIncome: function(){
      incomeItem.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){
          appData.income[itemIncome] = cashIncome;
        }
      });
        for(let key in appData.income){
          appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function(){                   //возможные расходы 
      let addExpenses = additionalExpensesItem.value.split(', ');
      addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
          appData.addExpenses.push(item);
        }
      });
    },
    getAddIncome: function(){                  //возсожный доход
      additionalIncomeItem.forEach(function(item){  
        let itemValue = item.value.trim();
        if (itemValue !== ''){
          appData.addIncome.push(itemValue);
        }
      });
    },
    getInfoDeposit: function(){
      if(appData.deposit){
        /* appData.percentDeposit = prompt('Какой годовой проццент?','10');
        appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000); */
        do{appData.percentDeposit = prompt('Какой годовой проццент?', '10');
          }while(!isNumber(appData.percentDeposit));
        do{appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
          }while(!isNumber(appData.moneyDeposit));
      }
    },
    getExpensesMonth: function (){

        for( let key in  appData.expenses){
          appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function(){
          appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;   //бюджет на месяц
          appData.budgetDay = appData.budgetMonth / 30;   //бюджет на день
    },
    getTargetMonth: function(){ //достижение цели
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function(){
          if(appData.budgetDay>1200){
            console.log("У вас высокий уровень дохода");
          }else if(appData.budgetDay>600 && appData.budgetDay<1200){
            console.log("У вас средний уровень дохода");
          }else if(appData.budgetDay>0 && appData.budgetDay<600){
            console.log("К сожалению у вас уровень дохода ниже среднего");
          }else{
            console.log("Что то пошло не так");
          }
    },
    calcPeriod: function () {
      return appData.budgetMonth * periodSelect.value;
    },
    // checkplaceholder: function () {
    //   for(let i = 0; i < inputPlaceholder.length; i++){
    //     if(inputPlaceholder.attr("placeholder") === "Наименование"){
    //       inputPlaceholder.addEventListener('input', ()=>{
    //         inputPlaceholder.value = inputPlaceholder.value.replace(/[^а-я]/,'');
    //       });
    //     }
    //   }
    // },

};


start.addEventListener('click', function(){
    if(salaryAmount.value === ''){
          alert('ошибка, поле"Месячный доход", должно быть заполнено');
    }else{
      appData.start();
    }
  }
);

for(let i = 0; i < inputPlaceholder.length; i++){
  inputPlaceholder[i].addEventListener('input',()=> {
    if(inputPlaceholder[i].getAttribute("placeholder") === "Наименование"){
    inputPlaceholder[i].value = inputPlaceholder[i].value.replace(/[^А-ЯЁЪа-яёъ._^%$#!~@,-\s*]/,'');
    }
    if(inputPlaceholder[i].getAttribute("placeholder") === "Сумма"){
      inputPlaceholder[i].value = inputPlaceholder[i].value.replace(/[^0-9]/,'');
    }
  });
}



expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
  periodAmount.innerHTML = periodSelect.value;
});





// appData.getInfoDeposit();


// const capitalizeArrToString = (arr) => {
//   for (let i = 0; i < arr.length; i++) {
//     arr[i] = arr[i].charAt(0).toUpperCase(i) + arr[i].substring(1);
//   }
//   return arr.join(', ')
// }


'use strict';

  let start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
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
      allInput = document.querySelectorAll('input'),
      inputPlaceholder = document.querySelectorAll('input');

  



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
    
      if(salaryAmount.value === ''){
        alert('ошибка, поле"Месячный доход", должно быть заполнено');
        return 
      }
      
      this.budget =  +salaryAmount.value;
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();    
      this.showResult();
      
      document.querySelectorAll('input').forEach(item => {item.disabled = 'disabled';});
      
      start.style.display = 'none';
      cancel.style.display = 'block';
      
    },
    cancel: function(){

      document.querySelectorAll('input').forEach(item => 
      {   
        item.value = '';
        item.disabled = ''; 
      });

     

      this.income = {};
      this.addIncome = [];
      this.expenses = {};
      this.addExpenses = [];
      this.incomeMonth = 0;
      this.deposit = false;
      this.moneyDeposit = 0;
      this.percentDeposit = 0;
      this.budget  = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;

      this.removeInput(incomeItem);
      this.removeInput(expensesItems);

      
      periodSelect.value = 1;
      periodAmount.textContent = 1;
      
      expensesPlus.style.display = 'block';
      incomePlus.style.display = 'block';
      start.style.display = 'block';
      cancel.style.display = 'none';
    },
    removeInput: function(item){
      for(let i = 1; i < item.length; i++){
        item[i].remove();
      }
    },
    showResult: function(){
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = Math.ceil(this.budgetDay);
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth()); //достижение цели
      incomePeriodValue.value = this.calcPeriod();
      periodSelect.addEventListener('input', function(){
          incomePeriodValue.value = this.budgetMonth * periodSelect.value;
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
      let newInputPlaceholder = document.querySelectorAll('input');
      inputPlaceholder = newInputPlaceholder;

      
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
      let _this = this;
      expensesItems.forEach(function(item){                                     
        let itemExpenses = item.querySelector('.expenses-title').value; //Обязательные расходы: поле - наименование;
        let cashExpenses = item.querySelector('.expenses-amount').value;//Обязательные расходы: поле - сумма;
        if(itemExpenses !== '' && cashExpenses !== ''){
          _this.expenses[itemExpenses] = cashExpenses;
        }
      });
    },
    getIncome: function(){
      let _this = this;
      incomeItem.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){
          _this.income[itemIncome] = cashIncome;
        }
      });
      
    },
    getAddExpenses: function(){                   //возможные расходы 
      let _this = this;
      let addExpenses = additionalExpensesItem.value.split(', ');
      addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
          _this.addExpenses.push(item);
        }
      });
    },
    getAddIncome: function(){                  //возможный доход
      let _this = this;
      additionalIncomeItem.forEach(function(item){  
        let itemValue = item.value.trim();
        if (itemValue !== ''){
          _this.addIncome.push(itemValue);
        }
      });
    },
    // getInfoDeposit: function(){
    //   if(appData.deposit){
    //     /* appData.percentDeposit = prompt('Какой годовой проццент?','10');
    //     appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000); */
    //     do{appData.percentDeposit = prompt('Какой годовой проццент?', '10');
    //       }while(!isNumber(appData.percentDeposit));
    //     do{appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
    //       }while(!isNumber(appData.moneyDeposit));
    //   }
    // },
    getExpensesMonth: function (){

        for( let key in  this.expenses){
          this.expensesMonth += +this.expenses[key];
        }
    },
    getBudget: function(){
          this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;   //бюджет на месяц
          this.budgetDay = this.budgetMonth / 30;   //бюджет на день
    },
    getTargetMonth: function(){ //достижение цели
        return targetAmount.value / this.budgetMonth;
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
      return this.budgetMonth * periodSelect.value;
    },
};

start.addEventListener('click', appData.start.bind(appData));

cancel.addEventListener('click', appData.cancel.bind(appData));




inputPlaceholder.forEach(function(item){
  item.addEventListener('input', function(){
    if(item.getAttribute("placeholder") === "Наименование"){
      item.value = item.value.replace(/[^А-ЯЁЪа-яёъ._^%$#!~@,-\s*]/,'');
      }
      if(item.getAttribute("placeholder") === "Сумма"){
        item.value = item.value.replace(/[^0-9]/,'');
      }
  });
});


expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
  periodAmount.innerHTML = periodSelect.value;
});






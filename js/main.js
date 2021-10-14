'use strict';

  const start = document.getElementById(`start`),
        cancel = document.getElementById(`cancel`),
        btnPlus = document.getElementsByTagName(`button`),
        incomePlus = btnPlus[0],
        expensesPlus = btnPlus[1],
        additionalIncomeItem = document.querySelectorAll(`.additional_income-item`),
        depositCheck = document.querySelector(`#deposit-check`),
        budgetDayValue = document.getElementsByClassName(`budget_day-value`)[0],
        budgetMonthValue = document.getElementsByClassName(`budget_month-value`)[0],
        expensesMonthValue = document.getElementsByClassName(`expenses_month-value`)[0],
        accumulatedMonthValue = document.getElementsByClassName(`accumulated_month_value`)[0],
        additionalIncomeValue = document.getElementsByClassName(`additional_income-value`)[0],
        additionalExpensesValue = document.getElementsByClassName(`additional_expenses-value`)[0],
        incomePeriodValue = document.getElementsByClassName(`income_period-value`)[0],
        targetMonthValue = document.getElementsByClassName(`target_month-value`)[0],
        salaryAmount = document.querySelector(`.salary-amount`),
        incomeTitle = document.querySelector(`.income-title`),
        incomeAmount = document.querySelector(`.income-amount`),
        expensesTitle = document.querySelector(`.expenses-title[type="text"]`),
        expensesAmount = document.querySelector(`.expenses-amount`),
        additionalExpenses = document.querySelector(`.additional_expenses`),
        periodSelect = document.querySelector(`.period-select`),
        additionalExpensesItem = document.querySelector(`.additional_expenses-item`),
        targetAmount = document.querySelector(`.target-amount`),
        periodAmount = document.querySelector(`.period-amount`);
        

  let expensesItems = document.querySelectorAll(`.expenses-items`),
      incomeItem = document.querySelectorAll(`.income-items`),
      inputPlaceholder = document.getElementsByTagName(`input`);



  const isNumber = function(n){
      return !isNaN(parseFloat(n)) && isFinite(n);
  };


class AppData{

  constructor(income = {}, addIncome =  [], expenses =  {}, addExpenses =  [], incomeMonth =  0, deposit =  false, moneyDeposit =  0, percentDeposit =  0, budget =  0, budgetDay =  0, budgetMonth =  0, expensesMonth =  0){
    this.income =  income;
    this.addIncome =  addIncome;
    this.expenses =  expenses;
    this.addExpenses =  addExpenses;
    this.incomeMonth =  incomeMonth;
    this.deposit =  deposit;
    this.moneyDeposit =  moneyDeposit;
    this.percentDeposit =  percentDeposit;
    this.budget =  budget;
    this.budgetDay =  budgetDay;
    this.budgetMonth =  budgetMonth;
    this.expensesMonth =  expensesMonth;
  }


  start(){
  if(salaryAmount.value === ''){
    alert('ошибка, поле"Месячный доход", должно быть заполнено');
    return 
  }
  
  this.budget =  +salaryAmount.value;
  this.getExpInc();
  this.getAddExpenses();
  this.getAddIncome();
  this.monthExpInc(this.expenses);
  this.monthExpInc(this.income);
  this.getBudget();    
  this.showResult();

  
  document.querySelectorAll('input').forEach(item => {item.disabled = 'disabled';});
  
  start.style.display = 'none';
  cancel.style.display = 'block';
  }

  cancel() {

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
  }

removeInput(item){
    for(let i = 1; i < item.length; i++){
      item[i].remove();
    }
}


showResult(){
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.ceil(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth()); //достижение цели
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = this.budgetMonth * periodSelect.value;
      return incomePeriodValue.value;
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

addExpensesBlock(){   //Обязательные расходы: кнопка плюс;                          
  const cloneExpensesItem = expensesItems[0].cloneNode(true);
  for(let i = 0; i< cloneExpensesItem.childNodes.length; i++){
    cloneExpensesItem.childNodes[i].value = '';
  }
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  console.log(expensesItems);
  if(expensesItems.length === 3){
    expensesPlus.style.display = 'none';
  }
  this.inputCheckPlaceholder();
}

addIncomeBlock(){       
  const cloneIncomeItem = incomeItem[0].cloneNode(true);
  for(let i = 0; i< cloneIncomeItem.childNodes.length; i++){
    cloneIncomeItem.childNodes[i].value = '';
  }
  incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItem = document.querySelectorAll('.income-items');
  console.log(incomeItem);
  if(incomeItem.length === 3){
    incomePlus.style.display = 'none';
  }
  this.inputCheckPlaceholder();
}

addExpInc(item){
  console.log(item);
  const cloneItem = document.querySelectorAll(`.${item}-items`)[0].cloneNode(true);
  let itemIncExp = document.querySelectorAll(`.${item}-items`);
  let plusIncExp;
  console.log(itemIncExp);
  if(item === `expenses`){
    plusIncExp = btnPlus[1];
  }
  if(item === `income`){
    plusIncExp = btnPlus[0];
  }
  console.log(plusIncExp);
  for(let i = 0; i< cloneItem.childNodes.length; i++){
    cloneItem.childNodes[i].value = '';
  }
  itemIncExp[0].parentNode.insertBefore(cloneItem, plusIncExp);
  itemIncExp = document.querySelectorAll(`.${item}-items`);
  if(itemIncExp.length === 3){
    plusIncExp.style.display = 'none';
  }
  
  
  // this.inputCheckPlaceholder();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

getExpInc(){
  
  const count = item =>{
    const startStr = item.className.split('-')[0];
    const itemTitle = item.querySelector(`.${startStr}-title`).value;
    const itemAmount = item.querySelector(`.${startStr}-amount`).value;
    if(itemTitle !== '' && itemAmount !== ''){
      this[startStr][itemTitle] = itemAmount;
    }
  };


  incomeItem.forEach(count);
  expensesItems.forEach(count);


  // const monthExpInc = item =>{         !!!!!!!!!ВЫНЕС В ОТДЕЛЬНЫЙ МЕТОД ИЛИ МОЖНО ОСТАВИТЬ ЗДЕСЬ??!!!!!!!
  //   for( let key in  this.item){
  //     this[`${item}Month`] += +this.item[key];
  //   }
  // };

  // let expenses = this.expenses,
  //     income = this.income;


  // monthExpInc(expenses);
  // monthExpInc(income);


  // for( let key in  this.expenses){
  //   this.expensesMonth += +this.expenses[key];
  // }

  // for(let key in this.income){
  //   this.incomeMonth += +this.income[key];
  // }
  
}

monthExpInc(item){
  for( let key in  this.item){
    this[`${item}Month`] += +this.item[key];
  }
}



getAddExpenses(){                   //возможные расходы 
  let addExpenses = additionalExpensesItem.value.split(', ');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== ''){
      this.addExpenses.push(item);
    }
  });

}

getAddIncome(){                  //возможный доход
  additionalIncomeItem.forEach((item) => {  
    let itemValue = item.value.trim();
    if (itemValue !== ''){
      this.addIncome.push(itemValue);
    }
  });
}

getAddExpInc(){
  const count = (item) => {

  };
}


getBudget(){
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;   //бюджет на месяц
  this.budgetDay = this.budgetMonth / 30;   //бюджет на день
}

getTargetMonth(){ //достижение цели
  return targetAmount.value / this.budgetMonth;
}

calcPeriod() {
  return this.budgetMonth * periodSelect.value;
}

getStatusIncome(){
  if(this.budgetDay>1200){
    console.log("У вас высокий уровень дохода");
  }else if(this.budgetDay>600 && this.budgetDay<1200){
    console.log("У вас средний уровень дохода");
  }else if(this.budgetDay>0 && this.budgetDay<600){
    console.log("К сожалению у вас уровень дохода ниже среднего");
  }else{
    console.log("Что то пошло не так");
  }
}

// eventListener(){
//   start.addEventListener('click', this.start.bind(this));
//   cancel.addEventListener('click', this.cancel.bind(this));
//   expensesPlus.addEventListener('click', this.addExpInc.bind(`expenses`));
//   incomePlus.addEventListener('click', this.addExpInc.bind(`income`));
//   periodSelect.addEventListener('input', () => {
//     periodAmount.innerHTML = periodSelect.value;
//   });
//   this.inputCheckPlaceholder();
//   this.removeeventListener();
// }

eventListener(){
  start.addEventListener('click', this.start.bind(this));
  cancel.addEventListener('click', this.cancel.bind(this));
  expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
  incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
  periodSelect.addEventListener('input', () => {
    periodAmount.innerHTML = periodSelect.value;
  });
  this.inputCheckPlaceholder();
  this.removeeventListener();
}

removeeventListener(){
  start.removeEventListener('click', this.start.bind(this));
  cancel.removeEventListener('click', this.cancel.bind(this));
  // expensesPlus.removeEventListener('click', this.addExpensesBlock.bind(this));
  // // expensesPlus.removeEventListener('click', this.addExpInc(this.expenses));
  // incomePlus.removeEventListener('click', this.addIncomeBlock.bind(this));
  // // incomePlus.removeEventListener('click', this.addExpInc(`income`));

  periodSelect.removeEventListener('input', function(){
    periodAmount.innerHTML = periodSelect.value;
  });
}

inputCheckPlaceholder(){
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
}

}

const appData = new AppData();
appData.eventListener();













'use strict';

let money, time;

function start() {
    money = +prompt('введите ваш бюджет на месяц');
    time = prompt('введите дату в формате YYYY-MM-DD');

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt('введите ваш бюджет на месяц');
    }
}

start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true
}

function detectDayBudget() {
    appData.moneyPerDay = (appData.budget / 30).toFixed();
    alert('Ежедневный бюджет: ' + appData.moneyPerDay);
}

detectDayBudget();

function chooseOptExpenses() {
    for (let i = 0; i < 3; i++) {
        let costs = +prompt('Статья необязательных расходов?');

        appData.optionalExpenses[i] = costs;
    }
}

chooseOptExpenses();

function chooseExpenses() {
    for (let i = 0; i < 2; i++) {
        let a = prompt('введите обязательную статью расходов в этом месяце?'),
            b = prompt('во сколько обойдётся?');

        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            console.log("done");
            appData.expenses[a] = b;
        } else {
            i--;
        }
    }
}

chooseExpenses();

appData.moneyPerDay = (appData.budget / 30).toFixed();

alert('Ежедневный бюджет: ' + appData.moneyPerDay);

function detectLevel() {
    if (appData.moneyPerDay < 100) {
        console.log('минимальный уровень достатка');
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log('средний уровень достатка');
    } else if (appData.moneyPerDay > 2000) {
        console.log('высокий уровень достатка');
    } else {
        console.log('произошла ошибка');
    }
}

detectLevel();

function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt('какова сумма накоплений?'),
            percent = +prompt('под какой процент?');

        appData.monthIncome = save / 100 / 12 * percent;
        alert("доход в месяц с вашего депозита: " + appData.monthIncome);
    }
}

checkSavings();
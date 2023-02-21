const balance_container = document.querySelector('.balance')
const balance = document.querySelector('.total-money')
const income = document.querySelector('#income')
const expense = document.querySelector('#expense')
const history = document.querySelector('.history')
const form = document.querySelector('.adder-form')
const text = form.querySelector("input[name='name']")
const amount = form.querySelector("input[name='amount']")


if(localStorage.getItem('expense-tracker') === null){
    let storage = {}
    storage['total-money'] = 0
    storage['total-income'] = 0
    storage['total-expense'] = 0
    storage['history-item'] = []
    storage['history-amount'] = []
    localStorage.setItem('expense-tracker',JSON.stringify(storage))
    initValues()
}else{
    initValues()
}


function initValues(){
    let data = JSON.parse(localStorage.getItem('expense-tracker'))
    balance.innerText = formatMoney( data['total-money'] )
    income.innerText = formatMoney( data['total-income'] )
    expense.innerText = formatMoney( data['total-expense'] )
    Array.from(history.children).forEach((i,idx) => {if(idx!==0)history.removeChild(i)})
    data['history-item'].forEach((item,index) => {
        history.appendChild( createHistory((data['history-amount'][index]>=0),item,data['history-amount'][index]) )
    })
}


function addHistory(txt,amnt){
    let data = JSON.parse(localStorage.getItem('expense-tracker'))
    data['history-item'].push(txt)
    amnt = (amnt[0] === '+') ? Number( amnt.slice(1,amnt.length) ): -1 * amnt.slice(1,amnt.length) 
    data['history-amount'].push(amnt)
    data['total-money'] += amnt
    if(amnt < 0){
        data['total-expense'] += Math.abs(amnt)
    }else{
        data['total-income'] += amnt
    }
    localStorage.setItem('expense-tracker',JSON.stringify(data))
    initValues()
}


form.addEventListener('submit',(e) => {
    e.preventDefault()
    addHistory(text.value,amount.value)
        text.value = ''
        amount.value = ''
})


function formatMoney(money){
    let mon = String(money)
    mon = '$' + mon
    return mon
}



function createHistory(isPos,text,amount){
    let hist = document.createElement('div')
    hist.classList.add('history-item')
    let txt = document.createElement('span')
    let amnt = document.createElement('span')
    txt.innerText = text
    amnt.innerText = amount
    isPos ? amnt.classList.add('positive'):amnt.classList.add('negative')
    hist.appendChild(txt)
    hist.appendChild(amnt)
    return hist
}
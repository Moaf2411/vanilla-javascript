const canv = document.querySelector('.canv')
const ctx = canv.getContext('2d')
ctx.lineWidth = 3
ctx.lineJoin = 'miter'
const wordDiv = document.querySelector('.word')
const wrong = document.querySelector('.wrong')
const popupContainer = document.querySelector('.popup-container')
const popup = document.querySelector('.popup')
const again = document.querySelector('.again')

const draw = [first,second,third,fourth,fifth,sixth]
const words = ['programming','frontend','reactjs','javascript']
let word = words[Math.floor(Math.random()*words.length)]
const entered = []
let wrongGuessed = -1
let rightGuessed = 0
popupContainer.style.display = 'none'
initdraw(ctx)
let letters = initword(word)

// word
function initword(word){
    let arr = []
    Array.from(word).forEach((i) => {
        let letter = document.createElement('div')
        letter.classList.add('letter')
        wordDiv.appendChild(letter)
        arr.push(letter)
    })    
    return arr
}

// draw functions
function initdraw(ctx){
    ctx.fillStyle = 'rgb(32, 32, 46)'
    ctx.fillRect(0,0,250,250)
    ctx.strokeStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(10,200)
    ctx.lineTo(60,200)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(35,200)
    ctx.lineTo(35,80)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(35,80)
    ctx.lineTo(100,80)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(100,80)
    ctx.lineTo(100,100)
    ctx.stroke()
}

function first(ctx){
    ctx.strokeStyle='white'
    ctx.beginPath()
    ctx.arc(100,110,10,0,(Math.PI/180)*360,false)
    ctx.stroke()
}

function second(ctx){
    ctx.beginPath()
    ctx.moveTo(100,120)
    ctx.lineTo(100,160)
    ctx.stroke()
}

function third(ctx){
    ctx.beginPath()
    ctx.moveTo(100,130)
    ctx.lineTo(80,120)
    ctx.stroke()
}

function fourth(ctx){
    ctx.beginPath()
    ctx.moveTo(100,130)
    ctx.lineTo(120,120)
    ctx.stroke()
}

function fifth(ctx){
    ctx.beginPath()
    ctx.moveTo(100,160)
    ctx.lineTo(85,175)
    ctx.stroke()
}

function sixth(ctx){
    ctx.beginPath()
    ctx.moveTo(100,160)
    ctx.lineTo(115,175)
    ctx.stroke()
}

//game
window.addEventListener('keydown',(e) => {
    if(entered.includes(e.key)){
        //show error
        let err = document.createElement('div')
        err.innerText = 'You have already entered this letter'
        err.classList.add('error')
        document.body.appendChild(err)
        setTimeout(()=>{
            document.body.removeChild(err)
        },1000)
        return
    }
    
    if(word.includes(e.key)){
        entered.push(e.key)
        let right = getIndex(word,e.key)
        right.forEach((i) => {
            letters[i].innerText = e.key
        })
        rightGuessed += right.length
        if(rightGuessed === word.length){
            win()
        }
    }else{
        wrongGuessed += 1
        if(wrongGuessed === 6){
            lose()
        }
        draw[wrongGuessed](ctx)
        let x = wrong.innerText
        x = (x === 'wrong:') ? x+`\n ${e.key}`:x+`, ${e.key}` 
        wrong.innerText = x 
        entered.push(e.key)   
    }
})

function getIndex(word,letter){
    let arr = []
    Array.from(word).forEach((item,idx) => {
        if(item === letter){
            arr.push(idx)
        }
    })
    return arr
}

function lose(){
    // pop up
    popup.children[0].innerText = 'You lost!'
    popupContainer.style.display = 'flex'
}

function win(){
    //pop up
    popup.children[0].innerText = 'Congradulation! You Won!!!'
    popupContainer.style.display = 'flex'
}

// if play again was set, reset everything
again.addEventListener('click',(e) => {
    word = words[Math.floor(Math.random()*words.length)]
    entered.length = 0
    wrongGuessed = -1
    rightGuessed = 0
    popupContainer.style.display = 'none'
    initdraw(ctx)
    Array.from(wordDiv.children).forEach((i) => wordDiv.removeChild(i))
    wrong.innerText = 'Wrong:'
    letters = initword(word)    
})
const hambutton = document.querySelector('.hambur')
const container = document.querySelector('.container')
const pic = document.querySelector('.pic')
const signup = document.querySelector('.signup')
const modal = document.querySelector('.modal')
const menu = document.querySelector('.menu')
const close = document.querySelector('#close')

fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(res => {
        url = res.results[0].picture.medium
        pic.innerHTML = `
            <img src="${url}" />
        `
    })






close.addEventListener('click',() => {
    if(document.body.classList.contains('anim')){
        document.body.classList.remove('anim')
        document.body.style['overflow-y'] = 'auto'
        window.onscroll = () => {}
    }
} )



hambutton.addEventListener('click',(e) => {
    if(!(menu.classList.contains('anim'))){
        document.body.classList.add('anim')
        //menu.classList.add('anim')
        window.scroll(0,0)
        window.onscroll = () => window.scroll(0,0)
    }
})


signup.addEventListener('click',(e) => {
    modal.style.top = `${window.scrollY}px`
    modal.style.left = `${window.scrollX}px`
    let y = window.scrollY
    window.scroll(0,window.scrollY)
    window.onscroll = () => window.scroll(0,y)
    modal.style.display = 'flex'
    console.log(window.onscroll)
})


modal.addEventListener('click',(e) => {
    if(e.target.classList.contains('modal')){
        modal.style.display = 'none'
        window.onscroll = () => {}
    }
})











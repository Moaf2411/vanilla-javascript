const posts = document.querySelector('.posts')
const input = document.querySelector('.searchbar input')
const form = document.querySelector('.searchbar>form')
let allposts = []
let active = -10


async function getPosts(num = 5){
    let data = await fetch('https://jsonplaceholder.typicode.com/posts?_limit='+num)
    data = await data.json()
    postDom(data)
}
getPosts()


function postDom(data){
    let num = posts.children.length + 1
    data.forEach((i) => {
        let cont = document.createElement('div')
        cont.classList.add('post')
        let title = document.createElement('p')
        title.classList.add('post-title')
        title.innerText = i.title
        let bod = document.createElement('p')
        bod.classList.add('post-body')
        bod.innerText = i.body
        let number = document.createElement('div')
        number.classList.add('post-number')
        number.innerText = num
        num += 1
        cont.appendChild(title)
        cont.appendChild(bod)
        cont.appendChild(number)
        allposts.push(cont)
        posts.appendChild(cont)
    })
}



function showFiltered(filtered){
    Array.from(posts.children).forEach(i => posts.removeChild(i))
    filtered.forEach(i => posts.appendChild(i))
}


let once = singleton()

window.addEventListener('scroll',(e) => {
    let scrolltop = document.documentElement.scrollTop
    let scrollheight = document.documentElement.scrollHeight
    let clientheight = document.documentElement.clientHeight
    console.log(clientheight)
    console.log(scrollheight)
    if(scrolltop + clientheight >= scrollheight - 3 ){
        once()
    }

})



function singleton(){
    let active = -10
    return function(){
        clearTimeout(active)
        active = setTimeout(getPosts,1000)
        console.log(active)
    }
}





form.addEventListener('submit',(e) => {
    e.preventDefault()
    if(input.value === ''){
        showFiltered(allposts)
    }
    else{

        let filtered = Array.from(posts.children).filter((i) => {
            return i.querySelector('.post-body').innerText.includes(input.value)
        })
        showFiltered(filtered)
        input.value = ''
    }
})

const adder = document.querySelector('#adder')
const adult = document.querySelector('#adult')
const sorter = document.querySelector('#sort')
const entire = document.querySelector('#entire')
const list = document.querySelector('.list')
const loading = document.createElement('p')
const error = document.createElement('p')
const btns = document.querySelector('.btns')
loading.innerText = 'loading...'
error.innerText = 'something went wrong!'
error.classList.add('error')

const names = new Array()
const ages = new Array()

adder.addEventListener('click',(e) => {
    list.appendChild(loading)
    fetch('https://randomuser.me/api')
    .then(res => {
            if(!res.ok){
                throw new error('wrong')
            }
            return res.json()
        })
        .then(res => {
            list.removeChild(loading)
            let name = res.results[0]['name']
            name = `${name['first']} ${name['last']}`
            let age = res.results[0]['registered']['age']
            let li = document.createElement('li')
            let p1 = document.createElement('p')
            let p2 = document.createElement('p')
            p1.innerText = name
            p2.innerText = age
            li.classList.add('item')
            li.appendChild(p1)
            li.appendChild(p2)
            list.appendChild(li)
            names.push(name)
            ages.push(+age)
        })
        .catch(res => {
            list.removeChild(loading)
            list.appendChild(error)
            window.setTimeout(()=>{
                list.removeChild(error)
            },3000)
        })
})


sorter.addEventListener('click',(e) => {
    if(names.length === 0)return 
    let sortednames = [].concat(names)
    let sortedages = [].concat(ages)
    for(let i = 0; i< names.length;i++){
        for(let j = 0 ; j < names.length-1; j++){
            if(sortedages[j] < sortedages[j + 1]){
                let tmp = sortedages[j]
                sortedages[j] = sortedages[j+1]
                sortedages[j+1] = tmp
                tmp = sortednames[j]
                sortednames[j] = sortednames[j+1]
                sortednames[j+1] = tmp
            }
        }
    }
    Array.from(list.children).forEach((i)=>{list.removeChild(i)})
    sortednames.forEach((_,i)=>{
        let name = sortednames[i]
        let age = sortedages[i]
        let li = document.createElement('li')
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        p1.innerText = name
        p2.innerText = age
        li.classList.add('item')
        li.appendChild(p1)
        li.appendChild(p2)
        list.appendChild(li)
    })
})


adult.addEventListener('click',(e) => {
    if(names.length === 0) return

    if(adult.classList.contains('unselected')){    
        adult.classList.remove('unselected')
        adult.classList.add('selected')

        let adultnames = []
        let adultages = []
        ages.forEach((_,i) => {
            if(ages[i] >= 18){
            adultnames.push(names[i])
            adultages.push(ages[i])
        }
    })

    Array.from(list.children).forEach((i)=>{list.removeChild(i)})
    adultnames.forEach((_,i)=>{
        let name =adultnames[i]
        let age = adultages[i]
        let li = document.createElement('li')
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        p1.innerText = name
        p2.innerText = age
        li.classList.add('item')
        li.appendChild(p1)
        li.appendChild(p2)
        list.appendChild(li)
    })

    }else{
        adult.classList.remove('selected')
        adult.classList.add('unselected')
        Array.from(list.children).forEach((i)=>{list.removeChild(i)})
        
        names.forEach((_,i)=>{
            let name =names[i]
            let age = ages[i]
            let li = document.createElement('li')
            let p1 = document.createElement('p')
            let p2 = document.createElement('p')
            p1.innerText = name
            p2.innerText = age
            li.classList.add('item')
            li.appendChild(p1)
            li.appendChild(p2)
            list.appendChild(li)
        })
        adult.classList.add('selected')

    }
})

entire.addEventListener('click',(e) => {
    if(ages.length === 0) return
    let sum = ages.reduce((sum,i) => sum + i,0)
    let clc = document.querySelector('#sum')
    clc = (clc === null) ? document.createElement('p'):clc
    clc.innerText = `Entire age is ${sum}`
    clc.setAttribute('id','sum')
    btns.appendChild(clc)

})

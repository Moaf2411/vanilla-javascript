const founded = document.querySelector('.founded')
const food = document.getElementById('food')
const searcher = document.querySelector('.search')
const inp = document.querySelector('input')


async function search(meal){
    let data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+meal)
    data = await data.text()
    let meals = await JSON.parse(data).meals
    return meals
}



function getComponent(meal){
    let container = document.createElement('div')
    let image = document.createElement('img')
    let info_container = document.createElement('div')
    let info = document.createElement('span')
    info.innerText = meal.strMeal
    info_container.classList.add('info-container')
    info.classList.add('info')
    info_container.appendChild(info)
    image.setAttribute('src',meal.strMealThumb)
    image.classList.add('image')
    container.classList.add('meal-container')
    container.appendChild(image)
    container.appendChild(info_container)
    
    //add event listener
 
    container.addEventListener('click',() => {
        showDetaitls(meal)
    })

    return container
}



searcher.addEventListener('click',(e) => {
    if(inp.value.trim() === '')return

    let m = search(inp.value)
    m.then(res =>{
        if(res.length > 0){
            let containers = res.map((i) => getComponent(i))
            Array.from(founded.children).forEach((i) => founded.removeChild(i))
            containers.forEach((i)=>founded.appendChild(i))
        }
    })
})



function showDetaitls(meal){
    if(food.children.length > 0){
        Array.from(food.children).forEach((i)=> {
            if(i.classList.contains('foo')) food.removeChild(i)
        })
    }
    let cont = document.createElement('div')
    cont.classList.add('foo')
    cont.innerHTML = `
        <img src="${meal.strMealThumb}" class="big-image" >
        <div class = "food-name">
            <p>${meal.strMeal}</p>
            <p>${meal.strArea}
        </div>
        <p class="instructions">${meal.strInstructions}</p>
    `
    food.appendChild(cont)
}
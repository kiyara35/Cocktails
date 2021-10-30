const API = 'https://www.thecocktaildb.com/api/json/v1/1/'

let form, input, output

output = document.createElement('div')
output.className = 'output'
form = document.createElement('form')
form.className = 'search'
input = document.createElement('input')

let container = document.getElementById('container')
container.append(form, output)

form.append(input)


const getCocktails = async () => {
    const request = await fetch(API + 'filter.php?c=Cocktail')
    const response = await request.json()
    console.log(response)
    renderCocktail(response.drinks)
}

const searchCocktails = async () => {
    output.innerHTML = ''
    let nameCocktail = input.value
    const request = await fetch(API + 'search.php?s=' + nameCocktail)
    const response = await request.json()
    console.log(response)
    renderCocktail(response.drinks)

}
const compare = () => {
    input.value.length < 2 ? getCocktails() : searchCocktails()
}

const createSearchForm = () => {
    form.addEventListener('keyup', () => {
        compare()
    })
    input.id = 'searchParametr'
    input.setAttribute('placeholder', "Enter the cocktail's name")
    compare()
}
createSearchForm()


const renderCocktail = (arr) => {
    let err = document.createElement('p')
    err.innerHTML = 'EMPTY'
    arr ?
        arr.map((el, index, array) => {
            let div = document.createElement('div')
            div.className = 'div'
            div.addEventListener('click', () => {
                searchID(el.idDrink)
            })
            let nameOfCocktail = document.createElement('h3')
            let imgOfCocktail = document.createElement('img')
            imgOfCocktail.src = el.strDrinkThumb
            nameOfCocktail.innerHTML = el.strDrink
            output.append(div)
            div.append(imgOfCocktail, nameOfCocktail)
        })
        : output.append(err)
}

const searchID = async (id) => {
    output.innerHTML = ''
    const request = await fetch(API + "lookup.php?i=" + id)
    const response = await request.json()
    console.log(response)
    renderFullInformation(response)
}


const renderFullInformation = (arr) => {

    let card = document.createElement('div')
    card.className = 'card'
    let name = document.createElement('h3')
    let img = document.createElement('img')
    let title = document.createElement('h2')
    title.className = 'title'
    let instruction = document.createElement('h6')
    let type = document.createElement('h6')
    let category = document.createElement('h6')
    let ing1 = document.createElement('p')
    let ing2 = document.createElement('p')
    let ing3 = document.createElement('p')
    let ing4 = document.createElement('p')
    let glass = document.createElement('p')

    name.innerHTML = arr.drinks[0].strDrink
    img.src = arr.drinks[0].strDrinkThumb
    title.innerHTML = 'Ingredients'
    instruction.innerHTML = `${arr.drinks[0].strInstructions}`
    type.innerHTML = ` Type : ${arr.drinks[0].strAlcoholic}`
    category.innerHTML = ` Category : ${arr.drinks[0].strCategory}`


    ing1.innerHTML = arr.drinks[0].strIngredient1
    ing1.addEventListener('click', () => {
        getIngredient(arr.drinks[0].strIngredient1)
    })
    ing2.innerHTML = arr.drinks[0].strIngredient2
    ing2.addEventListener('click', () => {
        getIngredient(arr.drinks[0].strIngredient2)
    })

    ing3.innerHTML = arr.drinks[0].strIngredient3
    ing3.addEventListener('click', () => {
        getIngredient(arr.drinks[0].strIngredient3)
    })
    ing4.innerHTML = arr.drinks[0].strIngredient4
    ing4.addEventListener('click', () => {
        getIngredient(arr.drinks[0].strIngredient4)
    })
    glass.innerHTML = arr.drinks[0].strGlass


    let btn = document.createElement('button')
    btn.innerHTML = 'Go Back'
    btn.addEventListener('click', () => goBack())

    const goBack = () => {
        output.innerHTML = ''
        card.innerHTML = ''
        getCocktails()
        input.value = ''
    }

    output.append(card)
    card.append(name, img, instruction, type, category, title, ing1, ing2, ing3, ing4, btn)

    const getIngredient = async (ad) => {
        const request = await fetch(API + "search.php?i=" + ad)
        const response = await request.json()
        console.log(response)
        renderIngredient(response)
    }

    const renderIngredient = (arr) => {
        card.innerHTML = ''
        let box = document.createElement('div')
        let ingredientName = document.createElement('h1')
        let p = document.createElement('p')
        ingredientName.innerHTML = arr.ingredients[0].strIngredient
        p.innerHTML = arr.ingredients[0].strDescription
        box.append(ingredientName,p,btn)
        card.append(box)



    }

}





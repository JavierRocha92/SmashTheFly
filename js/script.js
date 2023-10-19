// CATCHING ELEMENT TO WORK WITH THEM

const fondo_juego = document.getElementById('fondo_juego')
const marcador = document.getElementById('marcador')

//DECLARE AN ARRAY TO STORAGE RANDOM VALUES FROM FLIES POSITION IN GRIS FONDO_JUEGO

let numbers = []


// FUNCTIONS

/**
 * function to check if this two number are in array numbers 
 * 
 * @param {int} n1 
 * @param {int} n2 
 * @returns flase if two numbers are not in array and true if they do
 */

const isExist = (n1,n2) => {
    const data = n1+'-'+n2
    if(numbers.some((element) => element == data)){
        return true
    }else{
        numbers.push(data)
        return false
    }

}

/**
 * function to geneate a random position and aligment to a specific element which is set in a grid container
 * 
 * @param {HTMLImageElement} fly 
 */

const generateRamdonPosition = (fly) => {
    //DECLARE AN ARRAY WITH DIFFERENTS ALING POSITION

    const aligns = ['center','start','end']

    let columns = Math.floor(1 + Math.random() * 6)
    let rows = Math.floor(1 + Math.random() * 6)

    if(!isExist(columns ,rows)){
        fly.style.gridRow = rows+'/'+(rows + 1) 
        fly.style.gridColumn = columns+'/'+(columns + 1) 
    }

    //SET A RANDOM SPECIFIC ALIGN FOR A NEWLY CREATE ITEM

    fly.style.justifySelf = aligns[Math.floor(Math.random() * aligns.length - 1)]
    fly.style.alignSelf = aligns[Math.floor(Math.random() * aligns.length - 1)]
}

/**
 * function to create and insert a random amount of img element into a DOM by using fragment
 * 
 * @param {int} number 
 */

const createFlies = (number) => {
    fragment = document.createDocumentFragment()

    for (let i = 0; i < number; i++) {
        const fly = document.createElement('IMG')
        fly.src = '../imagenes/mosca.png'
        fly.classList.add('fly')

        generateRamdonPosition(fly)
        
        fragment.appendChild(fly)
    }
    fondo_juego.appendChild(fragment)
}

/**
 * function to set a number of flies are in the game in a specific element to show to user
 * 
 * @param {int} number 
 */
const setFlyNumber = (number) => {
    marcador.textContent = number
}

/**
 * function to call differents function to start the game
 */
const genereateGame = () => {
    const number = Math.floor(1 + Math.random()*30)

    createFlies(number)

    setFlyNumber(number)
}
/**
 * function to decrease player score by one
 */
const decreaseAmount = () => {
    marcador.textContent = parseInt(marcador.textContent) - 1
}
/**
 * functon to call other function to delete images and desrease score player
 * 
 * @param {event} event 
 */
const handlerClick = (event) => {
    const e = event.target

    if (e.tagName === 'IMG'){
        e.remove()
        decreaseAmount()
    }
}


//EVENTS

//EVENT WHEN THE PAGE LOADS

document.addEventListener('DOMContentLoaded',genereateGame)

//EVENT TO CATCH CLICK ON FONDO__JUEGO

fondo_juego.addEventListener('click',handlerClick)
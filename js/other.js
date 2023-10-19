// CATCHING ELEMENT TO WORK WITH THEM

const fondo_juego = document.getElementById('fondo_juego')
const marcador = document.getElementById('marcador')

//DECLARE AN ARRAY TO ACCUMULATE IMAGES CREATED

const flies = []

// FUNCTION

/**
 * function to check if numbers given as parameters are or not in a range, this range is position from a fly ans its sorroundings
 * 
 * @param {int} n1 
 * @param {int} n2 
 * @returns true is both number sre in the range and false if they arent
 */

const isExist = (n1,n2) => {
    console.log('esto es la cantidad de moscas del array '+flies.length)
    for (let i = 0; i < flies.length; i++) {
         if(((flies[i].offsetLeft + flies[i].offsetWidth) >= n1) && ((flies[i].offsetLeft - flies[i].offsetWidth) <= n1) &&
            ((flies[i].offsetTop + flies[i].offsetHeight) >= n2) && ((flies[i].offsetTop - flies[i].offsetHeight) <= n2)){
               return true
            }
        
   }
   return false
}
/**
 * function to create and verify two random position
 * 
 * @param {HTMLImageElement} fly 
 * @returns array with random verified postions
 */
const generateRamdonPosition = () => {
    // DECLARE LIMIT FOR RANDOM POSITION
    let limitBottom = fondo_juego.offsetTop + fondo_juego.offsetHeight -100
    let limitRight = fondo_juego.offsetLeft + fondo_juego.offsetWidth -100
    // DECLARE RANDOM POSITION BY RANDO CHOOSE
    let posX
    let posY
    //USIGN LOOP DO WHILE TO GENERATE RANDON POSITION INTIL CONDITION IS FALSE
    do{
        //CALLING FUNCTION TO CHECK IF A IMAGE ELEMENT IS IN THE RANDOM POSITION
        posX = Math.floor(Math.random() * limitRight)
        posY = Math.floor(Math.random() * limitBottom)
    }while(isExist(posX,posY))

    //RETURN VALUES 
    return [posX,posY]
}
/**
 * function to set position values in fly element
 * 
 * @param {Array} numbers 
 * @param {HTMLImageElement} fly 
 */
const setValuesPosition = (numbers,fly) => {
    fly.style.top = numbers[1]+'px'
    fly.style.left = numbers[0]+'px'
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
        
        setValuesPosition(generateRamdonPosition(),fly)

        //SAVE ITEM NEWLY CREATED INTO ARRAY 

        flies.push(fly)
        //INSER ELEMENT INTO DOM
        fondo_juego.appendChild(fly)
    }
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

/**
 * function to call differents function to start the game
 */
const genereateGame = () => {
    const number = Math.floor(1 + Math.random()*20)
    createFlies(number)

    setFlyNumber(number)
}


//EVENTS

//EVENT WHEN THE PAGE LOADS

document.addEventListener('DOMContentLoaded',genereateGame)

//EVENT TO CATCH CLICK ON FONDO__JUEGO

fondo_juego.addEventListener('click',handlerClick)
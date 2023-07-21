let contador = 0

//Cuando hago CLICK en .next
    //contador aumenta en 1

const sliderNext = document.querySelector(`.next`)
const sliderPrev = document.querySelector(`.prev`)
const sliderImg =document.querySelectorAll(`.Slider-img`)
const sliderPunto= document.querySelectorAll(`.Slider-punto`)
console.log(sliderNext)

//Cuando hago CLICK en .next
    //contador aumenta en 1
sliderNext.addEventListener(`click`,()=>{

    contador= contador + 1

    if(contador >= 3){
        contador = 0
    }
    

    sliderImg.forEach((eachImg,i)=>{
        sliderImg[i].classList.remove(`isActive`)
    })
    sliderImg[contador].classList.add(`isActive`)

    sliderPunto.forEach((eachPunto,i)=>{
        sliderPunto[i].classList.remove(`isActive`)
    })
    sliderPunto[contador].classList.add(`isActive`)


}) 

//Cuando hago CLICK en .prev
    // contador se le resta 1

sliderPrev.addEventListener(`click`,()=>{

    if(contador <=0){
        contador = 3 
    }

    contador = contador - 1
    console.log(contador)

    sliderImg.forEach((eachImg,i)=>{
        sliderImg[i].classList.remove(`isActive`)
    })
    sliderImg[contador].classList.add(`isActive`)


    sliderPunto.forEach((eachPunto,i)=>{
        sliderPunto[i].classList.remove(`isActice`)
    })
    sliderPunto[contador].classList.add(`isActive`)
})

// Cuando hago CLICK en sliderPunto
    // contador es igual POSICION del boton

    sliderPunto.forEach((eachPunto,i)=>{
        sliderPunto[i].addEventListener(`click`,()=>{

            contador = i

            sliderImg.forEach((eachImg,j)=>{
                sliderImg[j].classList.remove(`isActive`)
            })
            sliderImg[i].classList.add(`isActive`)

            sliderPunto.forEach((eachPunto,j)=>{
                sliderPunto[j].classList.remove(`isActive`)
            })
            sliderPunto[i].classList.add(`isActive`)
        })
    })

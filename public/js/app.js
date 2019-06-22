const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const line = document.querySelector('span')
const messageOne = document.querySelector('#method-1')
const messageTwo = document.querySelector('#method-2')
const messageThree = document.querySelector('#method-3')
const messageFour = document.querySelector('#method-4')


weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()

    const location = search.value
    const url = '/weather?address='+location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    line.innerHTML = '<hr>'


    fetch( url ).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast + 'There is '+ data.temperature + ' degree out there.'
                messageThree.textContent = 'With a high of '+ data.temperatureMax +' and low of ' + data.temperatureMin+'.'
                messageFour.textContent = 'Chances of Rain are ' + data.rainChance+'%.'
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })
})
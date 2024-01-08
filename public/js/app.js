console.log("Client side js is loaded")

/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})*/

/*fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {
        if(data.error){
            return console.log(data.error)
        }
        console.log(data)
    })
})*/

const weatherForm = document.querySelector('form')
const seach = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = seach.value

    console.log(location)

    p1.textContent = 'Loading...'
    p2.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error){
                p1.textContent = data.error
                return console.log(data.error)
            }
            console.log(data.location)
            console.log(data.weatherData)
            p1.textContent = (location + ", " + data.location.country)
            p2.textContent = data.weatherdata
            console.log(data)
        })
    })

})
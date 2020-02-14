/// <reference types="jquery" />


// Agrega las opciones de BASES a los <OPTIONS>

fetch("https://api.exchangeratesapi.io/latest")
  .then(respuesta => respuesta.json())
  .then(respuestaJSON => {
    Object.keys(respuestaJSON.rates).forEach(moneda => {
      $("select").append(`<option>${moneda}</option>`)
    });
  })
  .catch(error => console.log("Falló llamado a las OPTIONS"));


// Submitea el FORM, y le pasa DATE y BASE a sendQuery() para hacer el fetch.

$("form").submit(function(e) {
  const date = e.target.date.value;
  const base = e.target.base.value;

  sendQuery(date, base);
  e.preventDefault();
});


// Le pide a la API la data con las opciones seleccionadas.

function sendQuery(date, base) {
  $('ul').html('')
  fetch(`https://api.exchangeratesapi.io/${date}?base=${base}`)
    .then(response => response.json())
    .then(responseJSON => {
      Object.keys(responseJSON.rates).forEach(key => {
        $('ul').append(`<li>${key}: ${responseJSON.rates[key]}</li>`);
      })
    }) 
  Array.from($('li')).sort()
} 
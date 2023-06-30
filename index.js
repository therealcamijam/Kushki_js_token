var kushki = new Kushki({
  merchantId: '4a709fa929f14bd696c6fe138c936e37', 
  inTestEnvironment: true,
});

const Kushki_Form = document.getElementById("payment-form");
Kushki_Form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formvalues = ["name", "number", "expiryMonth", "expiryYear", "cvc","valor"].reduce((accum, cur) => ({
    [cur]: document.querySelector(`input[name='${cur}']`).value,
    ...accum,
  }), {});
  
  console.log(formvalues);
  
  var callback = function(response) {
    if (!response.code) {
      console.log(response);
      alert("Solicitud Exitosa!\nResponse: " + JSON.stringify(response));
    } else {
      console.error('Error: ', response.error, 'Code: ', response.code, 'Message: ', response.message);
      alert("Error en Solicitud!\nError: " + response.error + "\nCode: " + response.code + "\nMessage: " + response.message);
    }
  };
  
  kushki.requestToken({
    amount: '4999',
    currency: "PEN",
    card: {
      ...formvalues
    },
  }, callback);
});


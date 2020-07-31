//parte de geolocalização
let posi;
getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
}

function showPosition(position) {
  // console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
  posi = "Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude;

  console.log("posi: ");
  console.log(posi);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      // console.log("User denied the request for Geolocation.");
      posi = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      // console.log("Location information is unavailable.");
      posi = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      // console.log("The request to get user location timed out.");
      posi = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      // console.log("An unknown error occurred.");
      posi = "An unknown error occurred.";
      break;
  }

  console.log("posi: ");
  console.log(posi);
}

//-----------------------------------------------------

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAz9yaTWiadLMqTk4Ue-stC6Xnt5Z5Nh2c",
  authDomain: "eatza-landing.firebaseapp.com",
  databaseURL: "https://eatza-landing.firebaseio.com",
  projectId: "eatza-landing",
  storageBucket: "eatza-landing.appspot.com",
  messagingSenderId: "600779947141",
  appId: "1:600779947141:web:05fb13a499d1e9f7193dec",
  measurementId: "G-J2TJR071E9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let analytics = firebase.analytics();
let firestore = firebase.firestore();

const calculadora = firestore.collection("calculadora");
const interessados = firestore.collection("interessados");

//listem for Calcular
document.getElementById("Calcular").addEventListener("click", Calcular);
document.getElementById("botTestar").addEventListener("click", Testar);

function Calcular() {
  console.log("calcular!");

  let Npedidos = +document.getElementById("Npedidos").value;
  let TicketMedio = +document.getElementById("TicketMedio").value;
  let totalEATZA = Npedidos * 2.99;
  console.log(numberToReal(totalEATZA));

  document.getElementById("pedidosEATZA").innerHTML = numberToReal(totalEATZA);
  document.getElementById("totalEATZA").innerHTML = numberToReal(totalEATZA);

  let custosAPP = Npedidos * TicketMedio * 0.12;
  let totalApp = custosAPP + 100;

  document.getElementById("pedidosAPP").innerHTML = numberToReal(custosAPP) + " (12%)";
  document.getElementById("totalAPP").innerHTML = numberToReal(totalApp);

  let diferença = custosAPP + 100 - totalEATZA;
  if (diferença > 0) {
    document.getElementById("lucraMais").style.display = "block";
    document.getElementById("economiza").style.display = "block";
    document.getElementById("economia").innerHTML = numberToReal(diferença);
  } else {
    document.getElementById("lucraMais").style.display = "none";
    document.getElementById("economiza").style.display = "none";
  }

  //enviar para a base
  calculadora
    .doc()
    .set({
      //dados enviados
      Pedidos_mes: Npedidos.toFixed(2),
      Ticket_medio: TicketMedio.toFixed(2),
      Total_EATZA: totalEATZA.toFixed(2),
      Total_APP: totalApp.toFixed(2),
      Economia: diferença.toFixed(2),
      Data: new Date(),
      Local: posi,
    })
    .then(function () {
      console.log("calculo salvo");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function Testar(e) {
  e.preventDefault();
  let nome = document.getElementById("nomeTestar").value;
  let email = document.getElementById("emailTestar").value;
  let mensagem = document.getElementById("mensagemTestar").value;

  console.log(nome);
  console.log(email);
  console.log(mensagem);

  //enviar para a base
  interessados
    .doc()
    .set({
      //dados enviados
      Nome: nome,
      Email: email,
      Mensagem: mensagem,
      Data: new Date(),
      Local: posi,
    })
    .then(function () {
      console.log("interesse registrado");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function numberToReal(numero) {
  var numero = numero.toFixed(2).split(".");
  numero[0] = "R$" + numero[0].split(/(?=(?:...)*$)/).join(".");
  return numero.join(",");
}

function FAQ1() {
  let R1 = document.getElementById("R1");
  let Q1Action = document.getElementById("Q1Action");
  if (R1.style.display == "none") {
    R1.style.display = "block";
    Q1Action.innerHTML = "▲";
  } else {
    R1.style.display = "none";
    Q1Action.innerHTML = "▼";
  }
}

function FAQ2() {
  let R2 = document.getElementById("R2");
  let Q2Action = document.getElementById("Q2Action");
  if (R2.style.display == "none") {
    R2.style.display = "block";
    Q2Action.innerHTML = "▲";
  } else {
    R2.style.display = "none";
    Q2Action.innerHTML = "▼";
  }
}

function FAQ3() {
  let R3 = document.getElementById("R3");
  let Q3Action = document.getElementById("Q3Action");
  if (R3.style.display == "none") {
    R3.style.display = "block";
    Q3Action.innerHTML = "▲";
  } else {
    R3.style.display = "none";
    Q3Action.innerHTML = "▼";
  }
}

function FAQ4() {
  let R4 = document.getElementById("R4");
  let Q3Action = document.getElementById("Q4Action");
  if (R4.style.display == "none") {
    R4.style.display = "block";
    Q4Action.innerHTML = "▲";
  } else {
    R4.style.display = "none";
    Q4Action.innerHTML = "▼";
  }
}

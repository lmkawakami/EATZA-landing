let Seção;
let SeçãoLog = 0;
let firstTime;
let comeback;
let storage;
let acesso;
let origemCTA;
let acionadoFAQ;

if (typeof Storage !== "undefined") {
  if (localStorage.getItem("firstTime") === null) {
    firstTime = new Date();
    comeback = false;
    acesso = 1;
    localStorage.setItem("firstTime", firstTime);
    localStorage.setItem("acesso", acesso);
  } else {
    firstTime = localStorage.getItem("firstTime");
    acesso = +localStorage.getItem("acesso") + 1;
    localStorage.setItem("acesso", acesso);
    comeback = true;
  }
  storage = true;
} else {
  firstTime = new Date();
  comeback = false;
  storage = false;
  acesso = 1;
}

// console.log(comeback);
// console.log(firstTime);
// console.log("Acesso:");
// console.log(acesso);

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

//coleções
const locais = firestore.collection("locais");
const calculadora = firestore.collection("calculadora");
const interessados = firestore.collection("interessados");
const seções = firestore.collection("seções");
const CTAs = firestore.collection("CTAs");
const FAQs = firestore.collection("FAQs");

//-----------------------------------------------------
//tipo de dispositivo:
let device;
if (isMobile()) {
  device = "mobile";
} else {
  device = "PC";
}

console.log(device);
//-----------------------------------------------------

//parte de geolocalização
let posi;
let calculo = 0;
getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
}
function showPosition(position) {
  // console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
  posi = position.coords.latitude + ", " + position.coords.longitude;

  SalvaLocal();
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

  SalvaLocal();
}

//-----------------------------------------------------------

//pegar a seção
setInterval(function () {
  SeçãoLog++;
  switch (seção) {
    case "2":
      Seção = "Introdução";
      // console.log("Introdução");
      break;
    case "3":
      Seção = "Nossa Oferta";
      // console.log("Nossa Oferta");
      break;
    case "4":
      Seção = "Quanto Custa?";
      // console.log("Quanto Custa?");
      break;
    case "5":
      Seção = "O Que Recebo?";
      // console.log("O Que Recebo?");
      break;
    case "6":
      Seção = "FAQ";
      // console.log("FAQ");
      break;
    case "7":
      Seção = "Quero Testar!";
      // console.log("Quero Testar!");
      break;
    default:
      Seção = "outro";
    // console.log("outro");
  }
  // console.log("Seção:");
  // console.log(Seção);
  SalvaSeções();
}, 60000);

//-----------------------------------------------------

//captar os clickes da página
let botCalcular = document.getElementById("Calcular");
botCalcular.addEventListener("click", Calcular);
// let botTestar = document.getElementById("botTestar");
// botTestar.addEventListener("click", Testar);
document.getElementById("registrationform").addEventListener("submit", Testar);

function Calcular() {
  const delayReativar = 1000; //tempo de espera para que a calculadora não seja metralhada
  console.log("calcular!");
  calculo++;

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

  botCalcular.disabled = true;
  setTimeout(function () {
    botCalcular.disabled = false;
  }, delayReativar);

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
      Calculo: calculo, //pra saber se é algum usuário brincando com a calculadora
      Data: new Date(),
      Local: posi,
      Device: device,
      PrimeiraVisita: firstTime,
      Retornando: comeback,
      TemMemoria: storage,
      Acesso: acesso,
    })
    .then(function () {
      // console.log("calculo salvo");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function Testar(e) {
  console.log("novo submit");
  // e.preventDefault();
  let nome = document.getElementById("nomeTestar").value;
  let email = document.getElementById("emailTestar").value;
  let telefone = document.getElementById("telefoneTestar").value;
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
      Telefone: telefone,
      Mensagem: mensagem,
      Data: new Date(),
      Local: posi,
      Device: device,
      PrimeiraVisita: firstTime,
      Retornando: comeback,
      TemMemoria: storage,
      Acesso: acesso,
    })
    .then(function () {
      console.log("interesse registrado");
      let ok = document.getElementById("formOK");
      ok.style.display = "block";
      botTestar.disabled = true;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function SalvaLocal() {
  // console.log("posi: ");
  // console.log(posi);

  locais
    .doc()
    .set({
      Data: new Date(),
      Local: posi,
      Device: device,
      PrimeiraVisita: firstTime,
      Retornando: comeback,
      TemMemoria: storage,
      Acesso: acesso,
    })
    .then(function () {
      // console.log("calculo salvo");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function SalvaSeções() {
  seções
    .doc()
    .set({
      Data: new Date(),
      Local: posi,
      Device: device,
      PrimeiraVisita: firstTime,
      SeçãoLog: SeçãoLog,
      Seção: Seção,
      Acesso: acesso,
    })
    .then(function () {
      // console.log("calculo salvo");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function SalvaCTAs() {
  CTAs.doc()
    .set({
      Data: new Date(),
      Local: posi,
      Device: device,
      PrimeiraVisita: firstTime,
      CTA_click: origemCTA,
    })
    .then(function () {
      // console.log("calculo salvo");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function SalvaFAQs() {
  FAQs.doc()
    .set({
      Data: new Date(),
      Local: posi,
      Device: device,
      PrimeiraVisita: firstTime,
      FAQ_click: acionadoFAQ,
    })
    .then(function () {
      // console.log("calculo salvo");
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

function isMobile() {
  var check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function CTA(x) {
  console.log("Quero Testar!");
  console.log(x.srcElement.id);
  origemCTA = x.srcElement.id;
  SalvaCTAs();
}

function FAQ(x) {
  console.log("FAQ");
  console.log(x.srcElement.id);
  acionadoFAQ = x.srcElement.id;
  SalvaFAQs();
}

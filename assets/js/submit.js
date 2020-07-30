//listem for Calcular
document.getElementById("Calcular").addEventListener("submit", submitCalcular);

function submitCalcular(e) {
  // e.preventDefault();
  console.log("calculando....");
}

function Calcular() {
  // console.log("calcular!");
  let Npedidos = +document.getElementById("Npedidos").value;
  let TicketMedio = +document.getElementById("TicketMedio").value;
  let totalEATZA = Npedidos * 2.99;
  console.log(numberToReal(totalEATZA));

  document.getElementById("pedidosEATZA").innerHTML = numberToReal(totalEATZA);
  document.getElementById("totalEATZA").innerHTML = numberToReal(totalEATZA);

  let custosAPP = Npedidos * TicketMedio * 0.12;

  document.getElementById("pedidosAPP").innerHTML = numberToReal(custosAPP) + " (12%)";
  document.getElementById("totalAPP").innerHTML = numberToReal(custosAPP + 100);

  let diferença = custosAPP + 100 - totalEATZA;
  if (diferença > 0) {
    document.getElementById("lucraMais").style.display = "block";
    document.getElementById("economiza").style.display = "block";
    document.getElementById("economia").innerHTML = numberToReal(diferença);
  } else {
    document.getElementById("lucraMais").style.display = "none";
    document.getElementById("economiza").style.display = "none";
  }
}

function numberToReal(numero) {
  var numero = numero.toFixed(2).split(".");
  numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join(".");
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

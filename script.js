const bill = document.getElementById("first-input");
const people = document.getElementById("second-input");
const btn5 = document.getElementById("5");
const btn10 = document.getElementById("10");
const btn15 = document.getElementById("15");
const btn25 = document.getElementById("25");
const btn50 = document.getElementById("50");
const btnCustom = document.getElementById("custom-button");
const tipResult = document.getElementById("tip");
const totalResult = document.getElementById("total");
const resetBtn = document.getElementById("reset-btn");

const buttons = [btn5, btn10, btn15, btn25, btn50];

// Variabile per tenere traccia della percentuale attualmente selezionata
let currentTipPercentage = null;

// Funzione per rimuovere la classe active da tutti i bottoni
function clearActiveButtons() {
  buttons.forEach(btn => btn.classList.remove("active"));
}

// Funzione per nascondere errori
function clearErrors() {
  document.getElementById("second-input-wrapper").style.border = "none";
  document.getElementById("error-label").classList.add("hidden");
}

// Funzione per mostrare errore
function showError() {
  document.getElementById("second-input-wrapper").style.border = "1px solid red";
  document.getElementById("error-label").classList.remove("hidden");
}

// Funzione per calcolare e mostrare i risultati
function calculateAndDisplay(tipPercentage = currentTipPercentage) {
  // Se non c'è nessuna percentuale selezionata, non fare nulla
  if (tipPercentage === null || isNaN(tipPercentage)) {
    return;
  }

  const billValue = parseFloat(bill.value);
  const peopleValue = Number(people.value);

  // Gestione 0 persone o valori non validi
  if (isNaN(billValue) || isNaN(peopleValue) || peopleValue === 0) {
    if (peopleValue === 0 && !isNaN(peopleValue)) {
      showError();
    }
    return;
  }

  // Nascondi errori se tutto è valido
  clearErrors();

  const tipAmount = (billValue * tipPercentage) / 100;
  const totalAmount = billValue + tipAmount;

  tipResult.innerHTML = "$" + (tipAmount / peopleValue).toFixed(2);
  totalResult.innerHTML = "$" + (totalAmount / peopleValue).toFixed(2);
}

// Gestione bottoni percentuali
for (let x of buttons) {
  x.addEventListener("click", () => {
    // Rimuovi active da tutti i bottoni
    clearActiveButtons();
    // Aggiungi active solo al bottone cliccato
    x.classList.add("active");
    
    const tipInput = parseFloat(x.value);
    currentTipPercentage = tipInput; // Salva la percentuale corrente
    calculateAndDisplay(tipInput);
  });
}

// Gestione custom input
btnCustom.addEventListener("input", () => {
  // Rimuovi active da tutti i bottoni percentuali quando si usa custom
  clearActiveButtons();
  
  const tipInput = parseFloat(btnCustom.value);
  
  // Solo se il valore custom è valido, calcola
  if (!isNaN(tipInput) && tipInput >= 0) {
    currentTipPercentage = tipInput; // Salva la percentuale corrente
    calculateAndDisplay(tipInput);
  } else {
    currentTipPercentage = null; // Reset se il valore non è valido
  }
});

// Event listeners per ricalcolare automaticamente quando cambiano bill o people
bill.addEventListener("input", () => {
  // Attiva il bottone reset se c'è un valore
  if (bill.value > 0) {
    resetBtn.classList.remove("inactive");
    resetBtn.classList.add("active");
  }
  
  // Ricalcola automaticamente se c'è una percentuale selezionata
  calculateAndDisplay();
});

people.addEventListener("input", () => {
  // Ricalcola automaticamente se c'è una percentuale selezionata
  calculateAndDisplay();
});

resetBtn.addEventListener("click", () => {
  // Reset dei valori
  bill.value = "";
  people.value = "";
  btnCustom.value = "";
  
  // Reset dei risultati
  tipResult.innerHTML = "$0.00";
  totalResult.innerHTML = "$0.00";

  // Reset dello stato del bottone
  resetBtn.classList.remove("active");
  resetBtn.classList.add("inactive");

  // Reset degli errori e bordi
  clearErrors();
  
  // Rimuovi active da tutti i bottoni
  clearActiveButtons();
  
  // Reset della percentuale corrente
  currentTipPercentage = null;
});

// Gestione border degli input al click
bill.addEventListener("focus", () => {
  document.getElementById("first-input-wrapper").classList.add("focused");
});
bill.addEventListener("blur", () => {
  document.getElementById("first-input-wrapper").classList.remove("focused");
});

people.addEventListener("focus", () => {
  document.getElementById("second-input-wrapper").classList.add("focused");
});
people.addEventListener("blur", () => {
  document.getElementById("second-input-wrapper").classList.remove("focused");
  clearErrors();
});

const API = "https://noroff-komputer-store-api.herokuapp.com/";
const computersElement = document.getElementById("computersElement");
const computerFeatures = document.getElementById("computerFeatures");
const computerImage = document.getElementById("computerImage");
const computerTitle = document.getElementById("computerTitle");
const computerDescription = document.getElementById("description");
const computerPrice = document.getElementById("price");
const getLoanButton = document.getElementById("getLoan");
const payLoanButton = document.getElementById("payLoan");
const bankButton = document.getElementById("bank");
const workButton = document.getElementById("work");
const loanElement = document.getElementById("loan");
const balanceElement = document.getElementById("balance");
const payElement = document.getElementById("pay");

let computers = [];
let balance = 0;
let loan = 0;
let pay = 0;

fetch(API+"computers")
    .then(response => response.json())
    .then(data => computers = data )
    .then(computers => addComputersDropDown(computers));

const addComputersDropDown = (computers) => {
    computers.forEach(element => addComputersToDropDown(element));
    
    //First render
    renderComputer(computers[0]);
}

const addComputersToDropDown = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}

const handleComputerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];

    renderComputer(selectedComputer);
}

const getFeatures = (computer) =>{
    let features = "";
    for(let i = 0; i < computer.specs.length; i++){
        features += computer.specs[i] + "\n";
    }
    return features;
}

const renderComputer = (computer) =>{
    computerFeatures.innerText = getFeatures(computer);
    computerImage.src = API + computer.image;
    computerTitle.innerText = computer.title;
    computerDescription.innerText = computer.description;
    computerPrice.innerText = computer.price + " KR";
}

const renderBalance = () =>{
    balanceElement.innerText = balance;
    payElement.innerText = pay;
    loanElement.innerText = loan;

}

const handleGetLoan = () => {

    const wantedLoan = prompt("How much do you want to loan?");
    if(loan > 0){
        alert("You already have a loan");
        
    }else if(wantedLoan < 0 || wantedLoan > (balance * 2)){
        alert("You can't loan that amount");
        return;
    }else{
    console.log(wantedLoan);
    balance += parseInt(wantedLoan);
    loan = parseInt(wantedLoan);
    payLoanButton.style.display = "block";
    }
    renderBalance();
}

const handleBank = () => {
    if(loan > 0){
        if((pay/100) * 10 > loan){
            pay -= loan;
            loan = 0;
            payLoanButton.style.display = "none";
        }else{
            loan -= (pay/100) * 10;
            pay = (pay/100) * 90
        }

    }
    balance += pay;
    pay = 0;
    
    renderBalance();
}

const handleWork = () => {
    
    pay += 100;

    
    renderBalance();
}

const handlePayLoan = () => {
    console.log(loan)
    if(pay > loan){
        balance += (pay - loan);
        loan = 0;
    }else{
        loan -= pay;
    }
    pay = 0;

    
    renderBalance();
}








computersElement.addEventListener("change", handleComputerMenuChange);
getLoanButton.addEventListener("click", handleGetLoan);
bankButton.addEventListener("click", handleBank);
workButton.addEventListener("click", handleWork);
payLoanButton.addEventListener("click", handlePayLoan);
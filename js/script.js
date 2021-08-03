
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
const buyButton = document.getElementById("buy");
const loanContainer = document.getElementById("loanContainer");

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
    balanceElement.innerText = balance + " Kr";
    payElement.innerText = pay + " Kr";
    loanElement.innerText = loan + " Kr";
    if(loan > 0){
        payLoanButton.style.display = "block";
        loanContainer.style.visibility = "visible";
    }else{
        payLoanButton.style.display = "none";
        loanContainer.style.visibility = "hidden";
    }

}

const handleGetLoan = () => {

    const wantedLoan = prompt("How much do you want to loan?");
    console.log(parseInt(wantedLoan));
    console.log((balance * 2))
    console.log(parseInt(wantedLoan) > (balance * 2))

    if(loan > 0){
        alert("You already have a loan");
        
    }else if(parseInt(wantedLoan) <= 0 || parseInt(wantedLoan) > (balance * 2)){
        alert("You can't loan that amount");
        return;
    }else{
    console.log(wantedLoan);
    balance += parseInt(wantedLoan);
    loan = parseInt(wantedLoan);
    }
    renderBalance();
}

const handleBank = () => {
    if(loan > 0){
        if((pay/100) * 10 > loan){
            pay -= loan;
            loan = 0;
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

const handleBuyComputer = () => {
    console.log(document.getElementById("computersElement").value)
    const selectedComputer = computers[document.getElementById("computersElement").value-1];
    console.log(selectedComputer.price)
    if(balance < selectedComputer.price){
        alert("You can't buy that computer")
    }else if(selectedComputer.stock <= 0){
        alert("Stock is 0")
    }else{
        selectedComputer.stock--;
        balance -= selectedComputer.price;
        alert("You bought computer");
    }
    
    renderBalance();
}

computersElement.addEventListener("change", handleComputerMenuChange);
getLoanButton.addEventListener("click", handleGetLoan);
bankButton.addEventListener("click", handleBank);
workButton.addEventListener("click", handleWork);
payLoanButton.addEventListener("click", handlePayLoan);
buyButton.addEventListener("click", handleBuyComputer);
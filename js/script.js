/**
 * Adding all element that is being used for Komputer Store
 */
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

const API = "https://noroff-komputer-store-api.herokuapp.com/";
let computers = [];
let balance = 0;
let loan = 0;
let pay = 0;

/**
 * Makes a request to the API to fetch the JSON object and puts into the computer array
 */
fetch(API+"computers")
    .then(response => response.json())
    .then(data => computers = data )
    .then(computers => addComputersToDropDown(computers))
    .catch((error) => {
        console.log(error)
    });
/**
 * Adds all elements from the computer to the dropdown menu. After it is done it renders the info about the first computer
 * @param {*} computers An array of computers
 */
const addComputersToDropDown = (computers) => {
    computers.forEach(element => addComputersToDropDownMenu(element));
    
    //First render
    renderComputer(computers[0]);
}
/**
 * Takes a computer object and adds it to computer drop down menu
 * @param {*} computer The computer object that will be added to the drop down menu 
 */
const addComputersToDropDownMenu = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}
/**
 * When a change happens to the drop down menu this function handles this event and calls the render function so the new selected computer will be rendered
 * @param {*} e the event 
 */
const handleComputerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];

    renderComputer(selectedComputer);
}
/**
 * Takes a computer as argument and fetches all features of the computer and return it a string
 * @param {*} computer The computer you want to fetch features from
 * @returns A String of all features that the computer have
 */
const getFeatures = (computer) =>{
    let features = "";
    for(let i = 0; i < computer.specs.length; i++){
        features += computer.specs[i] + "\n";
    }
    return features;
}
/**
 * Renders features, image, title, description and price from the computer object to the Windows
 * @param {*} computer The computer you want to render in the window
 */
const renderComputer = (computer) =>{
    computerFeatures.innerText = getFeatures(computer);
    computerImage.src = API + computer.image;
    computerTitle.innerText = computer.title;
    computerDescription.innerText = computer.description;
    computerPrice.innerText = computer.price + " KR";
}
/**
 * Renders balance, loan and pay to the windows. If loan exists it will show the pay loan button and the outstanding loan.
 * If no loan exists the button and div with loan amount will be hidden
 */
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
/**
 * Handle if the user want to loan money. First it checks if user already have a loan or not. If a loan is present the user cannot loan but i no loan is present the user can loan.
 * Then the user inputs amount he or she wants and a check is done if it is an acceptable amount. If within acceptable amount loan is given, otherwise no loan is given. 
 * When all is done it will render new loan or alert why loan wasn't given
 */
const handleGetLoan = () => {
    if(loan > 0){
        alert("You already have a loan");
    }else{
        const wantedLoan = prompt("How much do you want to loan?");
        
        if(parseInt(wantedLoan) <= 0 || parseInt(wantedLoan) > (balance * 2)){
            alert("You can't loan that amount");
        }else{
        balance += parseInt(wantedLoan);
        loan = parseInt(wantedLoan);
        }
    }
    renderBalance();
}
/**
 *  Takes the pay amount and puts it into balance. If loan exists 10% is deducted to pay the loan. If loan is less than 10% only loan amount is deducted.
 */
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
/**
 * Adds 100 to the pay and render the new pay
 */
const handleWork = () => {
    pay += 100;
    renderBalance();
}
/**
 * Reduces the loan by the pay and set pay to 0. If pay if more than loan, the whole loan gets paided and the remaining amount is put into balance. 
 * If the loan gets paid, pay loan button and the loan amount gets hidden. 
 */
const handlePayLoan = () => {
    if(pay > loan){
        balance += (pay - loan);
        loan = 0;
    }else{
        loan -= pay;
    }
    pay = 0;

    renderBalance();
}
/**
 * Tries to buy selected computer. If computer is in stock and user have enought money a computer will be bought. A computer will be removed from the stock and money removed from balance.
 * If no computer is left in stock or user doesn't have enought money no computer will be bought and an error message will be shown.
 */
const handleBuyComputer = () => {
    const selectedComputer = computers[document.getElementById("computersElement").value-1];
    if(selectedComputer.stock <= 0){
        alert(`No ${selectedComputer.title} left for sale`)
    }else if(balance < selectedComputer.price){
        alert(`You can't buy ${selectedComputer.title}, it's to expensive for you`)
    }else{
        selectedComputer.stock--;
        balance -= selectedComputer.price;
        alert(`You bought ${selectedComputer.title}`);
    }
    
    renderBalance();
}

/**
 * Adds eventlisteners for all buttons and the drop down menu with computers
 */
computersElement.addEventListener("change", handleComputerMenuChange);
getLoanButton.addEventListener("click", handleGetLoan);
bankButton.addEventListener("click", handleBank);
workButton.addEventListener("click", handleWork);
payLoanButton.addEventListener("click", handlePayLoan);
buyButton.addEventListener("click", handleBuyComputer);


const laptops = document.getElementById("Laptops");
const computerSpecs = document.getElementById("computerSpecs");


let computers = [];

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data )
    .then(computers => addComputersDropDown(computers));

const addComputersDropDown = (computers) => {
    computers.forEach(element => addComputersToDropDown(element));
}

const addComputersToDropDown = (computer) => {
    console.log(computer.id)
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    laptops.appendChild(computerElement);
}

const handleComputerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    computerSpecs.innerText = selectedComputer.description;
}

laptops.addEventListener("change", handleComputerMenuChange);


function getLoan(){
    console.log("get a loan");
}

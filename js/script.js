

const computersElement = document.getElementById("computersElement");
const computerFeatures = document.getElementById("computerFeatures");


let computers = [];

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data )
    .then(computers => addComputersDropDown(computers));

const addComputersDropDown = (computers) => {
    computers.forEach(element => addComputersToDropDown(element));
    
    computerFeatures.innerText = getFeatures(computers[0]);
}

const addComputersToDropDown = (computer) => {
    console.log(computer.id)
    console.log(computer.specs)
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}

const handleComputerMenuChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];

    computerFeatures.innerText = getFeatures(selectedComputer);
}

computersElement.addEventListener("change", handleComputerMenuChange);

function getFeatures(element) {
    let features = "";
    for(let i = 0; i < element.specs.length; i++){
        features += element.specs[i] + "\n";
    }
    return features;
}

function getLoan(){
    console.log(computers)
    console.log("get a loan");
}

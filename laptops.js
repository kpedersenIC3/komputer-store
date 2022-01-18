const laptopsElement = document.getElementById("komputers");
const specsElement = document.getElementById("specs");
const imageElement = document.getElementById("komputer-img")
const nameElement = document.getElementById("komputer-name")
const descriptionElement = document.getElementById("description")
const priceElement = document.getElementById("price")
const btnBuyNow = document.getElementById("buykomputer")


//make an array to save the laptops in
let laptops = [];

//The image URL is this part plus the remaining path to each image
//the is found in data.
let imgurl = "https://noroff-komputer-store-api.herokuapp.com/"


//Fetch the data, wait for a response and the add the data to laptops array,
//and then ad the laptops to the menu element.
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addKomputersToMenu(laptops));


const addKomputersToMenu = laptops => {
    //Add each laptop to the menu
    laptops.forEach(x => addKomputerToMenu(x))

    //Display the first laptop (default) in the Laptops section
    for (spec of laptops[0].specs){
        let li = document.createElement("li");
        li.innerText = `${spec}`;
        specsElement.appendChild(li);
    }
    nameElement.innerHTML = laptops[0].title
    descriptionElement.innerHTML = laptops[0].description
    priceElement.innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(laptops[0].price)
    customer.currentlylookingatlaptop = laptops[0];
    imageElement.src = (imgurl + laptops[0].image)



}

const addKomputerToMenu = laptop => {
    //Helper function for "addKomputersToMenu". 
    //Creates the element of the drop-down list for each laptop.
    const laptopElement = document.createElement("option");

    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement)
}

const handleLaptopMenuChange = e => {
    //Function that handles the menu change.
    //First get the current laptop

    const selectedLaptop = laptops[e.target.selectedIndex];

    //remove the default specs and add the new from the selected laptop
    while (specsElement.hasChildNodes()){
        specsElement.removeChild(specsElement.firstChild);
    }
    for (spec of selectedLaptop.specs){
        let li = document.createElement("li");
        li.innerText = `${spec}`;
        specsElement.appendChild(li);
    }
    //Display image and laptop info (corrected for broken imagelink in API)
    if (selectedLaptop.id === 5) imageElement.src = (imgurl + "assets/images/5.png")
    else imageElement.src = (imgurl + selectedLaptop.image)
    
    nameElement.innerHTML = selectedLaptop.title
    descriptionElement.innerHTML = selectedLaptop.description
    priceElement.innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(selectedLaptop.price)
    //Update which laptop the cusotmer is looking at for the buy button
    customer.currentlylookingatlaptop = selectedLaptop
}

const buyKomputer = () => {
    //Function that handles the buy button.
    //Checks if laptop is in inventory and if the customer can afford it.

    const selectedLaptop = customer.currentlylookingatlaptop
    console.log(customer.balance)
    console.log(parseFloat(selectedLaptop.price))

    if(selectedLaptop.stock > 0){
        if(customer.balance >= parseFloat(selectedLaptop.price) ){
            customer.balance -= parseFloat(selectedLaptop.price);
            selectedLaptop.stock -= 1;
            window.confirm("Congratulations! You are the owner of a new laptop")
            document.getElementById("balance").innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.balance)
        }
        else{window.confirm("Insufficient Funds!")}

    }
    else{window.confirm("Out of Stock, please buy a different komputer")}
    

}  
    

//Listeners for the drop down menu and the buy button.
laptopsElement.addEventListener("change", handleLaptopMenuChange);
btnBuyNow.addEventListener("click", buyKomputer) 
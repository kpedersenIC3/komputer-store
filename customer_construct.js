// Create the customer object with the necessary variables
//This is shared between the bank, workplace and store to keep
//track of what the customer is looking at, wants to buy, if he/she works etc.
const customer = {
    name: "Joe Banker",
    balance: 200.,
    loan: 0.,
    numberOfLoans: 0,
    salary: 0.,
    currentlylookingatlaptop: 0,
}

//Show the customer bank info
document.getElementById("name").innerHTML = customer.name
document.getElementById("balance").innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.balance)
document.getElementById("salary").innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.salary)
//Don't show any loans before customer takes a loan
document.getElementById("payoffloanbutton").style.visibility = "hidden"
document.getElementById("showloan").style.visibility = "hidden"
const loanElement = document.getElementById("loan")
const balanceElement = document.getElementById("balance")
const salaryElement = document.getElementById("salary")
const workButton = document.getElementById("workbutton")
const bankTheMoneyButton = document.getElementById("bankmoneybutton")
const payLoanButton = document.getElementById("payoffloanbutton")


const bankTheMoney = () => {
    //Function that checks if the customer has a loan when 
    //banking his salary

    if(customer.numberOfLoans > 0){
        //If customer has a loan, 10% of his pay is 
        //added to his loan as interest before the rest is deposited to his account
        const interest = customer.salary*0.1
        const payoff = customer.salary*0.9
        customer.loan += interest
        customer.balance += payoff

        customer.salary = 0.
    }
    else{
        customer.balance += customer.salary
        customer.salary = 0.
    }
    //update the bank overview
    loanElement.innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.loan)
    balanceElement.innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.balance)
    salaryElement.innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.salary)
}


const work = () => {
    //when work button is pressed, the customer earns 100 units of currency
    customer.salary += 100
    salaryElement.innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.salary)
}

const payOffLoan = () => {
    //Function to pay of the loan. Checks if the customer has
    //enough to pay of the entire loan. Otherwise calculates the remainder.
    if(customer.loan > customer.salary){
        customer.loan -= customer.salary
    }
    else{
        const remainder = customer.salary - customer.loan
        customer.loan = 0.
        customer.balance += remainder
        customer.numberOfLoans = 0
        document.getElementById("showloan").style.visibility = "hidden"
        document.getElementById("payoffloanbutton").style.visibility = "hidden"

    }
    //The entire salary is always used
    customer.salary = 0.
    
    //Update the bank overview
    loanElement.innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.loan)
    balanceElement.innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.balance)
    salaryElement.innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.salary)
    

}   

workButton.addEventListener("click", work)
bankTheMoneyButton.addEventListener("click", bankTheMoney)
payLoanButton.addEventListener("click", payOffLoan)
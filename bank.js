const getALoanButton = document.getElementById("getaloanbutton")

const getALoan = () => {
    //Function for loan button.
    //Checks if customer already has an existing loan and if the 
    //loan value doesn't exceed the allowed amount.

    if(customer.numberOfLoans === 0){

        let loanValue = Number(window.prompt("How much do you want to borrow?"))

        console.log(loanValue)

        const noLoan = () => {
            window.confirm("That's to much buddy. Maximum is twice your balance. Please try again")
        }
        // if(loanValue === 0){
        //     return;
        // }
        if(loanValue > 2*customer.balance){
            noLoan()
            getALoan()
        }
        else if(loanValue === 0){
            return;
        }
        else{
            //customer gets a loan
            customer.numberOfLoans += 1
            customer.loan += loanValue
            customer.balance += loanValue

            document.getElementById("balance").innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.balance)
            document.getElementById("loan").innerHTML = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(customer.loan)
            //Make loan status visible
            document.getElementById("payoffloanbutton").style.visibility = "visible"
            document.getElementById("showloan").style.visibility = "visible"
            
        }
    }
    else{
        //customer already has a loan
        window.confirm("Hold your horses! You have to pay out your old loan before making a new one!")
    }
    
}

getALoanButton.addEventListener("click", getALoan)
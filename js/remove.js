function removeItem() {
    const trashBtn = document.querySelectorAll(".cart-item-remove");
    //console.log("trashbt", trashBtn);
    
    trashBtn.forEach(function(trash) {
        
        //console.log("trash for each", trash);
        trash.addEventListener('click', function(event) {
            console.log("target", event.target);
            //make sure the target is the trash icon - if statement
            if (event.target.parentElement.classList.contains('cart-item-remove')) {
                //console.log("target", event.target.parentElement.parentElement);
                //let moveToTrash = {};
                let itemToMove = event.target.parentElement.parentElement;
                console.log("pokushokus", itemToMove);
                itemToMove.removeChild();
            }
        });
    });
   
}   

function newTotal() {
    console.log("hi");
    const total = [];
    const items = document.querySelectorAll(".cart-item-price");

    items.forEach(function(item) {
        total.push(parseFloat(item.textContent));
        //need to use parseFloat because without it we are getting a string   
    });
    //console.log(total)
    /*reduce method - callback function with two par - total (which we are returning),
        for every item we are looping through */
    const totalMoney = total.reduce(function(total, item) {
        total += item;
        return total;
    },0)


    //total money return float but we want just 2 digits after comma -> toFixed function
    const finalMoney = totalMoney.toFixed(2);

    document.getElementById("cart-total").textContent = finalMoney;
    document.querySelector(".item-total").textContent = finalMoney;
    document.getElementById("item-count").textContent = total.length;

    console.log("final money", finalMoney);
}
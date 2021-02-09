// show cart - immediately envoke function

(function() {
    const cartInfo = document.getElementById("cart-info");
    const cart = document.getElementById("cart");

    cartInfo.addEventListener("click", function(){
        /* toggle - instead of "if" function => toggle specifies class
        if the const has the class of the value we are looking for (in our case 'show-cart')
        it removes the class name
        if it is the oposite, it adds the class name
        */
        cart.classList.toggle("show-cart");
    });
})();

(function() {
    // 1. select store item 
    const cartBtn = document.querySelectorAll(".store-item-icon");

    cartBtn.forEach(function(btn){
        // what I am clicking on - need exact button
        btn.addEventListener("click", function(event){
            //event is object here - we will traverse the dom
            //console.log(event.target);

            if(event.target.parentElement.classList.contains("store-item-icon")) {
                /* get the source of the image I want to buy = traverse through dom 
                     (or we can say through html) and get the element -
                     -> fullPath etc. specification
                */
                //console.log(event.target.parentElement.previousElementSibling.src);
                let fullPath = event.target.parentElement.previousElementSibling.src;
                let pos = fullPath.indexOf('img') + 3;
                //console.log(pos);
                /* we want to slice to get 'img' -> it is connected to '+ 3' 
                    in pos var (img is 3 characters string log)
                   slice function - first par = var where we want the function start, 
                                  - second = how many characters
                */
                let partPath = fullPath.slice(pos);

                // create cart item
                const item = {};
                // specify item elements
                item.img = `img-cart${partPath}`;

                let name = 
                    event.target.parentElement.parentElement.nextElementSibling
                        .children[0].children[0].textContent;
                item.name = name;

                let price = 
                    event.target.parentElement.parentElement.nextElementSibling
                        .children[0].children[1].textContent;
                /* in this price we still have some elements which we dont need - $ sign and space;
                            $ sign is character on the index of 0, 
                            space is char on the index 1 -> i want to splice from index 1
                */
                let finalPrice = price.slice(1).trim();
                // trim remove all extra white space

                item.price = finalPrice;

                //console.log(item);

                //create element which we will put inside the cart
                const cartItem = document.createElement('div');

                cartItem.classList.add(
                    "cart-item", 
                    "itemToRemove",
                    "d-flex", 
                    "justify-content-between", 
                    "text-capitalize",
                    "my-3"
                    );

                /* Template string `inside those backcomma` ... cartItem div classes 
                and the rest of template string 
                     copy pased from html  */
                cartItem.innerHTML = ` 
                    <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                    <div class="item-text">
                        <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                        <span>$</span>
                        <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                    </div>
                    <a href="#" id='cart-item-remove' class="cart-item-remove">
                        <i class="fas fa-trash"></i>
                    </a>
                    </div>
                `;

                //select cart
                const cart = document.getElementById("cart");
                const total = document.querySelector('.cart-total-container');
                // .insertBefore('par which we want to insert', 'where we want the par insert')
                cart.insertBefore(cartItem, total);
                alert('item added to the cart');

                showTotals();
                removeItem();

            }
        })
    })

    //show totals function
    function showTotals() {
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
    
        console.log("show money fun", finalMoney);
    }

    function removeItem() {
        const trashBtn = document.querySelectorAll(".cart-item-remove");
        console.log("trashbt", trashBtn);
        trashBtn.forEach(function(trash) {
            trash.addEventListener('click', function(event) {
                console.log("target", event.target);
                //make sure the target is the trash icon - if statement
                if (event.target.parentElement.classList.contains('cart-item-remove')) {
                    //console.log("target", event.target.parentElement.parentElement);
                    let itemToTrash = document.querySelector(".itemToRemove");
                    itemToTrash.remove();
                    // showTotals();
                    // console.log("remove fun", showTotals);
                }
            });
        });
    
        
    };

})();



//select the item to remove

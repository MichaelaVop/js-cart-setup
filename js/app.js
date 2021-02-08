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
                
                

                console.log(item);


            }
        })
    })


})();

// stopped 34:38
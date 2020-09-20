   // selektovanje proizvoda i korpe

let itemBox = document.querySelectorAll(".item"),
    cart = document.getElementById("korpa");

    // čitanje podatka iz localStorage-a
function getCartData() {
    return JSON.parse(localStorage.getItem("cart"));


}
  // upisivanje podataka u LocalStorage
function setCartData(o) {
    localStorage.setItem("cart", JSON.stringify(o));

}

// funkcija kojom se dodaje proizvod u korpu

function addToCart() {
    //dugme je zaključano tokom rada sa korpom
    this.disabled = true;
    // uzimanje podataka iz korpe ili ako je korpa prazna, kreiranje novog objekta
    let cartData = getCartData() || {},
        parentBox = this.parentNode,
        itemId = this.getAttribute("data-id"),

        itemTitle = parentBox.querySelector(".title").innerHTML,
        itemPrice = parentBox.querySelector(".price").innerHTML;

    if (cartData.hasOwnProperty(itemId)) {
        cartData[itemId][2] += 1;
    } else {

        cartData[itemId] = [itemTitle, itemPrice, 1];

    }
    // ažuriranje podataka u LocalStorage-u
    if (!setCartData(cartData)) {
        this.disabled = false;
    }
    alert("Uspesno ste dodali proizvod u korpu!");

}

for (let i = 0; i < itemBox.length; i++) {
    itemBox[i].querySelector(".add").addEventListener("click", addToCart);

}

// sadržaj korpe

function openCart() {
    let cartData = getCartData(),
        totalItems = "",
        totalGoods = 0,
        totalPrice = 0;
    // generisanje izlaznih podataka
    if (cartData !== null) {
        totalItems = "<table><tr><th>NAZIV</th><th>CENA</th><th>KOLIČINA</th></tr>";


        for (let items in cartData) {
            totalItems += "<tr>";
            for (let i = 0; i < cartData[items].length; i++) {
                totalItems += "<td>" + cartData[items][i] + "</td>";
            }
            totalItems += "</tr>";
            totalGoods += cartData[items][2];
            totalPrice += cartData[items][1] * cartData[items][2];
        }

        totalItems += "</table>";
        cart.innerHTML = totalItems;
        cart.append(
            (document.createElement("p").innerHTML = "Ukupno: " + totalGoods + ". Cena: " + totalPrice)

        );


    }
    else {
        cart.innerHTML = "empty";
        alert("Korpa je prazna!");
    }
}
//otvaranje korpe
document.getElementById("open").addEventListener("click", openCart);

//pražnjenje korpe
document.getElementById("clear").addEventListener("click", () => {
    localStorage.removeItem("cart"),
        cart.innerHTML = "Korpa je prazna!";
    alert("Uspesno ste ispraznili korpu!")


});
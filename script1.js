const vendingMachine = {
  1: {
    name: "Coca Cola",
    price: 40,
    quantity: 10,
    img: "https://cdn.pixabay.com/photo/2016/11/29/04/46/coca-cola-1869724_1280.jpg"
  },
  2: {
    name: "Pepsi",
    price: 40,
    quantity: 10,
    img: "https://cdn.pixabay.com/photo/2016/03/05/19/02/pepsi-1238257_1280.jpg"
  },
  3: {
    name: "Lays Classic Chips",
    price: 20,
    quantity: 10,
    img: "https://cdn.pixabay.com/photo/2020/08/20/17/52/chips-5501681_1280.jpg"
  },
  4: {
    name: "KitKat",
    price: 30,
    quantity: 10,
    img: "https://cdn.pixabay.com/photo/2014/12/21/23/54/kit-kat-575945_1280.jpg"
  },
  5: {
    name: "Snickers",
    price: 35,
    quantity: 10,
    img: "https://cdn.pixabay.com/photo/2017/05/07/08/56/snickers-2299582_1280.jpg"
  },
  6: {
    name: "Oreo Cookies",
    price: 25,
    quantity: 10,
    img: "https://cdn.pixabay.com/photo/2017/01/31/22/24/oreo-2023351_1280.jpg"
  },
  7: {
    name: "Red Bull",
    price: 110,
    quantity: 10,
    img: "https://cdn.pixabay.com/photo/2017/01/19/14/41/red-bull-1990482_1280.jpg"
  },
  8: {
    name: "Tropicana Orange Juice",
    price: 50,
    quantity: 10,
    img: "https://cdn.pixabay.com/photo/2016/10/27/22/47/juice-1776846_1280.jpg"
  },
  9: {
    name: "Pringles",
    price: 90,
    quantity: 10,
    img: "https://cdn.pixabay.com/photo/2018/02/26/19/15/pringles-3188543_1280.jpg"
  },
  10: {
    name: "Dairy Milk",
    price: 45,
    quantity: 10,
    img: "https://cdn.pixabay.com/photo/2018/05/05/22/51/cadbury-3372187_1280.jpg"
  }
};

let myCart = {}


function renderProductsUI() {
  
  let html = `
    <h1>Available Products</h1>
    <div id="cardContainer">
  `

  for (const key in vendingMachine) {
    html += `
            <div class="card" id="c${key}" onclick="addToCart(${key});">
                <img src="${vendingMachine[key]["img"]}" alt="">
                <div class="productName">${vendingMachine[key]["name"]}</div>
                <div class="info">
                    <div class="productPrice">${vendingMachine[key]["price"]} &#8377;</div>
                    <div class="ammountContainer" id="ca${key}" style="display: none;">
                        <div class="decrease" onclick="event.stopPropagation(); decrease(${key});">-</div>
                        <div class="ammount" id="caa${key}">${myCart[key]?.quantity || 0}</div>
                        <div class="increase" onclick="event.stopPropagation(); increase(${key});">+</div>
                    </div>
                </div>
            </div>
            `
  }
  html += `
    </div>
    <div class="btnContainer">
        <div id="cancelBtn">Cancel</div>
        <div id="checkOutBtn">Check Out</div>
    </div>
    `
  // console.log(html)
  // console.log(document.getElementById("cardContainer"));
  document.getElementById("body").innerHTML = html;
}

function renderCartUI() {
  
  let html = `
    <h1>Your Cart</h1>
    <table id="yourCart">
        <thead>
            <th id="siNo0">S.I. No.</th>
            <th id="productName0">Product Name</th>
            <th id="productPrice0">Price</th>
            <th id="quantity0">Quantity</th>
            <th id="total0">Total</th>
        </thead>
  `
  let i = 0, grandTotal = 0;
  for (const key in myCart) {
    i += 1;
    html += `
            <tr>
                <th id="siNo${i}">${i}</th>
                <td id="productName${i}">${myCart[key]["name"]}</td>
                <td id="productPrice${i}">${myCart[key]["price"]}</td>
                <td id="quantity${i}">${myCart[key]["quantity"]}</td>
                <td id="total${i}">${myCart[key]["total"]}</td>
            </tr>
            `
    grandTotal += myCart[key]["total"];
  }
  html += `
        <tr>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td id="grandTotal">${grandTotal}</td>
        </tr>
    </table>
    <div class="btnContainer">
        <div id="cancelBtn">Cancel</div>
        <div id="purchaseBtn">Purchase</div>
    </div>
    `
  // console.log(html)
  // console.log(document.getElementById("cardContainer"));
  document.getElementById("body").innerHTML = html;
  return grandTotal;
}

function renderPaymentUI() {
  
  let html = `
              <h1>Payment Gateway</h1>
              <div id="qrContainer">
                <img src="" id="qrImg">
              </div>
              <div class="btnContainer">
                  <div id="cancelBtn">Cancel</div>
                  <div id="paymentBtn">Payment Done</div>
              </div>
            `
  // console.log(html)
  // console.log(document.getElementById("cardContainer"));
  document.getElementById("body").innerHTML = html;
  return grandTotal;
}

function renderFinaleUI() {
  
  let html = `
              <h1>Product Purchased!</h1>
              <p>Enjoy Your Products!!<br> And <br>Thank You For Using This Vending Machine</p>
            `
  // console.log(html)
  // console.log(document.getElementById("cardContainer"));
  document.getElementById("body").innerHTML = html;
}


function addToCart(itemNumber) {
    if (myCart.hasOwnProperty(itemNumber) || vendingMachine[itemNumber]["quantity"]===0) {
        // return;
        increase(itemNumber)
    } else {
        myCart[itemNumber] = {
            "name": vendingMachine[itemNumber]["name"],
            "price": vendingMachine[itemNumber]["price"],
            "quantity": 1,
            "total": vendingMachine[itemNumber]["price"]
        }
        vendingMachine[itemNumber]["quantity"] -= 1
    } document.getElementById("caa"+itemNumber).textContent = myCart[itemNumber]["quantity"];
    document.getElementById("ca"+itemNumber).style.display = (myCart[itemNumber]["quantity"] === 0) ? "none" : "flex";
    // renderUI();
}

function increase(itemNumber) {
    if (myCart.hasOwnProperty(itemNumber) && vendingMachine[itemNumber]["quantity"]>0) {
        myCart[itemNumber]["quantity"] += 1
        myCart[itemNumber]["total"] += myCart[itemNumber]["price"]
        vendingMachine[itemNumber]["quantity"] -= 1
    }  document.getElementById("caa"+itemNumber).textContent = myCart[itemNumber]["quantity"];
    document.getElementById("ca"+itemNumber).style.display = (myCart[itemNumber]["quantity"] === 0) ? "none" : "flex";
    // renderUI();
}

function decrease(itemNumber) {
    if (myCart.hasOwnProperty(itemNumber) && myCart[itemNumber]["quantity"]>0) {
        myCart[itemNumber]["quantity"] -= 1
        myCart[itemNumber]["total"] -= myCart[itemNumber]["price"]
        vendingMachine[itemNumber]["quantity"] += 1
        if (myCart[itemNumber].quantity === 0) {
            delete myCart[itemNumber];
        }
    } document.getElementById("caa"+itemNumber).textContent = myCart[itemNumber]?.["quantity"]??0;
document.getElementById("ca" + itemNumber).style.display =(myCart[itemNumber]?.quantity ?? 0) === 0 ? "none" : "flex";    // renderUI();
}

function chooseProducts() {
    return new Promise((resolve, reject) => {
        renderProductsUI()

        document.getElementById("checkOutBtn").addEventListener("click", () => {
            console.log("Your Cart is edited")
            console.log(myCart)
            resolve()
        })

        document.getElementById("cancelBtn").addEventListener("click", () => {
            console.log("Your order is canceled")
            myCart = {}            
            console.log(myCart)
            reject()
        })
    })
}

function yourCart() {
    return new Promise((resolve, reject) => {
        grandTotal = renderCartUI()

        document.getElementById("purchaseBtn").addEventListener("click", () => {
            console.log("You are All Set to Purchase Your Goods!!")
            console.log(myCart)
            console.log(grandTotal)
            resolve(grandTotal)
        })

        document.getElementById("cancelBtn").addEventListener("click", () => {
            console.log("Your order is canceled")
            myCart = {}
            grandTotal = 0
            console.log(myCart)
            console.log(grandTotal)
            reject()
        })
    })
}

function paymentCheck() {
    return new Promise((resolve, reject) => {
        renderPaymentUI();

        document.getElementById("paymentBtn").addEventListener("click", () => {
            console.log("Payment Done!!")
            console.log(myCart)
            console.log(grandTotal)
            resolve(grandTotal)
        })

        document.getElementById("cancelBtn").addEventListener("click", () => {
            console.log("Your order is canceled")
            myCart = {}
            grandTotal = 0
            console.log(myCart)
            console.log(grandTotal)
            reject()
        })
    })
}

chooseProducts().
catch(() => {console.log("Exited the Vending Machine")}).
then(yourCart).
catch(() => {console.log("Exited the Vending Machine")}).
then(paymentCheck).
catch(() => {console.log("Exited the Vending Machine")}).
then(renderFinaleUI)

// choose product > check cart and total > move to payment window > checkout

// v1: cart is a single value->number
// v2: cart is now a arr


// const vendingMachine = {
//     1: {
//         name: "Coca Cola",
//         price: 40,
//         img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Coca-Cola_Classic_glass_bottle.webp/512px-Coca-Cola_Classic_glass_bottle.webp"
//     },
//     2: {
//         name: "Pepsi",
//         price: 40,
//         img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pepsi_bottle.webp/512px-Pepsi_bottle.webp"
//     },
//     3: {
//         name: "Lays Classic Chips",
//         price: 20,
//         img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Lay%27s_Classic_Potato_Chips.webp/512px-Lay%27s_Classic_Potato_Chips.webp"
//     },
//     4: {
//         name: "KitKat",
//         price: 30,
//         img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/KitKat_bar.webp/512px-KitKat_bar.webp"
//     },
//     5: {
//         name: "Snickers",
//         price: 35,
//         img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Snickers_bar.webp/512px-Snickers_bar.webp"
//     },
//     6: {
//         name: "Oreo Cookies",
//         price: 25,
//         img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Oreo-Cookies.webp/512px-Oreo-Cookies.webp"
//     },
//     7: {
//         name: "Red Bull",
//         price: 110,
//         img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Red_Bull_Energy_Drink.webp/512px-Red_Bull_Energy_Drink.webp"
//     },
//     8: {
//         name: "Tropicana Orange Juice",
//         price: 50,
//         img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Tropicana_Orange_Juice.webp/512px-Tropicana_Orange_Juice.webp"
//     },
//     9: {
//         name: "Pringles",
//         price: 90,
//         img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Pringles_can.webp/512px-Pringles_can.webp"
//     },
//     10: {
//         name: "Dairy Milk",
//         price: 45,
//         img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cadbury_Dairy_Milk_Chocolate.webp/512px-Cadbury_Dairy_Milk_Chocolate.webp"
//     }
// };


// console.log(`Items Available: `)
// console.log(itemAvailable)

function chooseProducts(list) {
    return new Promise(function (resolve, reject) {
        if (Object.keys(list).length > 0 && Object.keys(list).length <= Object.keys(vendingMachine).length) {
            console.log(`=============\n  Your cart  \n=============\n\nSi.No.\tProduct\tQuantity\tCost/Product`)
            let i = 0
            for (const key in list) {
                i++
                console.log(`${i}\t${vendingMachine[key]["name"]}\t${list[key]}\t${vendingMachine[key]["price"]}`)
            }
            resolve(list)
        } else {
            console.log("Wrong Choice")
            reject()
        }
    })
}

function checkCart(list) {
    return new Promise(function (resolve, reject) {
        let total = 0
        for (const key in list) {
            total = total + vendingMachine[key]["price"] * list[key]
        }
        if (total > 0) {
            console.log(`Your cart costs: ${total} Rupees`)//Si.No.\tProduct\tQuantity\tCost/Product
            resolve(total)
        } else {
            console.log("Your cart is Empty")
            reject()
        }
    })
}

function paymentGateway(total) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            let isPaid = true
            if (isPaid) {
                console.log("Payment Statust: Paid")
                resolve()
            } else {
                console.log("Payment Statust: Failed")
                reject()
            }
        }, 3000);
    })
}

function checkOut() {
    console.log("Thank You for Using This Machine")
}

let order = "5 5 6 7 10 1 6"//prompt("Enter your choice: ")
let myCart = order.split(" ").reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
}, {});
console.log(myCart)

chooseProducts(myCart).
    then(checkCart).
    then(paymentGateway).
    then(checkOut).catch(function () {
        console.log("Sorry, Something went wrong!!")
    })
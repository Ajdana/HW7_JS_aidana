let cart = {};
const cartList = document.querySelector('.cart-items');
const cartCount = document.querySelector('.number');
const totalElem = document.querySelector('.total');
const mainButton=document.querySelector('.mainButton');
const final=document.querySelector('.final');
const body=document.querySelector('.container');
const restart=document.querySelector('.btnRestart')
restart.addEventListener('click', () => {
    cart = {};
    cartList.innerHTML = '';
    cartCount.innerText = '0';
    totalElem.innerText = '$0.00';

    document.querySelectorAll('.btn').forEach(btn => {
        btn.innerHTML = `<img src="icon-add-to-cart.svg"> Add to Cart`;
        btn.style.backgroundColor = 'white';
        btn.style.color = 'black';
        btn.style.left = '25%';
        btn.style.gap = '5px';
        btn.style.border = '1px solid grey';
    });

    final.style.display = 'none';
    body.style.filter = 'none';

    document.querySelector('.Total').style.display = 'none';
    mainButton.style.display = 'none';

    document.querySelector('.emptyCon').style.display = 'block';
});



mainButton.addEventListener('click', function (){
    final.style.display = 'block'
    body.style.filter = 'grayscale(100%)'
    cartList.style.display = 'block'
    const cartItems = cartList.querySelectorAll('p');
    const finalCartList = final.querySelector('.cart-items');

    cartItems.forEach(item => {
        const clonedItem = item.cloneNode(true);
        finalCartList.appendChild(clonedItem);
    });
})

document.querySelectorAll('.btn').forEach(btn => {
btn.addEventListener('click', () => {
    const box = btn.closest('.box');
    const name = box.querySelector('h3').innerText;
    const price = parseFloat(box.querySelector('.cost').innerText.slice(1));
    const emptyCon=document.querySelector('.emptyCon')
    const total=document.querySelector('.Total')
    btn.style.backgroundColor = '#C83B0E'
    btn.style.color = 'white'
    btn.style.left = '26%'
    btn.style.gap = '23px'
    btn.style.border = 'none'
    emptyCon.style.display = 'none'
    total.style.display = 'block'
    mainButton.style.display ='block'
    if (!cart[name]) {
        cart[name] = { price, qty: 1 };

        const minus = document.createElement('button');
        minus.innerText = '-';
        minus.style.backgroundColor = 'transparent'
        minus.style.padding = '2px 7px'
        minus.style.borderRadius = '100%'
        minus.style.border = '0.5px solid white'
        minus.style.color = 'white'

        const plus = document.createElement('button');
        plus.innerText = '+';
        plus.style.backgroundColor = 'transparent'
        plus.style.padding = '2px 6px'
        plus.style.borderRadius = '100%'
        plus.style.border = '0.5px solid white'
        plus.style.color = 'white'
        const span = document.createElement('span');
        span.innerText = '1';

        btn.innerHTML = '';
        btn.append(minus, span, plus);

        minus.addEventListener('click', () => updateQty(name, -1, btn, span));
        plus.addEventListener('click', () => updateQty(name, 1, btn, span));
    }

    renderCart();
});
});

function updateQty(name, change, btn, span) {
cart[name].qty += change;
if (cart[name].qty <= 0) {
delete cart[name];
btn.innerHTML = `<img src="icon-add-to-cart.svg"> Add to Cart`;
} else {
span.innerText = cart[name].qty;
}
renderCart();
}

function renderCart() {
cartList.innerHTML = '';
let total = 0, count = 0;
for (let [name, item] of Object.entries(cart)) {
cartList.innerHTML += `<p>${item.qty}× ${name} — $${(item.price * item.qty).toFixed(2)}</p>`;
total += item.qty * item.price;
count += item.qty;
}
cartCount.innerText = count;
totalElem.innerText = '$' + total.toFixed(2);
}



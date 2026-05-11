let cart = {};
let total = 0;

function addToCart(name, price){

    if(cart[name]){
        cart[name].qty += 1;
    }else{
        cart[name] = {
            price: price,
            qty: 1
        };
    }

    renderCart();
}

function renderCart(){
    let cartList = document.getElementById("cartList");
    cartList.innerHTML = "";
    total = 0;

    for(let name in cart){
        let item = cart[name];
        let li = document.createElement("li");

        li.innerHTML = `
            ${name} x ${item.qty} - ${item.price * item.qty}đ 
            <button onclick="removeItem('${name}')">Xóa</button>
        `;

        cartList.appendChild(li);

        total += item.price * item.qty;
    }

    document.getElementById("totalPrice").innerText = total + " VND";
}

function removeItem(name){
    delete cart[name];
    renderCart();
}

function clearCart(){
    cart = {};
    renderCart();
}

function pay(){
    if(total === 0){
        alert("Bạn chưa chọn sản phẩm!");
        return;
    }

    let method = document.getElementById("payment").value;

    alert("Thanh toán thành công!\nPhương thức: " + method + "\nTổng tiền: " + total + " VND");

    clearCart();
}
function pay(){
    if(total === 0){
        alert("Bạn chưa chọn sản phẩm!");
        return;
    }

    let method = document.getElementById("payment").value;

    alert("Thanh toán thành công!\nPhương thức: " + method + "\nTổng tiền: " + total + " VND");

    clearCart();
}
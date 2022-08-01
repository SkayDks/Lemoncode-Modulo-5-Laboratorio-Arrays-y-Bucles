const carrito = [
  {
    id: 198752,
    name: "Tinta DJ27 Color",
    price: 52.95,
    count: 3,
    premium: true,
  },
  {
    id: 75621,
    name: "Impresora ticketera PRO-201",
    price: 32.75,
    count: 2,
    premium: true,
  },
  {
    id: 54657,
    name: "Caja de rollos de papel para ticketera",
    price: 5.95,
    count: 3,
    premium: false,
  },
  {
    id: 3143,
    name: "Caja de folios DIN-A4 80gr",
    price: 9.95,
    count: 2,
    premium: false,
  },
];

function totalPrice(object) {
  let total = 0;
  for (reserve of object) {
    total += reserve.price * reserve.count;
  }
  return total;
}

function discount(object) {
  let node;
  let total = totalPrice(object);
  let discount = 0.05;

  if (total > 100) {
    node = document.querySelector(".cartFooter > :last-child");
    node.innerText =
      "Total dicounted(5%): " + (total - total * discount).toFixed(2) + "€";
  }
}

function premiumItem(object) {
  let cartPremium = [];
  for (itemCart of object) {
    if (itemCart.premium) cartPremium.push(itemCart);
  }
  return cartPremium;
}

function shippingCosts(object) {
  let isNoPremium = false;
  for (i in object) {
    isNoPremium = isNoPremium || object[i].premium === false;
  }
  text = isNoPremium
    ? "Este pedido tiene gastos de envío"
    : "Pedido sin gastos de envío";
  node = document.querySelector(".cartFooter > :first-child");
  node.innerText = text;
}

function createItem(item) {
  let atributeItems = ["product", "row", "name", "price", "count", "premium"];
  let elements = ["div", "span"];
  let nodeElement, node, fatherNode;

  for (i = 0; i < atributeItems.length; i++) {
    nodeElement = i < 2 ? elements[0] : elements[1];

    node = document.createElement(nodeElement);
    node.setAttribute("class", atributeItems[i]);

    if (i >= 2) {
      node.innerText =
        item[atributeItems[i]] === true
          ? "Premium"
          : item[atributeItems[i]] === false
          ? ""
          : (node.innerText = item[atributeItems[i]]);
    }

    if (i === 0) fatherNode = node;
    else {
      switch (i) {
        case 1:
        case 4:
        case 5:
          fatherNode.appendChild(node);
          break;
        default:
          fatherNode.firstChild.appendChild(node);
          break;
      }
    }
    document.querySelector(".cartContainer").appendChild(fatherNode);
  }
}

function createCart(object) {
  for (itemCart of object) {
    createItem(itemCart);
  }
}

function deleteItem(object, id) {
  let item;
  for (i in object) {
    console.log(object[i].id === id);
    if (object[i].id === id) item = i;
  }
  object.splice(item, 1);
  console.log(object);
}

function print(object) {
  createCart(object);
  shippingCosts(object);
  discount(object);
  document.querySelector(".totalPrice").innerHTML =
    totalPrice(object).toFixed(2);
}

function handlerOnlyPremium(e) {
  let fatherNode = document.querySelector(".cartContainer");
  let fatherNodeCount = fatherNode.childElementCount;
  let cart = e.target.checked ? premiumItem(carrito) : carrito;

  if (fatherNodeCount !== 0) {
    for (i = 0; i < fatherNodeCount; i++) {
      fatherNode.firstChild.remove();
    }
  }
  print(cart);
}

document
  .querySelector("#onlyPremium")
  .addEventListener("click", handlerOnlyPremium);

deleteItem(carrito, 54657);

print(carrito);

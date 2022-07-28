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

/*
Mostrar el carrito de la compra.
--Listar todos los productos.
--Eliminar el producto con id 54657 del carrito de la compra.
--Calcular el total del carrito de la compra (el coste de una línea es precio * cantidad).
--Filtrar por los productos que sean prime.
Opcional:
--Si todos los productos son prime mostrar un mensaje "Pedido sin gastos de envío", si no "Este pedido
--tiene gastos de envío".
--Mostrar el carrito en un listado de html básico.
--Aplicar un descuento del 5% si la compra es mayor de 100 €. 
*/
function createItem(item) {
  let atributeItems = ["product", "row", "name", "price", "count", "premium"];
  let elements = ["div", "span"];
  let nodeElement, node, parentNode, premium;

  for (k = 0; k < item.length; k++) {
    for (i = 0; i < atributeItems.length; i++) {
      nodeElement = i < 2 ? elements[0] : elements[1];

      node = document.createElement(nodeElement);
      node.setAttribute("class", atributeItems[i]);

      if (i >= 2) {
        if (atributeItems[i] === "premium")
          node.innerText = item[k][atributeItems[i]] ? "Premium" : "";
        else node.innerText = item[k][atributeItems[i]];
      }

      if (i === 0) parentNode = node;
      else {
        switch (i) {
          case 1:
          case 4:
          case 5:
            parentNode.appendChild(node);
            break;
          default:
            parentNode.firstChild.appendChild(node);
            break;
        }
      }
    }

    document.querySelector(".cartContainer").appendChild(parentNode);
  }
}

createItem(carrito);

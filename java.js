function cambiarVentana(ventana) {
  document
    .querySelectorAll(".window")
    .forEach((v) => v.classList.remove("active"));
  document.getElementById(ventana).classList.add("active");
}

// ===================== PRODUCTOS =====================
const productos = [
  {
    nombre: "Pan Integral",
    precio: 2.5,
    desc: "Harina 100% integral",
    img: "https://via.placeholder.com/250x250.png?text=Pan+Integral",
  },
  {
    nombre: "Pan Francés",
    precio: 1.8,
    desc: "Suave y crujiente",
    img: "https://via.placeholder.com/250x250.png?text=Pan+Frances",
  },
  {
    nombre: "Croissant",
    precio: 1.2,
    desc: "Mantequilla premium",
    img: "https://via.placeholder.com/250x250.png?text=Croissant",
  },
  {
    nombre: "Pastel Chocolate",
    precio: 15,
    desc: "Bizcocho húmedo y cremoso",
    img: "https://via.placeholder.com/250x250.png?text=Pastel+Chocolate",
  },
  {
    nombre: "Baguette",
    precio: 2.2,
    desc: "Clásica francesa",
    img: "https://via.placeholder.com/250x250.png?text=Baguette",
  },
  {
    nombre: "Donas",
    precio: 0.8,
    desc: "Cubiertas de azúcar y chocolate",
    img: "https://via.placeholder.com/250x250.png?text=Donas",
  },
  {
    nombre: "Muffins",
    precio: 1.5,
    desc: "Esponjosos y variados sabores",
    img: "https://via.placeholder.com/250x250.png?text=Muffins",
  },
  {
    nombre: "Empanadas de Queso",
    precio: 2.8,
    desc: "Rellenas de queso artesanal",
    img: "https://via.placeholder.com/250x250.png?text=Empanadas+Queso",
  },
];

function mostrarProductos() {
  const cont = document.getElementById("productosLista");
  cont.innerHTML = "";
  productos.forEach((p, index) => {
    cont.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>${p.desc}</p>
        <p class="price">$${p.precio.toFixed(2)}</p>
        <button class="button" onclick="agregarAlCarrito(${index})">Comprar</button>
      </div>`;
  });
}
mostrarProductos();

// ===================== CARRITO =====================
let carrito = [];

function agregarAlCarrito(index) {
  carrito.push(productos[index]);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carritoLista");
  const total = document.getElementById("totalCarrito");
  lista.innerHTML = "";

  let suma = 0;
  carrito.forEach((item) => {
    lista.innerHTML += `<li>${item.nombre} - $${item.precio.toFixed(2)}</li>`;
    suma += item.precio;
  });

  total.innerHTML = `<b>Total:</b> $${suma.toFixed(2)}`;
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

// ===================== CONTACTO =====================
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Gracias por contactarnos, pronto te responderemos.");
  this.reset();
});

function mostrarFactura() {
  const lista = document.getElementById("facturaLista");
  const total = document.getElementById("totalFactura");
  lista.innerHTML = "";

  let suma = 0;
  carrito.forEach((item) => {
    lista.innerHTML += `<li>${item.nombre} - $${item.precio.toFixed(2)}</li>`;
    suma += item.precio;
  });

  total.innerHTML = `<b>Total:</b> $${suma.toFixed(2)}`;
}

// Cada vez que se abra la ventana de facturación, se actualiza
document
  .querySelector("button[onclick=\"cambiarVentana('ventanaFactura')\"]")
  .addEventListener("click", mostrarFactura);

// Procesar la factura
document.getElementById("facturaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (carrito.length === 0) {
    alert("El carrito está vacío, no se puede generar factura.");
    return;
  }

  const cliente = document.getElementById("cliente").value;
  const direccion = document.getElementById("direccion").value;
  const metodoPago = document.getElementById("metodoPago").value;

  alert(
    `✅ Factura generada para ${cliente}\n📍 Dirección: ${direccion}\n💳 Pago: ${metodoPago}\n🛒 Total: ${
      document.getElementById("totalFactura").innerText
    }`
  );

  // Simulación: vaciamos carrito tras facturar
  vaciarCarrito();
  this.reset();
  cambiarVentana("ventanaInicio");
});

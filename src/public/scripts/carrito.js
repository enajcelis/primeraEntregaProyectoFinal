let divDetalleCarrito = document.getElementById('detalleCarrito');
let cartId = DEFAUL_CART_ID;

fetch(`/api/carrito/${cartId}/productos`)
	.then(response => response.json())
	.then(data => {
		let productos = "";
		data.forEach(producto => {
			productos = productos + `
				<div class="card mt-2 bg-light border">
					<div class="card-header">
						<h5 class="card-title">${producto.nombre}</h5>
					</div>
					<div class="card-body">
						<h6 class="card-subtitle mb-2 text-muted">${producto.descripcion}</h6>
						<p class="card-text">
							Código: ${producto.codigo}<br>
							Stock: ${producto.stock}
						</p>
						<p class="card-text"><small class="text-muted"><i class="bi bi-currency-dollar"></i> ${producto.precio}</small></p>
					</div>
					<div class="card-footer bg-transparent border">
						<a href="#" class="btn btn-sm btn-outline-danger" onclick="deleteProductFromCartAction(this)" name="deleteProductButton" data-id="${producto.id}" data-name="${producto.nombre}"><i class="bi bi-cart4"></i> Eliminar del carrito</a>
					</div>
				</div>
			`;
		});
		divDetalleCarrito.innerHTML = productos;
	}
);

const deleteProductFromCartAction = (btn) => {
	let productId = btn.getAttribute('data-id');
	let productName = btn.getAttribute('data-name');

	Swal.fire({
		title: "¿Estás seguro?",
		text: `Estás por eliminar de tu carrito el producto: ${productName}.`,
		type: "warning",
		showCancelButton: true,
		allowOutsideClick: false,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Aceptar',
		cancelButtonText: "Cancelar"
	}).then((result) => {
		if(result.dismiss === 'cancel') return false;

		fetch(`/api/carrito/${cartId}/productos/${productId}`, {
			method: 'DELETE'
		})
		.then(response => response.json())
		.then(data => location.reload());
	});
};
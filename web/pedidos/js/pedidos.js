
function crearPedido(){
    var servicio = "pedido";
    sessionStorage.setItem("servicio",servicio);
    window.location.replace(( sessionStorage.getItem("url")+"pedidos/html/"+servicio+".html"));   
}



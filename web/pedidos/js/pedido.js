
$(document).ready(function () {
   var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
   debugger
   document.getElementById('idNumeroPedido').innerHTML = 'Nº '+pedido.ped__num;
   document.getElementById('lbSucursal').innerHTML = pedido.suc__cod;
   document.getElementById('lbNITCliente').innerHTML = pedido.ter__nit;
   document.getElementById('lbCliente').innerHTML = "pendiente";
   document.getElementById('lbCdePago').innerHTML = pedido.pago__cod;
   document.getElementById('lbDivisa').innerHTML = pedido.mnd__cla;
   document.getElementById('lbVendedor').innerHTML = pedido.ven__cod;
   document.getElementById('lbSolicitante').innerHTML = pedido.ped__pqs;
   document.getElementById('lbFecha').innerHTML = pedido.ped__fec;
   document.getElementById('lbFechaEntrega').innerHTML = pedido.ped__fec__ent;
   document.getElementById('lbEstablecimiento').innerHTML = pedido.ped__num;
   document.getElementById('lbDireccion').innerHTML = pedido.ter__dir;
   document.getElementById('lbTelefono').innerHTML = pedido.ter__tel;
   document.getElementById('lbCiudad').innerHTML = pedido.ciu__cod;
   document.getElementById('lbObservaciones').innerHTML = pedido.obs__ped;
   
});

function popUpPedidoCU() {
    var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (80 / 100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (50 / 100);

    $("body").append("<div id='windowPedidoCabecera'></div>");
    var myWindow = $("#windowPedidoCabecera");
    var undo = $("#undo");

    function onCloseWindowItemFac() {
        document.getElementById("windowPedidoCabecera").remove();
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: widthPopUp,
        height: heightPopUp,
        title: "Crear",
        content: sessionStorage.getItem("url") + "/pedidos/html/pedidoCabecera.html",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: onCloseWindowItemFac
    }).data("kendoWindow").center().open();
}

function closePopUpCabecera(){    
    $("#windowPedidoCabecera").data("kendoWindow").close();
}

function nuevoPedido(){
    sessionStorage.removeItem("regPedidos");
    popUpPedidoCU();
}

function volverPedidos(){
    var servicio="pedidos"    
    window.location.replace(( sessionStorage.getItem("url")+servicio+"/html/"+servicio+".html"));  
}
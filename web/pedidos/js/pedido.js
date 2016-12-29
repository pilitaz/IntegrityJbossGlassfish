
$(document).ready(function () {
   var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
   
   document.getElementById('idNumeroPedido').innerHTML = 'Nº '+pedido.ped__num;
   document.getElementById('lbSucursal').innerHTML = pedido.suc__nom;
   document.getElementById('lbNITCliente').innerHTML = pedido.ter__nit;
   document.getElementById('lbCliente').innerHTML = pedido.ter__raz;
   document.getElementById('lbCdePago').innerHTML = pedido.pago__nom;
   document.getElementById('lbDivisa').innerHTML = pedido.mnd__nom;
   document.getElementById('lbVendedor').innerHTML = pedido.ven__nom;
   document.getElementById('lbSolicitante').innerHTML = pedido.ped__pqs;
   document.getElementById('lbFecha').innerHTML = pedido.ped__fec;
   document.getElementById('lbFechaEntrega').innerHTML = pedido.ped__fec__ent;
   document.getElementById('lbEstablecimiento').innerHTML = pedido.com__con;
   document.getElementById('lbDireccion').innerHTML = pedido.ter__dir;
   document.getElementById('lbTelefono').innerHTML = pedido.ter__tel;   
   document.getElementById('lbCiudad').innerHTML = pedido.ciu__nom;
   document.getElementById('lbObservaciones').innerHTML = pedido.obs__ped;
   
   //sessionStorage.setItem("listaPrecioCliente", dataCliente.lis__num);
   
   gridDetallePedido();
   
});

function popUpPedidoCU() {
    var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (80 / 100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (60 / 100);

    $("body").append("<div id='windowPedidoCabecera'></div>");
    var myWindow = $("#windowPedidoCabecera");
    var undo = $("#undo");

    function onCloseWindowCabPedido() {
        document.getElementById("windowPedidoCabecera").remove();
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: widthPopUp,
        height: heightPopUp,
        title: "Editar",
        content: sessionStorage.getItem("url") + "/pedidos/html/pedidoCabecera.html",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: onCloseWindowCabPedido
    }).data("kendoWindow").center().open();
}

function closePopUpCabecera(){    
    $("#windowPedidoCabecera").data("kendoWindow").close();
    location.reload();
}

function nuevoPedido(){
    sessionStorage.removeItem("regPedidos");    
    popUpPedidoCU();
}

function volverPedidos(){
    var servicio="pedidos"    
    window.location.replace(( sessionStorage.getItem("url")+servicio+"/html/"+servicio+".html"));  
}

function gridDetallePedido(){    
    var dataSourcePedido = new kendo.data.DataSource({
        data : JSON.parse(sessionStorage.getItem("regPedidos")).eegpd_ped_det,
    });
    
    var grid = $("#gridDetallePedido").kendoGrid({
        dataSource: dataSourcePedido,       
        selectable: false,
        height: 500,        
        columns: [            
            {
                field: "lis__num",
                title: "Lista de precios"
            },
            {
                field: "cla__cod",
                title: "Clase de articulo"
            },
            {
                field: "art__des",
                title: "Articulo"
            },                       
            {
                field: "pre__pcod",
                title: "Presentación"
            },
            {
                field: "lpd__pre",
                title: "Valor unitario",
                format: "{0:c}"
            },
            {
                field: "ped__can",
                title: "Cantidad",
                format: "{0:n}"
            },
            {
                field: "ped__dct",
                title: "Descuento",
                format: "{0:n}"
            },
            {
                field: "ped__iva",
                title: "IVA",
                format: "{0:n}"
            },
            { command: [
                    {name: "editar", click: "", template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "eliminar", click: "", template: "<a class='k-grid-eliminar'><span class='k-sprite po_cerrar'></span></a>"}
                ] 
                }],
        editable: {
            mode: "popup",
            window: {
                title: "Editar",
                animation: false,
                width: "700px"
            }            
        },
        cancel: function (e) {            
            e._defaultPrevented = true;
            $('#grid').data('kendoGrid').refresh();
        },        
    }).data("kendoGrid");    
}

function agregarItemDetalle(e){    
    
    var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (60/100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (40/100);
    
    $("body").append("<div id='windowItemPedido'></div>");
    var myWindow = $("#windowItemPedido");
    var undo = $("#undo");
    
    function onCloseWindowItemPedido() {
        document.getElementById("windowItemPedido").remove();            
        undo.fadeIn();  
    }
    
    myWindow.kendoWindow({
        width: widthPopUp,
        height: heightPopUp,
        title: "Agregar",
        content: sessionStorage.getItem("url")+ "/pedidos/html/popupItemPedido.html",
        visible: false,
        modal: true,
        actions: [            
            "Close"
        ],
        close: onCloseWindowItemPedido
    }).data("kendoWindow").center().open();
    //    }
}

function closePopUp(){    
    $("#windowItemPedido").data("kendoWindow").close();
}
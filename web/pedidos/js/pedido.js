
var itemPedido;

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
   sessionStorage.setItem("listaPrecioCliente", pedido.lis__num);
   
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
        selectable: true,
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
                    {name: "editar", click: editarItem, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "eliminar", click: eliminarItem, template: "<a class='k-grid-eliminar'><span class='k-sprite po_cerrar'></span></a>"}
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
            $('#gridDetallePedido').data('kendoGrid').refresh();
        },        
    }).data("kendoGrid");
    
    function eliminarItem(e){         
        e.preventDefault();
        
        var grid = $("#gridDetallePedido").data("kendoGrid");
        itemPedido = grid.dataItem(grid.select());
        var ItemEliminado;
        
        var objDetalePed = new SICUDDetallePedido();
        var jsonDetalePed = objDetalePed.getjson();
        var urlDetalePed = objDetalePed.getUrlSir();
        var mapDataDetalePed = objDetalePed.getMapData();
        
        var key1 = Object.keys(jsonDetalePed)[0];
        var key2 = Object.keys(jsonDetalePed[key1])[1];
        jsonDetalePed[key1][key2][0].suc__cod = itemPedido.suc__cod;
        jsonDetalePed[key1][key2][0].clc__cod = itemPedido.clc__cod;
        jsonDetalePed[key1][key2][0].ped__fec = itemPedido.ped__fec;//lista del cliente        
        jsonDetalePed[key1][key2][0].ped__num = itemPedido.ped__num;
        jsonDetalePed[key1][key2][0].lis__num = itemPedido.lis__num;
        jsonDetalePed[key1][key2][0].cla__cod = itemPedido.cla__cod;//lista del cliente        
        jsonDetalePed[key1][key2][0].art__cod = itemPedido.art__cod;    
        jsonDetalePed[key1][key2][0].pre__pcod = itemPedido.pre__pcod;
        jsonDetalePed[key1][key2][0].ped__can = itemPedido.ped__can;
        jsonDetalePed[key1][key2][0].lpd__pre = itemPedido.lpd__pre;
        jsonDetalePed[key1][key2][0].ped__dct = itemPedido.ped__dct;   
        jsonDetalePed[key1][key2][0].ped__iva = itemPedido.ped__iva;
        
        $.ajax({
            type: "DELETE",
            data: JSON.stringify(jsonDetalePed),
            url: urlDetalePed,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) {
                ItemEliminado = e[key1].eeEstados[0].Estado;;                
            },
            error: function (e) {                
                alertDialogs("Error consumiendo el servicio de guardar\n"+ e.status +" - "+ e.statusText);
            }
        }).done(function(){
            if(ItemEliminado==="OK"){
                var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
                
                var objFiltroPedidos = new sirConsultaPedidos();
                var jsonFiltroPedidos = objFiltroPedidos.getjson();
                var urlFiltroPedidos = objFiltroPedidos.getUrlSir();
                var mapDataFiltroPedidos = objFiltroPedidos.getMapData();
                
                var key1 = Object.keys(jsonFiltroPedidos)[0];
                var key2 = Object.keys(jsonFiltroPedidos[key1])[1];
                jsonFiltroPedidos[key1][key2][0].pidped_fec = pedido.ped__fec;
                jsonFiltroPedidos[key1][key2][0].piiped_num = pedido.ped__num;
                jsonFiltroPedidos[key1][key2][0].picsuc_cod = pedido.suc__cod;
                
                try{                
                    $.ajax({
                        type: "POST",
                        data: JSON.stringify(jsonFiltroPedidos),
                        url: urlFiltroPedidos,
                        dataType : "json",
                        contentType: "application/json;",
                        success: function (e) {                        
                            if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                                return e[key1][mapDataFiltroPedidos];
                            } else {
                                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                            }
                        },
                        error: function (e) {
                            alertDialogs(" Error al consumir el servicio 733"+ e.status +" - "+ e.statusText);                
                        }
                    }).done(function(e){            
                        var pedido = e[key1][mapDataFiltroPedidos][0];
                        sessionStorage.setItem("regPedidos", JSON.stringify(pedido));
                        gridDetallePedido();
                    });
                }catch (e) {
                    alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
                }
            }else{                    
                alertDialogs("Pedido con errores  \n"+ItemEliminado);                         
            }
        });
    }
    
    function editarItem(e){        
        e.preventDefault();
        
        var grid = $("#gridDetallePedido").data("kendoGrid");
        itemPedido = grid.dataItem(grid.select());
        
        var widthPopUp = $("body").width();
        widthPopUp = widthPopUp * (60/100);
        var heightPopUp = $("body").height();
        heightPopUp = heightPopUp * (50/100);
        
        $("body").append("<div id='windowItemPedido'></div>");
        var myWindow = $("#windowItemPedido");        
        var undo = $("#undo");
        
        function onCloseWindowItemFacEdit() {
            
            document.getElementById("windowItemPedido").remove();            
            undo.fadeIn();  
        }
        
        myWindow.kendoWindow({
            width: widthPopUp,
            height: heightPopUp,
            title: "Editar",
            content: sessionStorage.getItem("url") + "/pedidos/html/popupItemPedido.html",
            visible: false,
            modal: true,
            actions: [            
                "Close"
            ],
            close: onCloseWindowItemFacEdit
        }).data("kendoWindow").center().open();
    }
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
    var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
    
    var objFiltroPedidos = new sirConsultaPedidos();
    var jsonFiltroPedidos = objFiltroPedidos.getjson();
    var urlFiltroPedidos = objFiltroPedidos.getUrlSir();
    var mapDataFiltroPedidos = objFiltroPedidos.getMapData();
    
    var key1 = Object.keys(jsonFiltroPedidos)[0];
    var key2 = Object.keys(jsonFiltroPedidos[key1])[1];
    jsonFiltroPedidos[key1][key2][0].pidped_fec = pedido.ped__fec;
    jsonFiltroPedidos[key1][key2][0].piiped_num = pedido.ped__num;
    jsonFiltroPedidos[key1][key2][0].picsuc_cod = pedido.suc__cod;
    debugger
    try{                
        $.ajax({
            type: "POST",
            data: JSON.stringify(jsonFiltroPedidos),
            url: urlFiltroPedidos,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) {                        
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    return e[key1][mapDataFiltroPedidos];
                } else {
                    alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            error: function (e) {
                alertDialogs(" Error al consumir el servicio 733"+ e.status +" - "+ e.statusText);                
            }
        }).done(function(e){            
            var pedido = e[key1][mapDataFiltroPedidos][0];
            sessionStorage.setItem("regPedidos", JSON.stringify(pedido));
            gridDetallePedido();
        });
    }catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: 740 " + e.message);
    }
}
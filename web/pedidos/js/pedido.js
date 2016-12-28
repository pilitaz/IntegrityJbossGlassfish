
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

    function onCloseWindowItemFac() {
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

function gridDetallePedido(){
    
    var dataSourcePedido = new kendo.data.DataSource({
        data : JSON.parse(sessionStorage.getItem("regPedidos")).eegpd_ped_det,
    });
    
    
    //var dataGridDetalle = JSON.parse(sessionStorage.getItem("regPedidos")).eegpd_ped_det;
    
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
//        rowTemplate: kendo.template($("#rowTemplateItem").html()),
//        altRowTemplate: kendo.template($("#altRowTemplateItem").html()),
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
    
//    function eliminarItem(e){ 
//        
//        e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
//        
//        var grid = $("#grid").data("kendoGrid");
//        var itemID = grid.dataItem(grid.select());
//        var itemGuardado;
//        
//        var authdsSIRgfc_fac = new Object();
//        authdsSIRgfc_fac.dsSIRgfc_fac = new Object();
//        authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos = new Array();
//        authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0] = new Object();
//        authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
//        authdsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].fiid = sessionStorage.getItem("picfiid");
//        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms = new Array();
//        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0] = new Object();
//        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].tcon__cod = itemID.CodConceptoDet;
//        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].clc__cod = $("#ipCDocumento").val();
//        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].fac__nro = sessionStorage.getItem("facturaNumero");
//        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].fac__fec = $("#ipFecha").val();
//        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].suc__cod = $("#ipSucursal").val();
//        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].art__cod = itemID.ArticuloId;
//        authdsSIRgfc_fac.dsSIRgfc_fac.eegfc_itms[0].cla__cod = itemID.CodClaseArticulo;        
//        console.log(JSON.stringify(authdsSIRgfc_fac));
//        
//        $.ajax({
//            type: "DELETE",
//            data: JSON.stringify(authdsSIRgfc_fac),
//            url: ipServicios+baseComercial+"SICUDgfc_itms",
//            dataType : "json",
//            contentType: "application/json;",
//            success: function (resp) {                
//                itemGuardado = resp.dsSIRgfc_fac.eeEstados[0].Estado;                
//            },
//            error: function (e) {
//                console.log(JSON.stringify(e));
//                alertDialogs("Error consumiendo el servicio de guardar\n"+ e.status +" - "+ e.statusText);
//            }
//        }).done(function(){
//            if(itemGuardado=="OK"){
//                cargarDatosGrilla();
//            }else{                    
//                alertDialogs("factura con errores  \n"+itemGuardado);
//                console.log("Datos  \n" + itemGuardado);                
//            }
//        });
//        
//        
//    }
    
//    function editarItem(e){
//        
//        e.preventDefault();
//        
//        var grid = $("#grid").data("kendoGrid");
//        itemID = grid.dataItem(grid.select());
//        
//        var widthPopUp = $("body").width();
//        widthPopUp = widthPopUp * (60/100);
//        var heightPopUp = $("body").height();
//        heightPopUp = heightPopUp * (80/100);
//        
//        $("body").append("<div id='windowItemFac'></div>");
//        var myWindow = $("#windowItemFac");        
//        var undo = $("#undo");
//        
//        function onCloseWindowItemFacEdit() {
//            
//            document.getElementById("windowItemFac").remove();            
//            undo.fadeIn();  
//        }
//        
//        myWindow.kendoWindow({
//            width: widthPopUp,
//            height: heightPopUp,
//            title: "Editar",
//            content: sessionStorage.getItem("url")+ "/facturaQuantum/html/popupItemFactura.html",
//            visible: false,
//            modal: true,
//            actions: [            
//                "Close"
//            ],
//            close: onCloseWindowItemFacEdit
//        }).data("kendoWindow").center().open();
//    }
    
}
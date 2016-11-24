/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dsSIRgfc_fac = new Object();
dsSIRgfc_fac.dsSIRgfc_fac = new Object();
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos = new Array();
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0] = new Object();
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].fiid = sessionStorage.getItem("picfiid");        
dsSIRgfc_fac.dsSIRgfc_fac.eetemp = new Array();
dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0] = new Object();

$(document).ready(function() {   
    var fechaFin = new Date(sessionStorage.getItem("fechaSistema"));
    fechaFin.setHours(0,0,0,0);
    var fechaIni= new Date(sessionStorage.getItem("fechaSistema"));
    fechaIni.setDate(fechaFin.getDate() - 90);    
    
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_ini = fechaIni;
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_fin = fechaFin;
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_ini = "3160";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_fin = "3170";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_est = "99";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picter_nit = "*";

    gridListaDePrecios();
});

function gridListaDePrecios(){
    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read:  {
                type: "POST",
                url: ipServicios+baseComercial+"SIRgfc_fac",
                contentType: "application/json; charset=utf-8",
                dataType: 'json'             
            },
            parameterMap: function (options, operation) {                
                try{
                    if (operation === 'read') {                                
                        return JSON.stringify(dsSIRgfc_fac);
                    }                  
                } catch (e) {
                    alertDialogs (e.message);
                }
            }
        },                 
        schema: {
            data:"dsSIRgfc_fac.eeSIRgfc_fac",
            model: {
                id: "fac__nro",         
                fields: {
                    fac__nro: { type: "number" },
                    ter__nit: { type: "string" },
                    cdm__nom: { type: "string" },  
                    fac__fec: { type: "string" },    
                    fac__fec__venc: { type: "string" }, 
                    fac__edo: { type: "string" }
                                    
                }
            }
        }
    });   
    
    var gridheigth = $("body").height()-$("#divSubtitulo").height()-4;
    
    $("#grid").kendoGrid({
        dataSource: dataSource,
        height: gridheigth,
        sortable: true,
        selectable: false,
        columns: [
            {
                field: "fac__nro",
                title: "Número de factura",
            
            },
            {
                field: "ter__nit",
                title: "NIT",
            
            },
            {
                field: "cdm__nom",
                title: "Cliente",
            
            },
            {
                field: "fac__fec",
                title: "Fecha"               
            },
            {
                field: "fac__fec__venc",
                title: "Fecha vencimiento"               
            },
            {
                field: "fac__edo",
                title: "Estado"               
            },
            {
                command: [
                    {name: "detalle", text: " ", click: imprimirFact, template: "<a class='k-grid-detalle'><span class='k-sprite po_print'></span></a>"},
                    {name: "editar", text: " ", click: editarFactura, template: "<a class='k-grid-editar'><span class='k-sprite po_editon'></span></a>"}
                ], 
                width: "100px"
            }
        ],
        rowTemplate: kendo.template($("#rowTemplateFac").html()),
        altRowTemplate: kendo.template($("#altRowTemplateFac").html()),
        dataBound: function () {
            var facturas = dataSource.data();
            changImgFunc(facturas);
        },
    });
    
    function editarFactura(e){        
        e.preventDefault();        
        var factura = this.dataItem($(e.currentTarget).closest("tr"));
                
        var servicio = "facturaQuantum";
        sessionStorage.setItem("servicio",servicio);
        sessionStorage.setItem("factura",JSON.stringify(factura));
        window.location.replace(( sessionStorage.getItem("url")+"mantenimientoListaPrecios/html/"+servicio+".html"));   
    }
    
    function imprimirFact(e){        
        e.preventDefault();        
        var factura = this.dataItem($(e.currentTarget).closest("tr"));
        
        try{
            var dsSIRgfc_fac = new Object();
            dsSIRgfc_fac.dsSIRgfc_fac = new Object();
            dsSIRgfc_fac.dsSIRgfc_fac.eeDatos = new Array();
            dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0] = new Object();
            dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
            dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].fiid = sessionStorage.getItem("picfiid");        
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp = new Array();
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0] = new Object();
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picsuc_cod = factura.suc__cod;
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picclc_cod = factura.clc__cod;
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].pidfac_fec = factura.fac__fec;
            dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro = factura.fac__nro;        
            
            $.ajax({
                type: "POST",
                data: JSON.stringify(dsSIRgfc_fac),
                url: ipServicios+baseComercial+"SIRpdf",            
                dataType : "json",
                contentType: "application/json;",
                success: function (resp) {                  
                    estado = JSON.stringify(resp.response.pocestado);                                    
                },
                error: function (e) {
                    kendo.alert(" Error al consumir el servicio.\n"+ e.status +" - "+ e.statusText);                
                }
            }).done(function(){
                if(estado=='"OK"'){
                    alertDialogs(estado);
                    $('#grid').data('kendoGrid').dataSource.read();
                $('#grid').data('kendoGrid').refresh();
                }else{
                    alertDialogs("Error generando el PDF de la factura.\n"+estado);
                }
            });
            
        } catch (e) {
            alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
        }
    }
}



function crearListaPrecios(){
    var servicio = "listaPrecios";
    sessionStorage.setItem("servicio",servicio);
    window.location.replace(( sessionStorage.getItem("url")+"mantenimientoListaPrecios/html/"+servicio+".html"));   
}

function popUpFiltros(){
    $("body").append("<div id='windowFiltros'></div>");
        var myWindow = $("#windowFiltros");
        var undo = $("#undo");
        
        function onCloseFiltros() {
            document.getElementById("windowFiltros").remove();            
            undo.fadeIn();  
        }
        
        myWindow.kendoWindow({
            width: "600px",
            height: "300px",
            title: "Busqueda",
            content: sessionStorage.getItem("url")+ "/facturacion/html/popUpFiltros.html",
            visible: false,
            modal: true,
            resizable: false,
            actions: [            
                "Close"
            ],
            close: onCloseFiltros
        }).data("kendoWindow").center().open();
}

function closePopUpFiltros(){    
    $("#windowFiltros").data("kendoWindow").close();
}

function changImgFunc(facturas) {
    
    for (var i = 0; i < facturas.length; i++) {
        var id = facturas[i].fac__nro;
        if(facturas[i].fac__edo==="No Contabilizado"){
            document.getElementById("imprimir"+id).setAttribute("class", "k-sprite po_print_off");
            document.getElementById("editar"+id).setAttribute("class", "k-sprite po_editon");
        }else if(facturas[i].fac__edo==="Contabilizado"){
            document.getElementById("imprimir"+id).setAttribute("class", "k-sprite po_print");
            document.getElementById("editar"+id).setAttribute("class", "k-sprite po_editoff");
        }else if(facturas[i].fac__edo==="Anulado"){
            document.getElementById("imprimir"+id).setAttribute("class", "k-sprite po_print");
            document.getElementById("editar"+id).setAttribute("class", "k-sprite po_editoff");
        }        
        
//        document.getElementById("span"+id).setAttribute("class", "k-sprite admin_pron");
        
    }
}

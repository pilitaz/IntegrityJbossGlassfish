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
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_ini = "";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_fin = "";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_est = "99";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picter_nit = "*";

    gridFacturas();
});

function gridFacturas(){
    
    var dataSource = new kendo.data.DataSource({
        transport: {
            read:  {
                type: "POST",
                url: "http://190.144.16.114:8810/rest/Comercial/SIRgfc_fac",
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
//        pageable: true,
        selectable: false,
        dataBound: disabledButton,
//        dataBinding: disabledButton,        
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
                    {name: "detalle", text: " ", click: imprimirFact, template: "<a class='k-grid-detalle'><span class='k-sprite admin_Print'></span></a>"},
                    {name: "editar", text: " ", click: editarFactura, template: "<a class='k-grid-editar'><span class='k-sprite admin_Print'></span></a>"}
                ], 
                width: "100px"
            }
        ]
    });
}

function imprimirFact(e){
    alertDialogs("proximamente");
}

function crearFactura(){
    var servicio = "facturaQuantum";
    sessionStorage.setItem("servicio",servicio);
    window.location.replace(( sessionStorage.getItem("url")+servicio+"/html/"+servicio+".html"));   
}

function editarFactura(e){
    var servicio = "facturaQuantum";
    sessionStorage.setItem("servicio",servicio);
    window.location.replace(( sessionStorage.getItem("url")+servicio+"/html/"+servicio+".html"));   
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

function disabledButton(){
    debugger
    var grid = $("#grid").data("kendoGrid");
    var item = grid.dataItem(grid.select());
        
}
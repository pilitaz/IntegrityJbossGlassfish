/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    
    var dsSIRgfc_fac = new Object();
    dsSIRgfc_fac.dsSIRgfc_fac = new Object();
    dsSIRgfc_fac.dsSIRgfc_fac.eeDatos = new Array();
    dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0] = new Object();
    dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    dsSIRgfc_fac.dsSIRgfc_fac.eeDatos[0].fiid = sessionStorage.getItem("picfiid");        
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp = new Array();
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0] = new Object();
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_ano = "2016";
//    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro = "3019";
    console.log(JSON.stringify(dsSIRgfc_fac))
     
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
        pageSize: 20,
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
        pageable: true,
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
                    {name: "detalle", text: " ", click: imprimirFact, template: "<a class='k-grid-detalle'><span class='k-sprite admin_Print'></span></a>"}
                ], 
                width: "100px"
            }
        ]
    });    
});

function imprimirFact(e){
    alertDialogs("proximamente");
}

function crearFactura(){
    var servicio = "facturaQuantum";
    sessionStorage.setItem("servicio",servicio);
    window.location.replace(( sessionStorage.getItem("url")+servicio+"/html/"+servicio+".html"));   
}


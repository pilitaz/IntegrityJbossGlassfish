/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var asigGuardada;

$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 30);
    $('.k-grid-content').height(viewportHeight - 100);
});

$(document).ready(function() {   
    grisFacDespachos();
});

function grisFacDespachos(){
   
    var obj = new SIRdpc_cab();
    var json = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
        var dataSourceAsignarPedidos = new kendo.data.DataSource({
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST"                
                },
    //            update: {
    //                url: urlFacDespacho,
    //                dataType: "json",
    //                type: "PUT",
    //                contentType: "application/json"
    //            },
                parameterMap: function (options, operation) {
                    
                    var fecha= new Date(sessionStorage.getItem("fechaSistema"));
                    fecha.setHours(0,0,0,0);
                    var fechaIni= new Date(sessionStorage.getItem("fechaSistema"));
                    fechaIni.setDate(fecha.getDate() - 90);
    
                    try {
                        if (operation === 'read') {
//                            var key1 = Object.keys(json)[0];
//                            var key2 = Object.keys(json[key1])[1];
//                            json[key1][key2][0].pidfecha = sessionStorage.getItem("fechaSistema");
                            return JSON.stringify(json);                        
                        }
    //                    if (operation === "update") {                       
    //                        
    //                        var key1 = Object.keys(jsonjFacDespacho)[0];
    //                        var key2 = Object.keys(jsonjFacDespacho[key1])[1];                        
    //                        jsonjFacDespacho[key1][key2][0].ped__fec = options.ped__fec;
    //                        jsonjFacDespacho[key1][key2][0].suc__cod = options.suc__cod;
    //                        jsonjFacDespacho[key1][key2][0].clc__cod = options.clc__cod;
    //                        jsonjFacDespacho[key1][key2][0].cla__cod = options.cla__cod;
    //                        jsonjFacDespacho[key1][key2][0].art__cod = options.art__cod;
    //                        jsonjFacDespacho[key1][key2][0].ped__num = options.ped__num;
    //                        jsonjFacDespacho[key1][key2][0].lis__num = options.lis__num;
    //                        jsonjFacDespacho[key1][key2][0].ped__aasi = options.ped__aasi;
    //                        return JSON.stringify(jsonjFacDespacho);
    //                    }
                    } catch (e) {
                        alertDialogs("Error en el servicio" + e.message);
                    }
                }
            },
            schema: {           
                data: function (e) {                
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {                    
                        return e[key1][mapData];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }                
                },
                model: {
                    id: "dpc__num",
                    fields: {
                        dpc__num: {type: 'number', editable: false},
                        dpc__fec: {type: 'string', editable: false},
                        ter__nit: {type: 'string', editable: false},
                        con__nom: {type: 'string', editable: false},
                        pla__cod: {type: 'string', editable: false},                        
                        dpc__car: {type: 'string', editable: false},                        
                    }
                }
            },            
        });
    $(window).trigger("resize");    
    
    $("#gridFacturacionDespachos").kendoGrid({
        dataSource: dataSourceAsignarPedidos,
        selectable: true,                  
        columns: [                        
            {field: "dpc__num", title: "Número despacho"},
            {field: "dpc__fec", title: "Fecha"},
            {field: "ter__nit", title: "NIT"},
            {field: "con__nom", title: "Transportista"},            
            {field: "pla__cod", title: "Camión"},           
            {field: "dpc__car", title: "Orden"},
//            {field: "art__cant", title: "Cantidad en inventario"},
            {command:[
                    {name: "editar", click: crearListaPrecios, template: "<a class='k-grid-editar'><span class='k-sprite po_checkCreate'></span></a>"},
                    {name: "ver",  click: clickVer, template: "<a class='k-grid-ver'><span class='k-sprite po_preview'></span></a>"},
                ],
                width: "100px"
            }
        ],
        editable:  {
            mode: "popup",
            window: {
                title: "Editar",
                animation: false,
                width: 600
            }
        }
    });
}

function crearListaPrecios() {

    
    var servicio = "listaPreciosCabecera";
    sessionStorage.setItem("servicio", servicio);

    $("body").append("<div id='windowCab'></div>");
    var myWindow = $("#windowCab");
    var undo = $("#undo");

    function onCloseCabecera() {
        document.getElementById("windowCab").remove();
        undo.fadeIn();
    }
   $("body").append("<div id='disable'></div>");
    
    mostrarCustomPopUp();
//    window.location.replace((sessionStorage.getItem("url") + "mantenimientoListaPrecios/html/" + servicio + ".html"));
}

function facturarDespacho(e){
    
    var objFacDespacho = new SICUDgfc_fac_dpc();
    var jsonjFacDespacho = objFacDespacho.getjson();
    var urlFacDespacho = objFacDespacho.getUrlSir();
    var mapFacDespacho = objFacDespacho.getMapData();
    
    var key1 = Object.keys(jsonjFacDespacho)[0];
    var key2 = Object.keys(jsonjFacDespacho[key1])[1];  
    
    var grid = $("#gridFacturacionDespachos").data("kendoGrid");
    var despachos; 
    debugger
    if(e){
        despachos = 1;
        e.preventDefault();
    }else{
        despachos = grid.dataSource._data.length;
    }
    for(var i= 0; i<despachos; i++){
        if (e){
            itemID = grid.dataItem(grid.select());
        }else{
            itemID = grid.dataSource._data[i];
        }
        
        jsonjFacDespacho[key1][key2][i] = new Object();
        jsonjFacDespacho[key1][key2][i].piindicador = itemID.piindicador;
        jsonjFacDespacho[key1][key2][i].act__cod = itemID.act__cod;
        jsonjFacDespacho[key1][key2][i].cab__obs = itemID.cab__obs;
        jsonjFacDespacho[key1][key2][i].cam__cod = itemID.cam__cod;
        jsonjFacDespacho[key1][key2][i].car__fec = itemID.car__fec;
        jsonjFacDespacho[key1][key2][i].car__kgs = itemID.car__kgs;
        jsonjFacDespacho[key1][key2][i].car__num = itemID.car__num;
        jsonjFacDespacho[key1][key2][i].car__val = itemID.car__val;
        jsonjFacDespacho[key1][key2][i].cial__cod = itemID.cial__cod;
        jsonjFacDespacho[key1][key2][i].ciu__cod = itemID.ciu__cod;
        jsonjFacDespacho[key1][key2][i].clc__cod = itemID.clc__cod;
        jsonjFacDespacho[key1][key2][i].com__con = itemID.com__con;
        jsonjFacDespacho[key1][key2][i].con__cc = itemID.con__cc;
        jsonjFacDespacho[key1][key2][i].con__nom = itemID.con__nom;
        jsonjFacDespacho[key1][key2][i].cpto__cod = itemID.cpto__cod;
        jsonjFacDespacho[key1][key2][i].cto__cod = itemID.cto__cod;
        jsonjFacDespacho[key1][key2][i].dpc__anu = itemID.dpc__anu;
        jsonjFacDespacho[key1][key2][i].dpc__car = itemID.dpc__car;
        jsonjFacDespacho[key1][key2][i].dpc__cor = itemID.dpc__cor;
        jsonjFacDespacho[key1][key2][i].dpc__est = itemID.dpc__est;
        jsonjFacDespacho[key1][key2][i].dpc__fec = itemID.dpc__fec;
        jsonjFacDespacho[key1][key2][i].dpc__fle = itemID.dpc__fle;
        jsonjFacDespacho[key1][key2][i].dpc__num = itemID.dpc__num;
        jsonjFacDespacho[key1][key2][i].dpc__rec = itemID.dpc__rec;
        jsonjFacDespacho[key1][key2][i].dpc__val = itemID.dpc__val;
        jsonjFacDespacho[key1][key2][i].fec__ant = itemID.fec__ant;
        jsonjFacDespacho[key1][key2][i].fec__cor = itemID.fec__cor;
        jsonjFacDespacho[key1][key2][i].fec__rec = itemID.fec__rec;
        jsonjFacDespacho[key1][key2][i].hor__ent = itemID.hor__ent;
        jsonjFacDespacho[key1][key2][i].pla__cod = itemID.pla__cod;
        jsonjFacDespacho[key1][key2][i].rec__cons = itemID.rec__cons;
        jsonjFacDespacho[key1][key2][i].rut__cod = itemID.rut__cod;
        jsonjFacDespacho[key1][key2][i].suc__cod = itemID.suc__cod;
        jsonjFacDespacho[key1][key2][i].ter__aret = itemID.ter__aret;
        jsonjFacDespacho[key1][key2][i].ter__cret = itemID.ter__cret;
        jsonjFacDespacho[key1][key2][i].ter__nit = itemID.ter__nit;
        jsonjFacDespacho[key1][key2][i].ter__ret = itemID.ter__ret;
        jsonjFacDespacho[key1][key2][i].ter__vret = itemID.ter__vret;
        jsonjFacDespacho[key1][key2][i].usr__cod = itemID.usr__cod;
        jsonjFacDespacho[key1][key2][i].usr__cod__r = itemID.usr__cod__r;
        jsonjFacDespacho[key1][key2][i].ven__cod = itemID.ven__cod;
    }
     
    $.ajax({
        type: "POST",
        data: JSON.stringify(jsonjFacDespacho),
        url: urlFacDespacho,
        dataType : "json",
        contentType: "application/json;",
        success: function (e) {
            var key1 = Object.keys(e)[0];
            if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
               debugger
            }
            
        },
        error: function (e) {            
            alertDialogs("Error consumiendo el servicio \n"+ e.status +" - "+ e.statusText);
        }
    }).done(function(){
        
    });
}

function clickVer(e) {
    e = this.dataItem($(e.currentTarget).closest("tr"));    
    var servicio="despacho"
    sessionStorage.setItem("servicio",servicio);
    sessionStorage.setItem("regDespacho", JSON.stringify(e));
    window.location.replace(( sessionStorage.getItem("url")+"facruracionDespacho/html/"+servicio+".html"));   
}

function mostrarCustomPopUp() {
   // $("body").append("<div id='disable'></div>");
    $("#customPopUp").fadeIn("slow");

}
function cerrarCustomPopUp() {
    $("#disable").fadeOut("slow");
    $("#customPopUp").fadeOut("slow");
    $( "#disable" ).remove();
//    $("#regalo").fadeOut("slow");
}


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {   
    
function gridAsignacionPedidos(){
   
    var obj = new sirConsultaAsignarPedidos();
    var jsonAsignarPedidos = obj.getjson();
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
            parameterMap: function (options, operation) {                
                var fecha= new Date(sessionStorage.getItem("fechaSistema"));
                fecha.setHours(0,0,0,0);
                fecha.setDate(fecha.getDate() - 90);                
                try {
                    if (operation === 'read') {
                        var key1 = Object.keys(jsonAsignarPedidos)[0];
                        var key2 = Object.keys(jsonAsignarPedidos[key1])[1];
                        jsonAsignarPedidos[key1][key2][0].pidfecha = fecha;//sessionStorage.getItem("fechaSistema");
                        return JSON.stringify(jsonAsignarPedidos);                        
                    }
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
                //id: "ped__num",
                fields: {
                    ped__num: {type: 'string', editable: false},
                    cla__cod: {type: 'string', editable: false},
                    cla__des: {type: 'string', editable: false},
                    art__cod: {type: 'string', editable: false},
                    art__des: {type: 'string', editable: false},
                    ped__can: {type: 'string', editable: false},
                    ped__pend: {type: 'string', editable: false},
                    ped__aasi: {type: 'number', editable: true},
                    ped__fec: {type: 'string', editable: false},                    
                }
            }
        },
        group: { field: "ped__num"}
    });
    //$(window).trigger("resize");    
    $("#gridAsignacionPedidos").kendoGrid({
        dataSource: dataSourceAsignarPedidos,
        selectable: false,        
        columns: [
            {field: "ped__num", title: "Número de Pedido"},
            {field: "cla__des", title: "Clase articulo"},
            {field: "art__des", title: "Articulo"},
            {field: "ped__can", title: "Cantidad solicitada"},
            {field: "ped__pend", title: "Pendiente"},
            {field: "ped__aasi", title: "Asignados"},
            {field: "ped__fec", title: "fecha"},
            {command:[
                    {name: "edit", text: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},                    
                ],
                width: "150px"}
        ],
        editable: {
            mode: "popup",
            window: {
                title: "Editar",
                animation: false,
                width: 600
            }
        },
    });
}

gridAsignacionPedidos();
});



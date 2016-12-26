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
                
                try {
                    if (operation === 'read') {                                                
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
                id: "ped__num",
                fields: {
                    ped__num: {validation: {required: true}, type: 'string'},
                    cla__cod: {validation: {required: true}, type: 'string'},
                    art__cod: {validation: {required: true}, type: 'string'},
                    ped__can: {validation: {required: true}, type: 'string'},
                    ped__fec: {validation: {required: true}, type: 'string'},                    
                }
            }
        }
    });
    //$(window).trigger("resize");    
    $("#gridAsignacionPedidos").kendoGrid({
        dataSource: dataSourceAsignarPedidos,
//        dataBound: ondataBound,
        selectable: false,
        columns: [
            {field: "ped__num", title: "Número de Pedido"},
            {field: "cla__cod", title: "Clase articulo"},
            {field: "art__cod", title: "Articulo"},
            {field: "ped__can", title: "Cantidad"},
            {field: "ped__fec", title: "fecha"},
//            {command:
//                        [
//                            {name: "aprovar", click: ClickAprov, template: "<a class='k-grid-aprovar' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"},
//                            {name: "editar", text: " ", click: ClickEditar, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
//                            {name: "destroyed", click: clickEliminar, template: "<a class='k-grid-destroyed' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"}
//                        ],
//                width: "150px"}
        ],
//        editable: "popup",
//        rowTemplate: kendo.template($("#rowTemplate").html()),
//        altRowTemplate: kendo.template($("#altRowTemplate").html()),
    });
}

gridAsignacionPedidos();
});



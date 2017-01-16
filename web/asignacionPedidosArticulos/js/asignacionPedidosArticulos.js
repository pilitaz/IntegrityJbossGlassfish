/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {   
    gridAsignacionPedidos();
});

function gridAsignacionPedidos(){
   
    var obj = new SIRgpd_pdet_asig();
    var jsonAsignarPedidos = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
//    var objUpdateReg = new SICUDAsignarPedidos();
//    var jsonUpdateReg = objUpdateReg.getjson();
//    var urlUpdateReg = objUpdateReg.getUrlSir();
//    var mapDataUpdateReg = objUpdateReg.getMapData();


  var dataSourceAsignarPedidos = {
  "dsSIRgpd_pdet_asig": {
    "eeSIRgpd_pdet_asig": [
      {
        "pidfecha": "2016-10-16"
      }
    ],
    "ttinv_art_prov": [
      {
        "clacod": 2,
        "art__cod": "1234",
        "art__des": "ARTICULO NRO TRES",
        "cla__des": "Materias Primas",
        "cla__apl__inv": true,
        "art__cant": 0,
        "eegpd_ped_det": [
          {
            "piindicador": 0,
            "ped__fec": "2016-12-29",
            "pre__pcod": "un",
            "suc__cod": "00101",
            "clc__cod": "25",
            "cla__cod": 2,
            "art__cod": "1234",
            "ped__iva": 19,
            "ped__num": 92,
            "ped__pri": "",
            "col__cod": 0,
            "det__sub__tot": 0,
            "gpd__est": 99,
            "gpd__peso": 0,
            "lis__num": 4,
            "lpd__pre": 10000,
            "ped__ano": 0,
            "ped__can": 10,
            "ped__can__k": 0,
            "ped__can__k__prom": 0,
            "ped__cos": 0,
            "ped__dct": 5,
            "art__des": "ARTICULO NRO TRES",
            "cla__des": "Materias Primas",
            "ped__pend": 9,
            "ped__aasi": 0
          },
          {
            "piindicador": 0,
            "ped__fec": "2016-12-29",
            "pre__pcod": "un",
            "suc__cod": "00101",
            "clc__cod": "25",
            "cla__cod": 2,
            "art__cod": "1234",
            "ped__iva": 19,
            "ped__num": 923,
            "ped__pri": "",
            "col__cod": 0,
            "det__sub__tot": 0,
            "gpd__est": 99,
            "gpd__peso": 0,
            "lis__num": 4,
            "lpd__pre": 10000,
            "ped__ano": 0,
            "ped__can": 10,
            "ped__can__k": 0,
            "ped__can__k__prom": 0,
            "ped__cos": 0,
            "ped__dct": 5,
            "art__des": "ARTICULO NRO TRES",
            "cla__des": "Materias Primas",
            "ped__pend": 9,
            "ped__aasi": 0
          }
        ]
      },
      {
        "clacod": 2,
        "art__cod": "12345",
        "art__des": "ARTICULO NRO veinte",
        "cla__des": "Materias Primas",
        "cla__apl__inv": true,
        "art__cant": 0,
        "eegpd_ped_det": [
          {
            "piindicador": 0,
            "ped__fec": "2016-12-29",
            "pre__pcod": "un",
            "suc__cod": "00101",
            "clc__cod": "25",
            "cla__cod": 2,
            "art__cod": "1234",
            "ped__iva": 19,
            "ped__num": 2092,
            "ped__pri": "",
            "col__cod": 0,
            "det__sub__tot": 0,
            "gpd__est": 99,
            "gpd__peso": 0,
            "lis__num": 4,
            "lpd__pre": 10000,
            "ped__ano": 0,
            "ped__can": 10,
            "ped__can__k": 0,
            "ped__can__k__prom": 0,
            "ped__cos": 0,
            "ped__dct": 5,
            "art__des": "ARTICULO NRO TRES",
            "cla__des": "Materias Primas",
            "ped__pend": 9,
            "ped__aasi": 0
          }
        ]
      }
    ],
    "eeEstados": [
      {
        "Estado": "OK",
        "Returnid": 0
      }
    ]
  }
}

//    var dataSourceAsignarPedidos = new kendo.data.DataSource({
//        transport: {
//            read: {
//                url: url,
//                contentType: "application/json; charset=utf-8",
//                dataType: 'json',
//                type: "POST"                
//            },
////            update: {
////                url: urlUpdateReg,
////                dataType: "json",
////                type: "PUT",
////                contentType: "application/json"
////            },
//            parameterMap: function (options, operation) {
//                
//                var fecha= new Date(sessionStorage.getItem("fechaSistema"));
//                fecha.setHours(0,0,0,0);
//                var fechaIni= new Date(sessionStorage.getItem("fechaSistema"));
//                fechaIni.setDate(fecha.getDate() - 90);
//
//                try {
//                    if (operation === 'read') {
//                        var key1 = Object.keys(jsonAsignarPedidos)[0];
//                        var key2 = Object.keys(jsonAsignarPedidos[key1])[1];
//                        jsonAsignarPedidos[key1][key2][0].pidfecha = fechaIni;//sessionStorage.getItem("fechaSistema");
//                        return JSON.stringify(jsonAsignarPedidos);                        
//                    }
////                    if (operation === "update") {                       
////                        
////                        var key1 = Object.keys(jsonUpdateReg)[0];
////                        var key2 = Object.keys(jsonUpdateReg[key1])[1];                        
////                        jsonUpdateReg[key1][key2][0].ped__fec = options.ped__fec;
////                        jsonUpdateReg[key1][key2][0].suc__cod = options.suc__cod;
////                        jsonUpdateReg[key1][key2][0].clc__cod = options.clc__cod;
////                        jsonUpdateReg[key1][key2][0].cla__cod = options.cla__cod;
////                        jsonUpdateReg[key1][key2][0].art__cod = options.art__cod;
////                        jsonUpdateReg[key1][key2][0].ped__num = options.ped__num;
////                        jsonUpdateReg[key1][key2][0].lis__num = options.lis__num;
////                        jsonUpdateReg[key1][key2][0].ped__aasi = options.ped__aasi;
////                        return JSON.stringify(jsonUpdateReg);
////                    }
//                } catch (e) {
//                    alertDialogs("Error en el servicio" + e.message);
//                }
//            }
//        },
//        schema: {           
//            data: function (e) {                
//                var key1 = Object.keys(e)[0];
//                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {                    
//                    return e[key1][mapData];
//                } else {
//                    alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
//                }                
//            },
//            model: {
//                id: "ped__num",
//                fields: {
//                    ped__num: {type: 'string', editable: false},
//                    cla__cod: {type: 'string', editable: false},
//                    cla__des: {type: 'string', editable: false},
//                    art__cod: {type: 'string', editable: false},
//                    art__des: {type: 'string', editable: false},
//                    ped__can: {type: 'string', editable: false},
//                    ped__pend: {type: 'string', editable: false},
//                    ped__aasi: {type: 'number', editable: true},
//                    ped__fec: {type: 'string', editable: false}
//                }
//            }
//        },
//        group: { field: "ped__num"}
//    });
    //$(window).trigger("resize");    
    
    $("#gridAsignacionPedidos").kendoGrid({
        dataSource: dataSourceAsignarPedidos.dsSIRgpd_pdet_asig.ttinv_art_prov,
        selectable: true,  
        detailInit: detailInit,
        dataBound: function() {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [                        
            {field: "cla__des", title: "Clase articulo"},
            {field: "art__des", title: "Articulo"},           
//            {command:[
//                    {id: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},                    
//                ],
//                width: "150px"}
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
    
    function detailInit(e) {
    debugger    
    $("<div/>").appendTo(e.detailCell).kendoGrid({
        dataSource: e.data.eegpd_ped_det,
        scrollable: false,        
        columns: [
            {field: "ped__num", title: "Número de pedido"},
            {field: "ped__can", title: "Cantidad"},  
        ]
    });
}
}




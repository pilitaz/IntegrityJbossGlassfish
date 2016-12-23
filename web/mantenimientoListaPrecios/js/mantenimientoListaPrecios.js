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

$(document).ready(function () {
    var fechaFin = new Date(sessionStorage.getItem("fechaSistema"));
    fechaFin.setHours(0, 0, 0, 0);
    var fechaIni = new Date(sessionStorage.getItem("fechaSistema"));
    fechaIni.setDate(fechaFin.getDate() - 90);

    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_ini = fechaIni;
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_fin = fechaFin;
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_ini = "3160";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_fin = "3170";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_est = "99";
    dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picter_nit = "*";

    gridListaDePrecios();
});

function gridListaDePrecios() {
    var obj = new SIRgpr_lis();
    var objLPrecios = obj.getjson();
    var urlSir = obj.getUrlSir();
    var mapData = obj.getMapData();

//    var objCU = new SICUDPedido();
//    var objRepoD = objCU.getjson();
//    var urlRepoD = objCU.getUrlSir();
//    var mapDataRepoD = objCU.getMapData();
    dataSourceLPrecios = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSir,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: "POST"
            },
//            destroy: {
//                url: urlRepoD,
//                type: "delete",
//                dataType: "json",
//                contentType: "application/json"
//            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
//                        objLPrecios["obj"] = [options];
                        return JSON.stringify(objLPrecios);
                    } else if (operation === 'destroy') {
//                        var key1 = Object.keys(objRepoD)[0];
//                        objRepoD[key1][mapDataRepoD] = [options];
//                        return JSON.stringify(objRepoD);
                    }
                } catch (e) {
                    alertDialogs("Error en el servicio" + e.message);
                }
            }
        },
        schema: {
            type: "json",
            data: function (e) {
                var key1 = Object.keys(e)[0];
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    return e[key1][mapData];
                } else {
                    alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            model: {
                id: "lis__num",
                fields: {
                    lis__des: {validation: {required: true}, type: 'string'},
                    lis__fin: {validation: {required: true}, type: 'string'},
                    lis__ffi: {validation: {required: true}, type: 'string'},
                    mnd__cla: {validation: {required: true}, type: 'string'},
                }
            }
        }
    });
    $(window).trigger("resize");
    $("#grid").kendoGrid({
        dataSource: dataSourceLPrecios,
        dataBound: function () {
            debugger
            var listasPrecio = dataSourceLPrecios.data();
            changImgFunc(listasPrecio);
        },
        selectable: false,
        columns: [
            {field: "lis__des", title: "Número de Pedido"},
            {field: "lis__fin", title: "Fecha de Pedido"},
            {field: "lis__ffi", title: "Fecha de Pedido"},
            {field: "mnd__cla", title: "Nit"},
//            {field: "ter__nit", title: "&nbsp;"},
            {command:
                        [
                            {name: "aprovar", click: aprobarListaPrecios, template: "<a class='k-grid-aprovar' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"},
                            {name: "editar", text: " ", click: editarListaPrecios, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                            {name: "copy", template: "<a class='k-grid-copy' href='' style='min-width:16px;'><span class='k-sprite po_copy'></span></a>"},
                            {name: "destroyed", template: "<a class='k-grid-destroyed' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"}
                        ],
                width: "170px"}],
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplateListaPrecios").html()),
        altRowTemplate: kendo.template($("#altRowTemplateListaPrecios").html()),
    });

//    var dataSource = new kendo.data.DataSource({
//        data: [
//            { lis_num: 1, lis_det: "Número uno", fecha_ini: "2016-03-01", fecha_fin: "2016-12-31", usuario_aprueba: "true", usuario_edita:"false"},
//            { lis_num: 2, lis_det: "Número dos", fecha_ini: "2016-01-01", fecha_fin: "2016-02-28", usuario_aprueba: "false", usuario_edita:"true"},
//        ],
//        schema: {            
//            model: {
//                id: "ciacod",
//                fields: {
//                    lis_num: { type: "number" },
//                    lis_det: { type: "string" },
//                    fecha_ini: { type: "string" },                    
//                    fecha_fin: { type: "string" }
//                }
//            }
//        }
//    });

//    var dataSource = new kendo.data.DataSource({
//        transport: {
//            read:  {
//                type: "POST",
//                url: ipServicios+baseComercial+"SIRgfc_fac",
//                contentType: "application/json; charset=utf-8",
//                dataType: 'json'             
//            },
//            parameterMap: function (options, operation) {                
//                try{
//                    if (operation === 'read') {                                
//                        return JSON.stringify(dsSIRgfc_fac);
//                    }                  
//                } catch (e) {
//                    alertDialogs (e.message);
//                }
//            }
//        },                 
//        schema: {
//            data:"dsSIRgfc_fac.eeSIRgfc_fac",
//            model: {
//                id: "fac__nro",         
//                fields: {
//                    fac__nro: { type: "number" },
//                    ter__nit: { type: "string" },
//                    cdm__nom: { type: "string" },  
//                    fac__fec: { type: "string" },    
//                    fac__fec__venc: { type: "string" }, 
//                    fac__edo: { type: "string" }
//                                    
//                }
//            }
//        }
//    });   

//    var gridheigth = $("body").height()-$("#divSubtitulo").height()-4;
//    
//    $("#grid").kendoGrid({
//        dataSource: dataSource,
//        height: gridheigth,
//        sortable: true,
//        selectable: false,
//        columns: [
//            {
//                lis_num: "fac__nro",
//                title: "Número de lista",
//            
//            },
//            {
//                field: "lis_det",
//                title: "Detalle",
//            
//            },
//            {
//                field: "cdm__nom",
//                title: "Cliente",
//            
//            },
//            {
//                field: "fecha_ini",
//                title: "Fecha inicio"               
//            },
//            {
//                field: "fecha_fin",
//                title: "Fecha fin"               
//            },            
////            {
////                command: [
////                    {name: "aprobar", text: " ", click: aprobarListaPrecios, template: "<a class='k-grid-aprobar'><span class='k-sprite po_check'></span></a>"},
////                    {name: "editar", text: " ", click: editarListaPrecios, template: "<a class='k-grid-editar'><span class='k-sprite po_editon'></span></a>"}
////                ], 
////                width: "100px"
////            }
//        ],
//        rowTemplate: kendo.template($("#rowTemplateListaPrecios").html()),
//        altRowTemplate: kendo.template($("#altRowTemplateListaPrecios").html()),
//        dataBound: function () {
//            debugger
//            var listasPrecio = dataSource.data();
//            changImgFunc(listasPrecio);
//        },
//    });


}

function aprobarListaPrecios(e) {
    e.preventDefault();
    var listaPrecios = this.dataItem($(e.currentTarget).closest("tr"));

    var servicio = "listaPrecios";
    sessionStorage.setItem("servicio", servicio);
    sessionStorage.setItem("listaPrecios", JSON.stringify(listaPrecios));
    window.location.replace((sessionStorage.getItem("url") + "mantenimientoListaPrecios/html/" + servicio + ".html"));
}

function editarListaPrecios(e) {
    e.preventDefault();
    var listaPrecios = this.dataItem($(e.currentTarget).closest("tr"));

    sessionStorage.removeItem("opeListPre");
    sessionStorage.setItem("opeListPre","edit");
    var servicio = "listaPrecios";
    sessionStorage.setItem("servicio", servicio);
    sessionStorage.setItem("listaPrecios", JSON.stringify(listaPrecios));
    window.location.replace((sessionStorage.getItem("url") + "mantenimientoListaPrecios/html/" + servicio + ".html"));
}


function crearListaPrecios() {
    
    sessionStorage.removeItem("opeListPre");
    sessionStorage.setItem("listaPrecios","{'lis__num':'0'}");
    sessionStorage.setItem("opeListPre","create");
    var servicio = "listaPreciosCabecera";
    sessionStorage.setItem("servicio", servicio);
    
    $("body").append("<div id='windowCab'></div>");
    var myWindow = $("#windowCab");
    var undo = $("#undo");

    function onCloseCabecera() {
        document.getElementById("windowCab").remove();
        undo.fadeIn();
    }

    myWindow.kendoWindow({
        width: "60%",
        height: "40%",
        title: "Busqueda",
        content: sessionStorage.getItem("url") + "/mantenimientoListaPrecios/html/"+ servicio + ".html",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: onCloseCabecera
    }).data("kendoWindow").center().open();
//    window.location.replace((sessionStorage.getItem("url") + "mantenimientoListaPrecios/html/" + servicio + ".html"));
}

function popUpFiltros() {
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
        content: sessionStorage.getItem("url") + "/facturacion/html/popUpFiltros.html",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: onCloseFiltros
    }).data("kendoWindow").center().open();
}

function closePopUpFiltros() {
    $("#windowFiltros").data("kendoWindow").close();
}

function changImgFunc(listasPrecio) {
//    <!--        lis_num: { type: "number" },
//                    lis_det: { type: "string" },
//                    fecha_ini: { type: "string" },                    
//                    fecha_fin-->

    for (var i = 0; i < listasPrecio.length; i++) {
        var id = listasPrecio[i].lis__num;
        if (listasPrecio[i].usuario_aprueba === "true") {
            document.getElementById("aprobar" + id).setAttribute("class", "k-sprite po_check");
            //document.getElementById("aprobar"+id).onclick = aprobar;
        } else {
            debugger
            $("#aprobar" + id + "")["0"].className = "k-icon po_check_disabled";
            //$("#aprobar"+id+"").style = "pointer-events: none;";
//            document.getElementById("aprobar"+id).setAttribute("class", "k-sprite po_check_disabled");
//            document.getElementById("aprobar"+id).onclick = "";
//            document.getElementById("aprobar"+id).ondblclick = "";
        }

//        else if(listasPrecio[i].fac__edo==="Contabilizado"){
//            document.getElementById("imprimir"+id).setAttribute("class", "k-sprite po_print");
//            document.getElementById("editar"+id).setAttribute("class", "k-sprite po_editoff");
//        }else if(listasPrecio[i].fac__edo==="Anulado"){
//            document.getElementById("imprimir"+id).setAttribute("class", "k-sprite po_print");
//            document.getElementById("editar"+id).setAttribute("class", "k-sprite po_editoff");
//        }
    }
}

function aprobar() {
    alert("aprobar");
}

function cabGuard(){
    onCloseCabecera();
}
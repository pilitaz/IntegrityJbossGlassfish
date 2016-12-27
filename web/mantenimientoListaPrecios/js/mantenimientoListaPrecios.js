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


$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 30);
    $('.k-grid-content').height(viewportHeight - 100);
});

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

    var objCU = new SICUDgpr_lis();
    var objD = objCU.getjson();
    var urlD = objCU.getUrlSir();
    var mapDataD = objCU.getMapData();
    
    dataSourceLPrecios = new kendo.data.DataSource({
        transport: {
            read: {
                url: urlSir,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                type: "POST"
            },
            destroy: {
                url: urlD,
                type: "delete",
                dataType: "json",
                contentType: "application/json"
            },
            parameterMap: function (options, operation) {
                try {
                    if (operation === 'read') {
//                        objLPrecios["obj"] = [options];
                        return JSON.stringify(objLPrecios);
                    } else if (operation === 'destroy') {
                        var key1 = Object.keys(objD)[0];
                        objD[key1][mapDataD] = [options];
                        return JSON.stringify(objD);
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
            var listasPrecio = dataSourceLPrecios.data();
            changImgFunc(listasPrecio);
        },
        selectable: false,
        columns: [
            {field: "lis__des", title: "Descripción Lista"},
            {field: "lis__fin", title: "Fecha Inicial"},
            {field: "lis__ffi", title: "Fecha Vencimiento"},
            {field: "mnd__cla", title: "Moneda"},
//            {field: "ter__nit", title: "&nbsp;"},
            {command:
                        [
                            {name: "aprovar", click: aprobarListaPrecios, template: "<a class='k-grid-aprovar' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"},
                            {name: "editar", text: " ", click: editarListaPrecios, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                            {name: "copy", template: "<a class='k-grid-copy' href='' style='min-width:16px;'><span class='k-sprite po_copy'></span></a>"},
                            {name: "destroyed", click: clickEliminar, template: "<a class='k-grid-destroyed' href='' style='min-width:16px;'><span class='k-sprite po_cerrar'></span></a>"}
                        ],
                width: "170px"}],
        editable: "popup",
        rowTemplate: kendo.template($("#rowTemplateListaPrecios").html()),
        altRowTemplate: kendo.template($("#altRowTemplateListaPrecios").html()),
    });


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

function clickEliminar(e) {
    try {
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.target).closest("tr"));


        var actions = new Array();
        actions[0] = new Object();
        actions[0].text = "OK";
        actions[0].action = function () {
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            dataSource.remove(dataItem);
            dataSource.sync();
            bandAlert = 0;
        };
        actions[1] = new Object();
        actions[1].text = "Cancelar";
        actions[1].action = function () {
            bandAlert = 0;
        };
        createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.lis__des + " ---?", "400px", "200px", true, true, actions);

    } catch (e) {
        $('#gridPedidos').data('kendoGrid').dataSource.read();
        $('#gridPedidos').data('kendoGrid').refresh();
    }
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

function cabGuard(jsonResp){
   

    sessionStorage.removeItem("opeListPre");
    sessionStorage.setItem("opeListPre","edit");
    var servicio = "listaPrecios";
    sessionStorage.setItem("servicio", servicio);
    sessionStorage.setItem("listaPrecios", jsonResp);
    window.location.replace((sessionStorage.getItem("url") + "mantenimientoListaPrecios/html/" + servicio + ".html"));
    
    var myWindow = $("#windowCab");
    myWindow.data("kendoWindow").close();
}
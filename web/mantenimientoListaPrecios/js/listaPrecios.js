/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dataGridDetalleListaPrecios = [];
var dataSourceAdd = [];
var dataSourceUpdate = [];
var dataSourceDelete = [];
var est = "lis__est";


$(document).ready(function () {

    var authdsinv_cla = new Object();
    authdsinv_cla.dsinv_cla = new Object();
    authdsinv_cla.dsinv_cla.eeDatos = new Array();
    authdsinv_cla.dsinv_cla.eeDatos[0] = new Object();
    authdsinv_cla.dsinv_cla.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    authdsinv_cla.dsinv_cla.eeDatos[0].fiid = sessionStorage.getItem("picfiid");
    authdsinv_cla.dsinv_cla.eetemp = new Array();
    authdsinv_cla.dsinv_cla.eetemp[0] = new Object();

    if (JSON.parse(sessionStorage.getItem("listaPrecios"))[est] !== 99) {
        $('#btnEditar').hide();
    }
    cambiarInput();
    cargarDatosGrilla();
    gridDetalleListaPrecios();
});

function gridDetalleListaPrecios() {
//    datasource1();
    var grid = $("#gridDetalleListaPrecios").kendoGrid({
        dataSource: dataGridDetalleListaPrecios,
        batch: false,
        filterable: true,
        pageable: false,
        columns: [
            {
                field: "cla__des",
                title: "Clase Articulo"
            },
            {
                field: "art__des",
                title: "Articulo"
            },
            {
                field: "lpd__pre",
                title: "Precio",
                format: "{0:c}"
            },
//            {
            {
                field: "pre__des",
                title: "Presentacíón"
            },
            {command: [
                    {name: "editar", click: editarLPrecio, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "eliminar", click: eliminarLPrecio, template: "<a class='k-grid-eliminar'><span class='k-sprite po_cerrar'></span></a>"}
                ],
                width: "100px"
            }],
        editable:"popup",
//        edit: function (e) {
//            inputsPopUp(e);
//            debugger
//            
//            if (e.sender._data[0].ID) {//caso en el que el popup es editar
//                    e.container.kendoWindow("title", "Editar");
//                if (e.model[est] != 99) {
//                    kendo.ui.progress($('.k-edit-form-container'), true);
//                    kendo.ui.progress($('.k-edit-buttons'), true);
//                    e.container.find(".k-loading-image").css("background-image", "url('')");
//                }
//            } else {
//                e.container.kendoWindow("title", "Crear");
//            }
//        },
    }).data("kendoGrid");

    function eliminarLPrecio(e) {

        try {
            var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
            e.preventDefault();
            var dataItem = $("#gridDetalleListaPrecios").data("kendoGrid").dataItem($(e.target).closest("tr"));

            if (JSON.parse(sessionStorage.getItem("listaPrecios"))[est] == 99) {
                var actions = new Array();
                actions[0] = new Object();
                actions[0].text = "OK";
                actions[0].action = function () {
                    CUGrilla([dataItem], "DELETE");
                    bandAlert = 0;
                };
                actions[1] = new Object();
                actions[1].text = "Cancelar";
                actions[1].action = function () {
                    bandAlert = 0;
                };
                createDialog("Atención", "Esta seguro de eliminar el Registro ---" + dataItem.lis__des + " ---?", "400px", "200px", true, true, actions);
            } else {
                alertDialogs("El registro no puede ser eliminado.")
            }
        } catch (e) {
            $('#gridDetalleListaPrecios').data('kendoGrid').dataSource.read();
            $('#gridDetalleListaPrecios').data('kendoGrid').refresh();
        }
    }

    function editarLPrecio(e) {

        sessionStorage.removeItem("operaDEtalle");
        sessionStorage.removeItem("objEditDet");
        e.preventDefault();
        itemID = this.dataItem($(e.currentTarget).closest("tr"));
        sessionStorage.setItem("operaDEtalle", "PUT");
        sessionStorage.setItem("objEditDet", JSON.stringify(itemID));
        popupCU("Editar");
    }
}

function agregarItemDetalle() {
    sessionStorage.removeItem("operaDEtalle");
    sessionStorage.removeItem("objEditDet");
    sessionStorage.setItem("operaDEtalle", "POST");
    popupCU("Agregar");
//    var grid = $("#gridDetalleListaPrecios").data("kendoGrid");
//    grid.addRow();
}
function popupCU(titulo) {
    if (bandAlert === 0) {
        var widthPopUp = $("body").width();
        widthPopUp = widthPopUp * (35 / 100);
        var heightPopUp = $("body").height();
        heightPopUp = heightPopUp * (30 / 100);
        bandAlert = bandAlert + 1;
        $("body").append("<div id='windowListPre'></div>");
        var myWindow = $("#windowListPre");
        var undo = $("#undo");

        function onCloseWindowItemFac() {
            document.getElementById("windowListPre").remove();
            undo.fadeIn();
            bandAlert = 0;
        }

        myWindow.kendoWindow({
            width: widthPopUp,
            height: heightPopUp,
            title: titulo,
            content: sessionStorage.getItem("url") + "/mantenimientoListaPrecios/html/popupListaPrecios.html",
            visible: false,
            modal: true,
            actions: [
                "Close"
            ],
            close: onCloseWindowItemFac
        }).data("kendoWindow").center().open();
    }

}
function closePopUp() {
    bandAlert = 0;
    dataGridDetalleListaPrecios = [];
    cargarDatosGrilla();
    $('#gridDetalleListaPrecios').data('kendoGrid').dataSource.read();
    $('#gridDetalleListaPrecios').data('kendoGrid').refresh();
    $("#windowListPre").data("kendoWindow").close();
}

function volver() {
    var servicio = "mantenimientoListaPrecios";
    sessionStorage.setItem("servicio", servicio);
    //limpiarDatosFacturación();
    window.location.replace((sessionStorage.getItem("url") + servicio + "/html/" + servicio + ".html"));
}

function cargarDatosGrilla(objCab, ope) {

    var obj = new SIRgpr_lis_det();
    var objLPreciosDeta = obj.getjson();
    var urlSir = obj.getUrlSir();
    var mapData = obj.getMapData();
    if (sessionStorage.getItem("opeListPre") === "edit") {
        if (sessionStorage.getItem("listaPrecios")) {
            objLPreciosDeta.dsSIRgpr_lis_det.eeSIRgpr_lis[0].piilis_num = JSON.parse(sessionStorage.getItem("listaPrecios")).lis__num;
        }
    }


    var respuesta = ""
    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: "POST",
        data: JSON.stringify(objLPreciosDeta),
        url: urlSir,
        async: false,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            alertDialogs(" Error al consumir el servicio: cargarDatosGrilla/SIRgpr_lis_det \n" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            var key1 = Object.keys(jsonResp)[0];
            if (jsonResp[key1][mapData]) {
                var longArr = jsonResp[key1][mapData];
                for (var i = 0; i < longArr.length; i++) {
                    var obj = {
                        ID: i,
                        lis__num: longArr[i]["lis__num"],
                        cla__cod: longArr[i]["cla__cod"],
                        cla__des: longArr[i]["cla__des"],
                        art__cod: longArr[i]["art__cod"],
                        art__des: longArr[i]["art__des"],
                        lpd__pre: longArr[i]["lpd__pre"],
                        lpd__esd: longArr[i]["lpd__esd"],
                        top__dct: longArr[i]["top__dct"],
                        lpd__esh: longArr[i]["lpd__esh"],
                        pre__pcod: longArr[i]["pre__pcod"],
                        mnd__cla: longArr[i]["mnd__cla"],
                        pre__des: longArr[i]["pre__des"]

                    };
                    dataGridDetalleListaPrecios.push(obj);
                }
//                dataGridDetalleListaPrecios = jsonResp[key1][mapData];
            } else {
                gridDetalleListaPrecios();
            }
        } else {
            if (permitirIngreso === "\"Error parsing JSON: unexpected token: eof. (15360)\"") {
                alertDialogs("Sin Información en la tabla de detalle.");
            } else {
                alertDialogs("Error cargando la información de la lista de Precios metodo cargarDatosGrilla.\n" + permitirIngreso);
            }
        }
        gridDetalleListaPrecios();
    });
}


function CUGrilla(obj1, ope) {
    var obj = new SICUDgpr_lis();
    var objLPreciosDetaD = obj.getjson();
    var urlSirD = obj.getUrlSir();
    var mapDataD = "eegpr_lpd";

    var key1 = Object.keys(objLPreciosDetaD)[0];
    objLPreciosDetaD[key1][mapDataD] = obj1;
    delete objLPreciosDetaD[key1]["eegpr_lis"];
    var respuesta = ""
    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: ope,
        data: JSON.stringify(objLPreciosDetaD),
        url: urlSirD,
        async: false,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            alertDialogs(" Error al consumir el servicio: CUGrilla/SIRgpr_lis_det \n" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            var key1 = Object.keys(jsonResp)[0];
            dataGridDetalleListaPrecios = [];
            cargarDatosGrilla();
            gridDetalleListaPrecios();
        } else {
            dataGridDetalleListaPrecios = [];
            cargarDatosGrilla();
            gridDetalleListaPrecios();
            alertDialogs("Error cargando la información de la lista de Precios metodo CUGrilla.\n" + permitirIngreso);
        }
    });
}
function cambiarInput() {
    var ope = sessionStorage.getItem("opeListPre");
    if (ope === "edit") {
        var obj = JSON.parse(sessionStorage.getItem("listaPrecios"));
        document.getElementById('ipFechaInicio').innerHTML = obj.lis__fin;
        document.getElementById('ipFechaFin').innerHTML = obj.lis__ffi;
        document.getElementById('ipDescripcion').innerHTML = obj.lis__des;
        document.getElementById('ipDivisa').innerHTML = obj.mnd__cla;
    } else {
        document.getElementById('ipFechaInicio').innerHTML = "";
        document.getElementById('ipFechaFin').innerHTML = "";
        document.getElementById('ipDescripcion').innerHTML = "";
        document.getElementById('ipDivisa').innerHTML = "";
    }
}
function guardarListaPrecios() {
    alert("guardarListaPrecios");
}

function validarListaPrecios() {
    alert("validarListaPrecios");
}

function cargarListaPrecios(listaPrecios) {
    alert("cargarListaPrecios");
}

function editCab() {
    if (bandAlert === 0) {
        cambiarInput();
        var servicio = "listaPreciosCabecera";
        sessionStorage.setItem("servicio", servicio);

        $("body").append("<div id='windowCab'></div>");
        var myWindow = $("#windowCab");
        var undo = $("#undo");
        bandAlert = bandAlert + 1;
        function onCloseCabecera() {
            document.getElementById("windowCab").remove();
            undo.fadeIn();
            bandAlert = 0;
        }

        myWindow.kendoWindow({
            width: "60%",
            height: "40%",
            title: "Busqueda",
            content: sessionStorage.getItem("url") + "/mantenimientoListaPrecios/html/" + servicio + ".html",
            visible: false,
            modal: true,
            resizable: false,
            actions: [
                "Close"
            ],
            close: onCloseCabecera
        }).data("kendoWindow").center().open();
    }

//    window.location.replace((sessionStorage.getItem("url") + "mantenimientoListaPrecios/html/" + servicio + ".html"));
}
function cabGuard(jsonResp) {

    sessionStorage.setItem("listaPrecios", jsonResp);
    cambiarInput();
    var myWindow = $("#windowCab");
    myWindow.data("kendoWindow").close();
}

function inputsPopUp(e){
//    e.container.find("input[name=cla__des]").removeClass();
//    e.container.find("input[name=cla__des]").kendoDropDownList({
//        dataTextField: 'cla__des',
//        dataValueField: 'cla__cod',
//        optionLabel: "Seleccionar clase de articulo...",
//        
//        change: onChangeClase,
//        dataSource: {
//            type: "json",
//            transport: {
//                read: {
//                    url: ipServicios + baseParameters + "SIRinv_cla",
//                    contentType: "application/json; charset=utf-8",
//                    dataType: "json",
//                    type: "POST"
//                },
//                parameterMap: function (options, operation) {
//                    try {
//                        authdsinv_cla.dsinv_cla.eetemp[0].picsuc_cod = "00101";
//                        if (operation === 'read') {
//                            authdsinv_cla["eeinv_cla"] = [options];
//                            return JSON.stringify(authdsinv_cla);
//                        }
//                    } catch (e) {
//                        alertDialogs(e.message);
//                    }
//                }
//            },
//            schema: {
//                type: "json",
//                data: function (e) {
//                    if (e.dsinv_cla.eeEstados[0].Estado === "OK") {
//                        return e.dsinv_cla.eeinv_cla;
//                    } else {
//                        alertDialogs(e.dsinv_cla.eeEstados[0].Estado);
//                    }
//                },
//                model: {
//                    id: "cla__cod",
//                    fields: {
//                        cla__cod: {validation: {required: true}, type: 'number'},
//                        cla__des: {validation: {required: true}, type: 'string'}
//                    }
//                }
//            },
//            error: function (xhr, error) {
//                alertDialogs("Error de conexion del servidor " + xhr.xhr.status + " " + xhr.errorThrown);
//            }
//        }
//    });
////    ----------------------------------------------
    var objP = new SIRgpr_pre();
    var objArtP = objP.getjson();
    var urlSirP = objP.getUrlSir();
    var mapDataP = objP.getMapData();
            e.container.find("input[name=pre__des]").removeClass();
            e.container.find("input[name=pre__des]").kendoDropDownList({
        dataTextField: 'pre__des',
        dataValueField: "pre__pcod",
        optionLabel: "Seleccionar Presentación...",
//        select: onSelectPres,
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: urlSirP,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            var key1 = Object.keys(objArtP)[0];
                            var key2 = Object.keys(objArtP[key1])[1];
                            objArtP[key1][key2][0].piipre__est = 99
                            return JSON.stringify(objArtP);
                        }
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapDataP];
                    } else {
                        alertDialogs(e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "pre__des",
                    fields: {
                        pre__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " + xhr.xhr.status + " " + xhr.errorThrown);
            }
        }
    });
}


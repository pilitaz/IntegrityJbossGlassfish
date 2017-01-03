/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dataGridDetalleListaPrecios = [];
var dataSourceAdd = [];
var dataSourceUpdate = [];
var dataSourceDelete = [];



$(document).ready(function () {

    var authdsinv_cla = new Object();
    authdsinv_cla.dsinv_cla = new Object();
    authdsinv_cla.dsinv_cla.eeDatos = new Array();
    authdsinv_cla.dsinv_cla.eeDatos[0] = new Object();
    authdsinv_cla.dsinv_cla.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    authdsinv_cla.dsinv_cla.eeDatos[0].fiid = sessionStorage.getItem("picfiid");
    authdsinv_cla.dsinv_cla.eetemp = new Array();
    authdsinv_cla.dsinv_cla.eetemp[0] = new Object();
    

    cambiarInput();
    cargarDatosGrilla();
    gridDetalleListaPrecios();
});

function gridDetalleListaPrecios() {
//    datasource1();
    var grid = $("#gridDetalleListaPrecios").kendoGrid({
        dataSource: dataGridDetalleListaPrecios,
        batch: false,
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
                field: "pre__pcod",
                title: "Presentacíón"
            },
            {command: [
                    {name: "editar", click: editarLPrecio, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "eliminar", click: eliminarLPrecio, template: "<a class='k-grid-eliminar'><span class='k-sprite po_cerrar'></span></a>"}
                ],
                width: "100px"
            }],
        editable: {
            mode: "popup",
            window: {
                title: "Editar",
                animation: false,
            }
        },
    }).data("kendoGrid");

    function eliminarLPrecio(e) {

        try {
            var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
            e.preventDefault();
            var dataItem = $("#gridDetalleListaPrecios").data("kendoGrid").dataItem($(e.target).closest("tr"));


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
}
function popupCU(titulo) {
    if(bandAlert === 0){
        var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (35 / 100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (30 / 100);
bandAlert = bandAlert+1;
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
                        pre__des: longArr[i]["pre__des"]

                    };
                    dataGridDetalleListaPrecios.push(obj);
                }
//                dataGridDetalleListaPrecios = jsonResp[key1][mapData];
            } else {
                gridDetalleListaPrecios();
            }
        } else {
            alertDialogs("Error cargando la información de la lista de Precios metodo cargarDatosGrilla.\n" + permitirIngreso);
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
        bandAlert = bandAlert+1;
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
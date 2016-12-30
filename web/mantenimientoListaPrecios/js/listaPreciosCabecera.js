/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var lis__est = 99;
var lis__num = 0;
$(document).ready(function () {
    var authdsinv_cla = new Object();
    authdsinv_cla.dsinv_cla = new Object();
    authdsinv_cla.dsinv_cla.eeDatos = new Array();
    authdsinv_cla.dsinv_cla.eeDatos[0] = new Object();
    authdsinv_cla.dsinv_cla.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    authdsinv_cla.dsinv_cla.eeDatos[0].fiid = sessionStorage.getItem("picfiid");
    authdsinv_cla.dsinv_cla.eetemp = new Array();
    authdsinv_cla.dsinv_cla.eetemp[0] = new Object();


    $("#ipFechaInicio").kendoDatePicker({
        open: function () {
            var calendar = this.dateView.calendar;
            calendar.wrapper.width(this.wrapper.width() - 6);
        },
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"]
    });
    $("#ipFechaFin").kendoDatePicker({
        open: function () {
            var calendar = this.dateView.calendar;
            calendar.wrapper.width(this.wrapper.width() - 6);
        },
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"]
    });

    var authdssic_mnd = new Object();
    authdssic_mnd.dssic_mnd = new Object();
    authdssic_mnd.dssic_mnd.eeDatos = new Array();
    authdssic_mnd.dssic_mnd.eeDatos[0] = new Object();
    authdssic_mnd.dssic_mnd.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    authdssic_mnd.dssic_mnd.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");

    $("#ipDivisa").kendoDropDownList({
        optionLabel: "Seleccione la moneda",
        dataTextField: "mnd__des ",
        dataValueField: "mnd__cla",
        template: '<div class="divElementDropDownList">#: data.mnd__des #</div>',
        dataSource: {
            transport: {
                read: {
                    url: ipServicios + baseParameters + "SIRsic_mnd",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            authdssic_mnd["eesic_mnd"] = [options];
                            return JSON.stringify(authdssic_mnd);
                        }
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data: function (e) {
                    if (e.dssic_mnd.eeEstados[0].Estado === "OK") {
                        return e.dssic_mnd.eesic_mnd;
                    } else {
                        alertDialogs("Problemas con el servicio: " + e.dssic_mnd.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "mnd__cla",
                    fields: {
                        mnd__cla: {validation: {required: true}, type: 'string'},
                        mnd__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " + xhr.xhr.status + " " + xhr.errorThrown);
            }
        }

    });
    var ope = sessionStorage.getItem("opeListPre");
    if (ope === "edit") {
        var obj = JSON.parse(sessionStorage.getItem("listaPrecios"));
        lis__est = obj.lis__est;
        lis__num = obj.lis__num;
        $("#ipFechaInicio").val(obj.lis__fin);
        $("#ipFechaFin").val(obj.lis__ffi);
        $("#ipDescripcion").val(obj.lis__des);
        $("#ipDivisa").data("kendoDropDownList").value(obj.mnd__cla);
    }
    $("#buttonCab").kendoButton();
});
function clickBtnCabecera() {
    var ope = sessionStorage.getItem("opeListPre");
    if (ope === "edit") {
        sendAjaxAddCmpCon("PUT");
    }else{
        sendAjaxAddCmpCon("POST");
    }
}

function sendAjaxAddCmpCon(verHtml) {
    var objCU = new SICUDgpr_lis();
    var objD = objCU.getjson();
    var urlD = objCU.getUrlSir();
    var mapDataD = objCU.getMapData();
    var key1 = Object.keys(objD)[0];
    objD[key1][mapDataD][0] =
            {
                "lis__des": $("#ipDescripcion").val(),
                "lis__est": lis__est,
                "lis__ffi": $("#ipFechaFin").val(),
                "lis__fin": $("#ipFechaInicio").val(),
                "lis__num": lis__num,
                "mnd__cla": $("#ipDivisa").data("kendoDropDownList").value(),
            };

    var jsonResp = "";
    var permitirIngreso = "";
    $.ajax({
        type: verHtml,
        data: JSON.stringify(objD),
        url: urlD,
        async: false,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
            var key1 = Object.keys(resp)[0];
            permitirIngreso = JSON.stringify(resp[key1].eeEstados[0].Estado);
            jsonResp = resp;
        },
        error: function (e) {
            alertDialogs("Error al consumir el servicio de crear lista de precios" + e.status + " - " + e.statusText);
        }
    }).done(function () {
        if (permitirIngreso == '"OK"') {
            var key1 = Object.keys(jsonResp)[0];
            parent.cabGuard(JSON.stringify(jsonResp[key1][mapDataD][0]));
        } else {
            alertDialogs("Problemas con el creación de crear lista de precios .\n" + permitirIngreso);
        }

    });
}
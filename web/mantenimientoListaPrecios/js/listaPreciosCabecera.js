/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    var authdsinv_cla = new Object();
    authdsinv_cla.dsinv_cla = new Object();
    authdsinv_cla.dsinv_cla.eeDatos = new Array();
    authdsinv_cla.dsinv_cla.eeDatos[0] = new Object();
    authdsinv_cla.dsinv_cla.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
    authdsinv_cla.dsinv_cla.eeDatos[0].fiid = sessionStorage.getItem("picfiid");
    authdsinv_cla.dsinv_cla.eetemp = new Array();
    authdsinv_cla.dsinv_cla.eetemp[0] = new Object();

    $("#idClaseArticulo").kendoDropDownList({
        dataTextField: 'cla__des',
        dataValueField: 'cla__cod',
        optionLabel: "Seleccionar clase de articulo...",
        template: '<div class="divElementDropDownList">#: data.cla__des #</div>',
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: ipServicios + baseParameters + "SIRinv_cla",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        authdsinv_cla.dsinv_cla.eetemp[0].picsuc_cod = "00101";
                        if (operation === 'read') {
                            authdsinv_cla["eeinv_cla"] = [options];
                            return JSON.stringify(authdsinv_cla);
                        }
                    } catch (e) {
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data: function (e) {
                    if (e.dsinv_cla.eeEstados[0].Estado === "OK") {
                        return e.dsinv_cla.eeinv_cla;
                    } else {
                        alertDialogs(e.dsinv_cla.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cla__cod",
                    fields: {
                        cla__cod: {validation: {required: true}, type: 'number'},
                        cla__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " + xhr.xhr.status + " " + xhr.errorThrown);
            }
        }
    });

    $("#ipFechaInicio").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"]
    });
    $("#ipFechaFin").kendoDatePicker({
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
    $("#buttonCab").kendoButton();
//    debugger
//    cambiarInput();
//    cargarDatosGrilla()
//    gridDetalleListaPrecios();
});
function clickBtnCabecera(){
    parent.cabGuard();
}
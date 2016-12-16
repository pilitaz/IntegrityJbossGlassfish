/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var hoy = new Date(sessionStorage.getItem("fechaSistema"));
hoy.setHours(0, 0, 0, 0);
var objCliente = null;

//var auth = new Object();
//auth.dssic_suc = new Object();
//auth.dssic_suc.eeDatos = new Array();
//auth.dssic_suc.eeDatos[0] = new Object();
//auth.dssic_suc.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
//auth.dssic_suc.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
//auth.dssic_suc.eetemp = new Array();
//auth.dssic_suc.eetemp[0] = new Object();

var authdsgfc_cli = new Object();
authdsgfc_cli.dsgfc_cli = new Object();
authdsgfc_cli.dsgfc_cli.eeDatos = new Array();
authdsgfc_cli.dsgfc_cli.eeDatos[0] = new Object();
authdsgfc_cli.dsgfc_cli.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
authdsgfc_cli.dsgfc_cli.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
authdsgfc_cli.dsgfc_cli.eetemp = new Array();
authdsgfc_cli.dsgfc_cli.eetemp[0] = new Object();

$(document).ready(function () {
    $("#ipfechaInicio").kendoDatePicker({
        open: function () {
            var calendar = this.dateView.calendar;
            calendar.wrapper.width(this.wrapper.width() - 6);
        },
        culture: "es-CO",
        format: "yyyy/MM/dd",
        max: new Date(hoy),
        disableDates: ["sa", "su"],
        footer: false
    });
    $("#ipfechaFin").kendoDatePicker({
        open: function () {
            var calendar = this.dateView.calendar;
            calendar.wrapper.width(this.wrapper.width() - 6);
        },
        culture: "es-CO",
        format: "yyyy/MM/dd",
//        value: new Date(hoy),
        max: new Date(hoy),
        disableDates: ["sa", "su"],
        footer: false
    });

    $("#btBuscar").kendoButton({
        click: buscarPedidos
    });
});




function buscarPedidos() {
    var obj = [{
            "picsuc__cod": "*",
            "picclc__cod": "*",
            "pidped__fec": $("#ipfechaFin").val(),
            "piiped__num": 0,
            "picusuario": "*"
        }];
    parent.sendAjax(obj, "POST", "");
}
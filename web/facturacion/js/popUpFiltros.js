/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var hoy = new Date(sessionStorage.getItem("fechaSistema"));
hoy.setHours(0,0,0,0);
var objCliente = null;

var authdsgfc_cli = new Object();
authdsgfc_cli.dsgfc_cli = new Object();
authdsgfc_cli.dsgfc_cli.eeDatos = new Array();
authdsgfc_cli.dsgfc_cli.eeDatos[0] = new Object();
authdsgfc_cli.dsgfc_cli.eeDatos[0].picusrcod = sessionStorage.getItem("usuario");
authdsgfc_cli.dsgfc_cli.eeDatos[0].picfiid = sessionStorage.getItem("picfiid");
authdsgfc_cli.dsgfc_cli.eetemp = new Array();
authdsgfc_cli.dsgfc_cli.eetemp[0] = new Object();

$(document).ready(function(){
    $("#ipfechaInicio").kendoDatePicker({
        open: function() {
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
        open: function() {
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
    
    $("#ipCliente").kendoAutoComplete({
        dataTextField: "ter__raz",
        dataValueField: "ter__nit",        
        placeholder: "Selecione un cliente...",
        minLength: 3,
        filter: "contains",
        template:'<div class="divElementDropDownList">#: data.ter__raz #</div>',
        select: client,
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: ipServicios+"rest/Parameters/SIRgfc_cli",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try {
                        authdsgfc_cli.dsgfc_cli.eetemp[0].picter_raz = $("#ipCliente").val();                        
                        if (operation === 'read') {
                            authdsgfc_cli["eegfc_cli"] = [options];
                            return JSON.stringify(authdsgfc_cli);
                        } 
                    } catch (e) {
                        alertDialogs(e.message);
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    if(e.dsgfc_cli.eeEstados[0].Estado==="OK"){
                        return e.dsgfc_cli.eegfc_cli;
                    }else if(e.dsgfc_cli.eeEstados[0].Estado==="ERROR: Patrón de Búsqueda Insuficiente !!!"){
                        
                    }else{
                        alertDialogs(e.dsgfc_cli.eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
            change: function (e) {
                //console.log("Change client");
            },
            requestStart: function (e) {
                //console.log("Request Start servicio cliente");
            }            
        }
    });
    
    var estados = [
        { text: "Todos", value: "*" },
        { text: "No contabilizado", value: "0" },
        { text: "Contabilizado", value: "1" },
        { text: "Anulado", value: "9" }
    ];
    
    
    $("#ipEstado").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: estados,
        index: 0,
        
    });
    
    $("#btBuscar").kendoButton({
    });
});

function client(e){    
    var dataItem = this.dataItem(e.item.index()); 
    objCliente = dataItem;
}


function buscarFacturas(){  
    parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_ini = $("#ipfechaInicio").val();
    parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_fec_fin = $("#ipfechaFin").val();
    parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_ini = $("#ipNumeroInicio").val();
    parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_nro_fin = $("#ipNumeroFin").val();
    parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].piifac_est = $("#ipEstado").val();
    if($("#ipCliente").val()!=="" && objCliente !==null){        
        parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picter_nit = objCliente.ter__nit;
    }else{
        parent.dsSIRgfc_fac.dsSIRgfc_fac.eetemp[0].picter_nit = "*";
    }
    parent.gridFacturas();
    parent.closePopUpFiltros();
}
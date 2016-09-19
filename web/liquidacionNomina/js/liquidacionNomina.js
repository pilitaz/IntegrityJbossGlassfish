/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var hoy = new Date();

sessionStorage.setItem("ip", "190.144.16.114");
sessionStorage.setItem("puerto", "8810");

ip=sessionStorage.getItem("ip");
puerto=sessionStorage.getItem("puerto");;

$(document).ready(function() {
    
    iniDropdownList();
    
    iniAutocompletar();
    
    $("#ipFecha").kendoDatePicker({
        format: "yyyy-MM-dd",
        value: new Date(hoy),
        disableDates: ["sa", "su"],        
    });
    
    $("#btLiquidar").kendoButton({
    });
    
    $("#btCancelar").kendoButton({
    });
    
    var datepicker = $("#ipFecha").data("kendoDatePicker");
    datepicker.readonly();
    

});

function iniDropdownList(){
    
    $("#ipJornada").kendoDropDownList({
        optionLabel: "Seleccionar jornada",
        dataTextField: "jor__des",
        dataValueField: "jor__nro",
        change: onChangeJornada,
        dataSource: {
            transport: {
                read: {
                    url: "http://"+ip+":"+puerto+"/rest/Parameters/SIRnom_jor",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            authdsnom_jor["eenom_jor"] = [options];
                            return JSON.stringify(authdsnom_jor);
                        }	
                    } catch (e) {
                        alert(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsnom_jor.eeEstados[0].Estado==="OK"){
                        return e.dsnom_jor.eenom_jor;
                    }else{
                        alert(e.dsnom_jor.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "suc__cod",
                    fields: {
                        jor__nro: {validation: {required: true}, type: 'number'},
                        jor__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
    });
    
    $("#ipCalendario").kendoDropDownList({
        optionLabel: "Seleccionar calendario",
        dataTextField: "cal__des",
        dataValueField: "cal__nro"        
    });
    
    $("#ipSucursal").kendoDropDownList({
        optionLabel: "Seleccionar sucursal",
        dataTextField: "suc__nom",
        dataValueField: "suc__cod",        
        dataSource: {
            transport: {
                read: {
                    url: "http://"+ip+":"+puerto+"/rest/Parameters/SIRSucursalagencia",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {//                         
                            return JSON.stringify(auth);
                        }	
                    } catch (e) {
                        alert(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_suc.eeEstados[0].Estado==="OK"){
                        return e.dssic_suc.eesic_suc;
                    }else{
                        alert(e.dssic_suc.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "suc__cod",
                    fields: {
                        suc__cod: {validation: {required: true}, type: 'string'},
                        suc__nom: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
    });
}

function iniAutocompletar(e){
    
    $("#ipEmpleado").kendoAutoComplete({
        dataTextField: "ter__raz",
        placeholder: "Selecione un empleado...",
        filter: "contains",
        minLength: 3,
        select: codigoVendedor,
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: "http://"+ip+":"+puerto+"/rest/Parameters/Sirsic_ven",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST",
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try{
                        if($("#ipSucursal").val()==""){
                            alert("Debe seleccionar primero la sucursal");                       
                        }else{
                            debugger
                            authdssic_ven.dssic_ven.eetemp[0].picsuc_cod = $("#ipSucursal").val();                           
                            if (operation === 'read') {
                                authdssic_ven["eesic_ven1"] = [options];
                                return JSON.stringify(authdssic_ven);
                            } 
                        }                        
                    } catch (e) {
                        alert(e.message)
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    if(e.dssic_ven.eeEstados[0].Estado==="OK"){
                        return e.dssic_ven.eesic_ven1;
                    }else{
                        alert(e.dssic_ven.eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
            change: function (e) {
                //console.log("Change vandedor");
            },
            requestStart: function (e) {
                //                console.log("Request Start servicio vendedor");
            }            
        }
    });
}

function onChangeCalendario(e){
    var fechaVencimiento = new Date()
    fechaVencimiento = new Date(e.sender.dataSource._data [e.sender.selectedIndex-1].cal__fin__per);
    fechaVencimiento.setDate(fechaVencimiento.getDate()+1);
    $("#ipFecha").kendoDatePicker({        
	format: "yyyy-MM-dd",
	disableDates: ["sa", "su"],
	value: new Date(fechaVencimiento)        
    }); 
}

function  onChangeJornada(e){

    $("#ipCalendario").kendoDropDownList({
        optionLabel: "Seleccionar calendario",
        dataTextField: "cal__des",
        dataValueField: "cal__nro",
        change: onChangeCalendario,
        dataSource: {
            transport: {
                read: {
                    url: "http://"+ip+":"+puerto+"/rest/Parameters/SIRnom_cal",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            authdsnom_cal.dsnom_cal.eetemp[0].piijor_nro = $("#ipJornada").val();
                            return JSON.stringify(authdsnom_cal);
                        }	
                    } catch (e) {
                        alert(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsnom_cal.eeEstados[0].Estado==="OK"){
                        return e.dsnom_cal.eenom_cal;
                    }else{
                        alert(e.dsnom_cal.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cal__nro",
                    fields: {
                        cal__nro: {validation: {required: true}, type: 'string'},
                        cal__des: {validation: {required: true}, type: 'string'},
                        cal__fin__per : {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
    });
}

function codigoVendedor(e){
    alert("aqui se debe desactivar los radio de definitivo");
    var dataItem = this.dataItem(e.item.index()); 
    codVendedor = dataItem.ven__cod;    
}
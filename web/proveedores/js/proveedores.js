var bandAlert=0;
var dataProveedor;
$(document).ready(function () {   
    var nit1 = sessionStorage.getItem("Nit_Tercero");
    if(nit1==="Nuevo"){
          cargarDatos1();
    }else{
        cargarDatos();
    }


} );

function mostrarCustomPopUp() {
    if(bandAlert===0){
        bandAlert++;
        $("body").append("<div id='disable'></div>");
        $("#customPopUp").fadeIn("slow");
    }
    
}
function mostrarCustomPopUp1() {
    if(bandAlert===0){
        bandAlert++;
        $("body").append("<div id='disable'></div>");
        $("#customPopUp1").fadeIn("slow");
    }
    
}
function cerrarCustomPopUp1() {
    bandAlert = 0;
    $("#disable").fadeOut("slow");
    $("#customPopUp1").fadeOut("slow");
    $("#disable").remove();

}
function cerrarCustomPopUp() {
    bandAlert = 0;
    $("#disable").fadeOut("slow");
    $("#customPopUp").fadeOut("slow");
    $("#disable").remove();
 
}
function cargarProveedor(e){
    
    document.getElementById('contenido').hidden=false;
    document.getElementById('nit').innerHTML=e.dsSIRcon_prv.eecon_prv[0].ter__raz;
    document.getElementById('telefono').value=e.dsSIRcon_prv.eecon_prv[0].prv__tel;
    document.getElementById('correo').value=e.dsSIRcon_prv.eecon_prv[0].ter__mail;
    document.getElementById('fax').value=e.dsSIRcon_prv.eecon_prv[0].prv__nrfax;
    document.getElementById('direccion').value=e.dsSIRcon_prv.eecon_prv[0].prv__dir;
   
    document.getElementById('autorizacion').value=e.dsSIRcon_prv.eecon_prv[0].doc__pref;
    document.getElementById('departamento').value=e.dsSIRcon_prv.eecon_prv[0].dpto__cod1;
    document.getElementById('indicativo').value=e.dsSIRcon_prv.eecon_prv[0].prv__ind__ciu;
    document.getElementById('postal').value=e.dsSIRcon_prv.eecon_prv[0].prv__pos;
    document.getElementById('informarBeneficiario').value=e.dsSIRcon_prv.eecon_prv[0].prv__ben;
    document.getElementById('fechaAutorizacion').value=e.dsSIRcon_prv.eecon_prv[0].doc__pref;
    document.getElementById('estado').value=e.dsSIRcon_prv.eecon_prv[0].prv__est;
    //Detalle 
    document.getElementById('Banco').value=e.dsSIRcon_prv.eecon_prv[0].bco__cod1;
    document.getElementById('cuenta').value=e.dsSIRcon_prv.eecon_prv[0].bco__cta;
    document.getElementById('maximoPago').value=e.dsSIRcon_prv.eecon_prv[0].prv__max;
    document.getElementById('direccionBanco').value=e.dsSIRcon_prv.eecon_prv[0].fin__dir;
    document.getElementById('departamentoBanco').value=e.dsSIRcon_prv.eecon_prv[0].dpto__cod;
    document.getElementById('responsable').value=e.dsSIRcon_prv.eecon_prv[0].ter__rep;
    document.getElementById('cargoResponsable').value=e.dsSIRcon_prv.eecon_prv[0].prv__cgo;
    document.getElementById('agencia').value=e.dsSIRcon_prv.eecon_prv[0].prv__age;
    document.getElementById('tipoCuenta').value=e.dsSIRcon_prv.eecon_prv[0].prv__cta;
    document.getElementById('terceroBancario').value="";
    
    var estados = [
        {text: "Corriente", valor: true},
        {text: "Ahorro", valor: false}
    ];

     $("#tipoCuenta").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "valor",
         
        dataSource: estados,
        dataBound: function() { debugger        
        var dropdownlist = $("#tipoCuenta").data("kendoDropDownList");
        dropdownlist.value(dataProveedor.dsSIRcon_prv.eecon_prv[0].prv__cta);
        
            }
       
    });

    var consultar = new sirFormapago();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud2 = "eesic_fpag";
       $("#formaPago")
            .kendoDropDownList({
        dataTextField: "fpag__des",
        dataValueField: "pag__cod",
        dataBound: function() {         
        var dropdownlist = $("#formaPago").data("kendoDropDownList");
         dropdownlist.value(dataProveedor.dsSIRcon_prv.eecon_prv[0].pag__cod);
            },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud2];
                    } else {
                        alertDialogs("Error Con Servicio Forma de pago"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "pag__cod",
                    fields: {
                        pag__cod: {editable: false, nullable: false},
                        fpag__des: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
    
    var consultar = new sirCiudades();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eesic_ciu";
       $("#ciudad")
            .kendoDropDownList({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        dataBound: function() {          
        var dropdownlist = $("#ciudad").data("kendoDropDownList");
         dropdownlist.value(dataProveedor.dsSIRcon_prv.eecon_prv[0].ciu__cod);
            },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Cuidades"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__nom: {editable: false, nullable: false},
                        ciu__cod: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
       $("#ciudadBanco")
            .kendoDropDownList({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        dataBound: function() {          
        var dropdownlist = $("#ciudadBanco").data("kendoDropDownList");
         dropdownlist.value(dataProveedor.dsSIRcon_prv.eecon_prv[0].ciu__cod1);
            },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Cuidades"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__nom: {editable: false, nullable: false},
                        ciu__cod: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
//     $("#ciudad").data("kendoDropDownList").value=e.dsSIRcon_prv.eecon_prv[0].ciu__cod;
//    $("#ciudadBanco").data("kendoDropDownList").value=e.dsSIRcon_prv.eecon_prv[0].ciu__cod1;
}
function cargarDatos(e){debugger
   try {
//    var tercero = $("#terceroNit").data("kendoAutoComplete")._old;
//    var fields = tercero.split(';');
//    var name = fields[0];
//    var nit1 = fields[1];
//    var nit = nit1.replace(/\s+/g, '');
 var nit1 = sessionStorage.getItem("Nit_Tercero");
    var  actualizar = new sirProveedor();
    var  actjson = actualizar.getjson();
//     var nit = nit1.replace("", '');
    actjson.dsSIRcon_prv.eeSIRcon_prv[0].picter_nit=nit1;    
    var  urlactualizar = actualizar.getUrlSir();
   $.ajax({
        
                    type: "POST",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSIRcon_prv.eeEstados[0].Estado)=="OK")
                        {     
                            dataProveedor = resp;
                            cerrarCustomPopUp();   
                                cargarProveedor(dataProveedor);
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSIRcon_prv.eeEstados[0].Estado); 
                                                     
                        }
                    } 
        
                }); 
    
}catch(err) {
    alertDialogs("Error :" + err.message);
}
 
}
function onloadPopUpCond(){
    
    var consultar = new sirProveedores();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eeconprv";
    
    $("#terceroNit")
            .kendoAutoComplete({
                
        dataTextField: "nit__raz",
        dataValueField: "ter__nit",
        placeholder: "Selecione un tercero...",
            minLength: 3,
            filter: "contains",
            select: function(e) {                
           
            },
            template:'<div class="divElementDropDownList">#: data.nit__raz #</div>',
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Terceros"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ter__nit",
                    fields: {
                        nit__raz: {editable: true, nullable: false},
                        ter__nit: {editable: true, nullable: false},
                        
                    }
                }
            }
        }
        
    });
}
function cargarDatos1(e){debugger
   try {
       var obj = new sirConsultaTercero();
        var objJson = obj.getjson();
        var url = obj.getUrlSir();
        var mapData = obj.getMapData();
        $("#NiT")
                
                .kendoAutoComplete({
            dataTextField: "ter__nit",
            dataValueField: "ter__nit",        
            placeholder: "Selecione un cliente...",
            minLength: 4,
            filter: "contains",
            select: function(e) {                
            $("#razonSocial").val(e.dataItem.ter__raz);    
            },
            template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
            //select: setInfoCliente,
            dataSource: {
                type: "json",
                serverFiltering: true,
                transport: {
                    read:{
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                        try {
                                          
                            if (operation === 'read') {debugger
                                var key1 = Object.keys(objJson)[0];
                                var key2 = Object.keys(objJson[key1])[1];
                                objJson[key1][key2][0].picter_nit = $("#NiT").val();;
                                objJson[key1][key2][0].picter_raz = "";
                                return JSON.stringify(objJson);
                            } 
                        } catch (e) {
                            alertDialogs(e.message);
                        }                                    
                    }
                },
                schema: {
                    data: function (e){debugger
                        var key1 = Object.keys(e)[0];
                        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                            //$("#cedula").val(e.dsgfc_cli.eegfc_cli[0].ter__nit);
                            return e[key1][mapData];
                        }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !"){
                        
                        }else{
                            alertDialogs(e[key1].eeEstados[0].Estado);
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
         var obj = new sirConsultaTercero();
        var objJson = obj.getjson();
        var url = obj.getUrlSir();
        var mapData = obj.getMapData();
       $("#razonSocial")
                
                .kendoAutoComplete({
            dataTextField: "ter__raz",
            dataValueField: "ter__nit",        
            placeholder: "Selecione un cliente...",
            minLength: 6,
            filter: "contains",
            select: function(e) {                
            $("#NiT").val(e.dataItem.ter__nit);    
            },
            template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
            //select: setInfoCliente,
            dataSource: {
                type: "json",
                serverFiltering: true,
                transport: {
                    read:{
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                        try {
                                          
                            if (operation === 'read') {debugger
                                var key1 = Object.keys(objJson)[0];
                                var key2 = Object.keys(objJson[key1])[1];
                                objJson[key1][key2][0].picter_nit = "";
                                objJson[key1][key2][0].picter_raz = $("#razonSocial").val();;
                                return JSON.stringify(objJson);
                            } 
                        } catch (e) {
                            alertDialogs(e.message);
                        }                                    
                    }
                },
                schema: {
                    data: function (e){debugger   
                        var key1 = Object.keys(e)[0];
                        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                            return e[key1][mapData];
                        }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !"){
                        
                        }else{
                            alertDialogs(e[key1].eeEstados[0].Estado);
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
        {text: "Corriente", valor: true},
        {text: "Ahorro", valor: false}
    ];
document.getElementById('contenido').hidden=false;
document.getElementById('nitNuevo').hidden=false;
document.getElementById('razon').hidden=false;
     $("#tipoCuenta").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "valor",
         
        dataSource: estados,
        dataBound: function() { debugger        
        var dropdownlist = $("#tipoCuenta").data("kendoDropDownList");
       
        
            }
       
    });

    var consultar = new sirFormapago();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud2 = "eesic_fpag";
       $("#formaPago")
            .kendoDropDownList({
        dataTextField: "fpag__des",
        dataValueField: "pag__cod",
        dataBound: function() {         
   
            },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud2];
                    } else {
                        alertDialogs("Error Con Servicio Forma de pago"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "pag__cod",
                    fields: {
                        pag__cod: {editable: false, nullable: false},
                        fpag__des: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
    
    var consultar = new sirCiudades();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eesic_ciu";
       $("#ciudad")
            .kendoDropDownList({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        dataBound: function() {          
       
            },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Cuidades"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__nom: {editable: false, nullable: false},
                        ciu__cod: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });
       $("#ciudadBanco")
            .kendoDropDownList({
                dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        dataBound: function() {          
        
            },
        dataSource: {
            transport: {
                read: {
                    url: urlService,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        return JSON.stringify(datajson);
                    }
                }
            },
            schema: {
                data: function (e) {
                    var key1 = Object.keys(e)[0];
                    if (e[key1].eeEstados[0].Estado === "OK") {
                        return e[key1][mapCud1];
                    } else {
                        alertDialogs("Error Con Servicio Cuidades"+e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__nom: {editable: false, nullable: false},
                        ciu__cod: {editable: false, nullable: false}
                    }
                }
            }
        }
        
    });

    
}catch(err) {
    alertDialogs("Error :" + err.message);
}
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dataCliente;
$(document).ready(function() {   
    
    $("#ipFecha").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"]
    });
    
    $("#ipFechaEntrega").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(sessionStorage.getItem("fechaSistema")),
        disableDates: ["sa", "su"]
    });
    
    $("#buttonCab").kendoButton();
    
    iniDropDownList();
    
    iniAutocomplete();
    
    if(sessionStorage.getItem("regPedidos")){
        setInfoCabeceraPedido();
    }
    
    
    
});

function iniAutocomplete(){
    
    var obj = new sirConsultaCliente();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    $("#ipNITCliente").kendoAutoComplete({
        dataTextField: "ter__nit",
        dataValueField: "ter__nit",        
        placeholder: "Selecione un cliente...",
        minLength: 6,
        filter: "contains",
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
        select: setInfoCliente,
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
                                          
                        if (operation === 'read') {
                            var key1 = Object.keys(objJson)[0];
                            var key2 = Object.keys(objJson[key1])[1];
                            objJson[key1][key2][0].picter_nit = $("#ipNITCliente").val();
                            return JSON.stringify(objJson);
                        } 
                    } catch (e) {
                        alertDialogs(e.message);
                    }                                    
                }
            },
            schema: {
                data: function (e){                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !!!"){
                        
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
    
    $("#ipCliente").kendoAutoComplete({
        dataTextField: "ter__raz",
        dataValueField: "ter__nit",        
        placeholder: "Selecione un cliente...",
        minLength: 4,
        filter: "contains",
        template:'<div class="divElementDropDownList">#: data.ter__nit #'+' - '+' #:data.ter__raz #</div>',
        select: setInfoCliente,
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
                        if (operation === 'read') {
                            var key1 = Object.keys(objJson)[0];
                            var key2 = Object.keys(objJson[key1])[1];
                            objJson[key1][key2][0].picter_raz = $("#ipCliente").val();
                            return JSON.stringify(objJson);
                            return JSON.stringify(authdsgfc_cli);
                        } 
                    } catch (e) {
                        alertDialogs(e.message);
                    } 
                }
            },
            schema: {
                data: function (e){                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    }else if(e[key1].eeEstados[0].Estado==="ERROR: Patrón de Búsqueda insuficiente !!!"){
                        
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
}

function iniDropDownList(){    
    var obj = new sirConsultaSucursal();    
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    //carga el combo de sucursales
    $("#ipSucursal").kendoDropDownList({
        optionLabel: "Seleccione la sucursal",
        dataTextField: "suc__nom",
        dataValueField: "suc__cod",
        template:'<div class="divElementDropDownList">#: data.suc__nom #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            var key1 = Object.keys(objJson)[0];
                            var key2 = Object.keys(objJson[key1])[1];
                            objJson[key1][key2][0].piccia_nit = sessionStorage.getItem("companyNIT");                            
                            
                            return JSON.stringify(objJson);
                        }	
                    } catch (e) {
                        alertDialogs("Error en el servicio"+ e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
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
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        },
        change: function (e) {
            alert("Detecte un cambio")
        }
        
    });
    
    
    $("#ipCdePago").kendoDropDownList({
        optionLabel: "Seleccione la forma de pago",
        dataTextField: "pag__des",
        dataValueField: "fac__pag"
    });   
    
    // divisa
    
    var objDivisa = new sirConsultaDivisa();
    var objJsonDivisa = objDivisa.getjson();
    var urlDivisa = objDivisa.getUrlSir();
    var mapDataDivisa = objDivisa.getMapData();
    
    $("#ipDivisa").kendoDropDownList({
        optionLabel: "Seleccione la moneda",
        dataTextField: "mnd__des ",
        dataValueField: "mnd__cla",
        template:'<div class="divElementDropDownList">#: data.mnd__des #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: urlDivisa,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            return JSON.stringify(objJsonDivisa);
                        }	
                    } catch (e) {                        
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        
                        return e[key1][mapDataDivisa];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
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
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
    
    $("#ipVendedor").kendoDropDownList({
        dataTextField: "ter__raz",        
        dataValueField: "ven__cod", 
        optionLabel: "Selecione un vendedor...",                
        
    });
    
    $("#ipEstablecimiento").kendoDropDownList({
        dataTextField: "com__nom",        
        dataValueField: "com__con", 
        placeholder: "Selecione un establecimiento...",
    });
    
    var objCiudad = new sirConsultaCiudad();    
    var objJsonCiudad = objCiudad.getjson();
    var urlCiudad = objCiudad.getUrlSir();
    var mapDataCiudad = objCiudad.getMapData();
    
    //carga el combo de ciudad
    $("#ipCiudad").kendoDropDownList({
        optionLabel: "Seleccione la ciudad",
        dataTextField: "ciu__nom",
        dataValueField: "ciu__cod",
        template:'<div class="divElementDropDownList">#: data.ciu__nom #</div>',        
        dataSource: {
            transport: {
                read: {
                    url: urlCiudad,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {                            
                            return JSON.stringify(objJsonCiudad);
                        }	
                    } catch (e) {
                        alertDialogs("Error en el servicio"+ e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapDataCiudad];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "ciu__cod",
                    fields: {
                        ciu__cod: {validation: {required: true}, type: 'string'},
                        ciu__nom: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
}

function setInfoCliente(e){
    
    if(e){
        dataCliente = this.dataItem(e.item.index());         
    }
    
    if($("#ipNITCliente").val()===""||$("#ipNITCliente").val()!==dataCliente.ter__nit){
        $("#ipNITCliente").val(dataCliente.ter__nit);
    }
    
    if($("#ipCliente").val()===""||$("#ipCliente").val()!==dataCliente.ter__raz){
        $("#ipCliente").val(dataCliente.ter__raz);
    }
        
    var clienteNacional = dataCliente.gfc__nal;    
    sessionStorage.setItem("nitCliente", dataCliente.ter__nit); // sessionStorage.setItem("
    sessionStorage.setItem("listaPrecioCliente", dataCliente.lis__num);
    sessionStorage.setItem("codVendedor", dataCliente.ven__cod);    
    sessionStorage.setItem("opciondepago", dataCliente.fac__pag);
    
    var obj = new sirConsultaCondicionesDePago();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    
    $("#ipCdePago").kendoDropDownList({
        optionLabel: "Seleccione la forma de pago",
        dataTextField: "pag__des",
        dataValueField: "fac__pag",        
        dataSource: {
            transport: {
                read: {
                    url: url,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {                      
                        if (operation === 'read') {                            
                            var key1 = Object.keys(objJson)[0];
                            var key2 = Object.keys(objJson[key1])[1];
                            objJson[key1][key2][0].piifac_pag = sessionStorage.getItem("opciondepago");                            
                            return JSON.stringify(objJson);                            
                        }	
                    } catch (e) {
                        alertDialogs(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapData];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "fac__pag",
                    fields: {
                        fac__pag: {validation: {required: true}, type: 'number'},
                        pag__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
    
    var dropdownlist = $("#ipCdePago").data("kendoDropDownList");
    dropdownlist.value(sessionStorage.getItem("opciondepago")); 
    
    
    var objVendedor = new sirConsultaVendedor();
    var objJsonVendedor = objVendedor.getjson();
    var urlVendedor = objVendedor.getUrlSir();
    var mapDataVendedor = objVendedor.getMapData();
    
    $("#ipVendedor").kendoDropDownList({
        dataTextField: "ter__raz",        
        dataValueField: "ven__cod", 
        placeholder: "Selecione un vendedor...",
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: urlVendedor,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try{
//                        if($("#ipSucursal").val()==""){
//                            alertDialogs("Debe seleccionar primero la sucursal");                       
//                        }else{                       
                            if (operation === 'read') {
                                var key1 = Object.keys(objJsonVendedor)[0];
                                var key2 = Object.keys(objJsonVendedor[key1])[1];                                
                                objJsonVendedor[key1][key2][0].picsuc_cod = $("#ipSucursal").val();
                                objJsonVendedor[key1][key2][0].piiven_cod = sessionStorage.getItem("codVendedor");
                                return JSON.stringify(objJsonVendedor);
                            } 
                       // }                        
                    } catch (e) {
                        alertDialogs(e.message)
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapDataVendedor];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
            change: function (e) {
                //console.log("Change vandedor");
            },
            requestStart: function (e) {
                //                console.log("Request Start servicio vendedor");
            }            
        }
    });
    
    var objEstablecimiento = new sirConsultaEstablecimiento();
    var objJsonEstablecimiento = objEstablecimiento.getjson();
    var urlEstablecimiento = objEstablecimiento.getUrlSir();
    var mapDataEstablecimiento = objEstablecimiento.getMapData();
    
    $("#ipEstablecimiento").kendoDropDownList({
        dataTextField: "com__nom",        
        dataValueField: "com__con", 
        placeholder: "Selecione un establecimiento...",
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: urlEstablecimiento,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try{
                        
                        if (operation === 'read') {
                            var key1 = Object.keys(objJsonEstablecimiento)[0];
                            var key2 = Object.keys(objJsonEstablecimiento[key1])[1];                                
                            objJsonEstablecimiento[key1][key2][0].picsuc_cod = $("#ipSucursal").val();
                            objJsonEstablecimiento[key1][key2][0].piccom_con = "*";
                            objJsonEstablecimiento[key1][key2][0].picter_nit = dataCliente.ter__nit;
                            return JSON.stringify(objJsonEstablecimiento);
                        } 

                    } catch (e) {
                        alertDialogs(e.message)
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapDataEstablecimiento];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        },
        dataBound: function (e) {
            if(e.sender.dataSource._data.length===1){
                var dataItemEstablicimiento = e.sender.dataSource._data["0"]; 
                $("#ipDireccion").val(dataItemEstablicimiento.ter__dir);
                $("#ipTelefono").val(dataItemEstablicimiento.ter__tel);
            }
        },
        change: function (e) {
            alert("Change");
            if(e.sender.selectedIndex){
                var dataItemEstablicimiento = e.sender._data[e.sender.selectedIndex-1];
                $("#ipDireccion").val(dataItemEstablicimiento.ter__dir);
                $("#ipTelefono").val(dataItemEstablicimiento.ter__tel);
            }
        }
    });
}

function setInfoCabeceraPedido(){
    
    var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
    
    var kendoDropDownListSucursal = $("#ipSucursal").data("kendoDropDownList");    
    kendoDropDownListSucursal.value(pedido.suc__cod);
    kendoDropDownListSucursal.readonly(true);
    
    document.getElementById('idNumeroPedido').innerHTML = 'Nº '+pedido.ped__num;
    $("#buttonCab")["0"].childNodes["0"].data="Actualizar";//
    
    var obj = new sirConsultaCliente();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();    
    
    var key1 = Object.keys(objJson)[0];
    var key2 = Object.keys(objJson[key1])[1];                                
    objJson[key1][key2][0].picter_nit = pedido.ter__nit;
    
    var kendoDropDownListDivisa = $("#ipDivisa").data("kendoDropDownList");
    kendoDropDownListDivisa.value(pedido.mnd__cla.toUpperCase());
    kendoDropDownListDivisa.readonly(true);
    
    var fecha = new Date(pedido.ped__fec.replace(/-/g, "/"));
    fecha.setHours(0,0,0,0);
    
    var datepicker = $("#ipFecha").data("kendoDatePicker");
    datepicker.value(fecha);
    datepicker.readonly(true);
    
    var key1 = Object.keys(objJson)[0];
    var key2 = Object.keys(objJson[key1])[1];                                
    objJson[key1][key2][0].picter_nit = pedido.ter__nit;   
    
    try{
        $.ajax({
            type: "POST",
            data: JSON.stringify(objJson),
            url: url,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) { 
                
                var key1 = Object.keys(e)[0];
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    dataCliente = e[key1][mapData][0];
                    return e[key1][mapData];
                } else {
                    alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            error: function (e) {
                alertDialogs(" Error al consumir el servicio "+ e.status +" - "+ e.statusText);                
            }
        }).done(function(){            
            setInfoCliente();
        });
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
}

function guardarCabecera(){
    
    var verbo="POST"
    if($("#buttonCab")["0"].childNodes["0"].data==="Actualizar");{
        verbo="PUT";
    }
    debugger
    var obj = new SICUDPedido();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
    var key1 = Object.keys(objJson)[0];
    var key2 = Object.keys(objJson[key1])[1];                                
    objJson[key1][key2][0].suc__cod = $("#ipSucursal").val();
    objJson[key1][key2][0].ter__nit = $("#ipNITCliente").val();
    objJson[key1][key2][0].pago__cod = $("#ipSucursal").val();
    objJson[key1][key2][0].mnd__cla = $("#ipDivisa").val();    
    objJson[key1][key2][0].ven__cod = $("#ipVendedor").val();
    objJson[key1][key2][0].ped__fec = $("#ipFecha").val();
    objJson[key1][key2][0].ped__fec__ent = $("#ipFechaEntrega").val();
    objJson[key1][key2][0].com__con = $("#ipEstablecimiento").val();
    objJson[key1][key2][0].ter__dir = $("#ipDireccion").val();
    objJson[key1][key2][0].ter__tel = $("#ipTelefono").val();
    objJson[key1][key2][0].ciu__cod = $("#ipCiudad").val();
    objJson[key1][key2][0].ped__pqs = $("#ipSolicitante").val();
    objJson[key1][key2][0].obs__ped = $("#txtAObservacionePedido").val();
    
    try{
        $.ajax({
            type: verbo,
            data: JSON.stringify(objJson),
            url: url,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) { 
                
                var key1 = Object.keys(e)[0];
                if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                    return e[key1][mapData];
                } else {
                    alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                }
            },
            error: function (e) {
                alertDialogs(" Error al consumir el servicio "+ e.status +" - "+ e.statusText);                
            }
        }).done(function(e){
            parent.closePopUpCabecera()
        });
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //hoy es 0!
var yyyy = hoy.getFullYear();
hoy = yyyy+'-'+ mm+'-'+dd;
var diasCredito = "";
var tasaDeCambio = "";
var nitCliente = "";
var codVendedor = "";
var dataSource = "";

sessionStorage.setItem("usuario", "amonserrate");
sessionStorage.setItem("fiid", "4330416117457397760");

$(document).ready(function() {
    
    
    iniComboboxCabecera();
    
    iniAutocomplete();   
    
    
    if(localStorage["detalle_factura"] === undefined){ 
        setTestData();
    }
    
    $("#ipFecha").kendoDatePicker({
        format: "yyyy-MM-dd",
        value: new Date(hoy),
        disableDates: ["sa", "su"]
    });    
    $("#ipFechaVencimiento").kendoDatePicker({
        format: "yyyy-MM-dd",        
        value: new Date(hoy),
        disableDates: ["sa", "su"]
    });
    
    $("#ipFechaTasa").kendoDatePicker({
        format: "yyyy-MM-dd",        
        //value: new Date(hoy),
        disableDates: ["sa", "su"]
    });    
    
    $("#btGuardarFact").kendoButton({
    });
    
    $("#ipTasa").kendoNumericTextBox({
        format: "c",
        decimals: 2
    });
    
    $("#ipFletes").kendoNumericTextBox({
        format: "c",
        decimals: 2
    });
    
    $("#ipDescuento").kendoNumericTextBox({
        format: "p0",
        min: 0,
        max: 0.1,
        step: 0.01
    });
    
    iniGridDetalle();
    
    var maskedtextboxVendedor = $("#ipVendedor").data("kendoAutoComplete");
    maskedtextboxVendedor.enable(false); 
});
/** 
 * Se encarga de cargar la información de los combobox de la cabecera de la factura
 * @returns {undefined}
 */
function iniComboboxCabecera(){
    
    function onSelectSucursal(e){
        var dataItem = this.dataItem(e.item.index()); 
        var autocompleteVendedor = $("#ipVendedor").data("kendoAutoComplete");
        autocompleteVendedor.enable(true); 
    };
    
    //carga el combo de sucursales
    $("#ipSucursal").kendoComboBox({
        placeholder: "Seleccione la sucursal...",
        dataTextField: "suc__nom",
        dataValueField: "suc__cod",
        select: onSelectSucursal,
        dataSource: {
            transport: {
                read: {
                    url: "http://190.144.16.114:8810/rest/Parameters/SIRSucursalagencia",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            auth["eesic_suc"] = [options];
                            return JSON.stringify(auth);
                        }	
                    } catch (e) {
                        msnError(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_suc.eeEstados[0].Estado==="OK"){
                        return e.dssic_suc.eesic_suc;
                    }else{
                        msnError(e.dssic_suc.eeEstados[0].Estado);
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
                msnError("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
        }
        
    });
    
    //carga las condiciones de pago
    function onSelectfacpag(e){
        var dataItemfacpag = this.dataItem(e.item.index());        
        diasCredito = dataItemfacpag.fac__num;
    };
    
    $("#ipCdePago").kendoComboBox({
        placeholder: "Seleccione la forma de pago",
        dataTextField: "pag__des",
        dataValueField: "fac__pag",        
        select: onSelectfacpag,        
        dataSource: {
            transport: {
                read: {
                    url: "http://190.144.16.114:8810/rest/Parameters/SIRfac_pag",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            authfacpag["eefac_pag"] = [options];
                            return JSON.stringify(authfacpag);
                        }	
                    } catch (e) {
                        msnError(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsfac_pag.eeEstados[0].Estado==="OK"){
                        return e.dsfac_pag.eefac_pag;
                    }else{
                        msnError(e.dsfac_pag.eeEstados[0].Estado);
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
                msnError("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
        }
        
    });
    
    //carga las clases de documentos
    function onSelectsic_clc(e){
        var dataItemsic_clc = this.dataItem(e.item.index());
    };
    
    $("#ipCDocumento").kendoComboBox({
        placeholder: "Seleccione el tipo de documento",
        dataTextField: "clc__nom",
        dataValueField: "clc__cod",        
        select: onSelectsic_clc,
        dataSource: {
            transport: {
                read: {
                    url: "http://190.144.16.114:8810/rest/Parameters/SIRsic_clc",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    authdsinv_art.dsinv_art.eetemp[0].piicla_cod = $("#ipCliente").val();
                    try {
                        if (operation === 'read') {
                            authsic_clc["eesic_clc"] = [options];
                            return JSON.stringify(authsic_clc);
                        }	
                    } catch (e) {
                        msnError(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_clc.eeEstados[0].Estado==="OK"){
                        return e.dssic_clc.eesic_clc;
                    }else{
                        msnError(e.dssic_clc.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "clc__cod",
                    fields: {
                        clc__cod: {validation: {required: true}, type: 'number'},
                        clc__nom: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                msnError("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
        }
        
    });
    
    // divisa
    
    function onSelectDivisa(e){
        var dataItemDivisa = this.dataItem(e.item.index());
        tasaDeCambio = dataItemDivisa.mnd__tas__act;
        var tasaNumeric = $("#ipTasa").data("kendoNumericTextBox");
        tasaNumeric.value(tasaDeCambio);        
        var fechaTasa = dataItemDivisa.mnd__fec__vig;
        fechaTasa = fechaTasa.replace(/__/g, "-");        
        $("#ipFechaTasa").kendoDatePicker({        
            format: "yyyy-MM-dd",
            disableDates: ["sa", "su"],
            value: fechaTasa        
        });
    };
    
    $("#ipDivisa").kendoComboBox({
        placeholder: "Seleccione la moneda",
        dataTextField: "mnd__des ",
        dataValueField: "mnd__cla",        
        select: onSelectDivisa,       
        dataSource: {
            transport: {
                read: {
                    url: "http://190.144.16.114:8810/rest/Parameters/SIRsic_mnd",
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
                        msnError(e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_mnd.eeEstados[0].Estado==="OK"){
                        return e.dssic_mnd.eesic_mnd;
                    }else{
                        msnError(e.dssic_mnd.eeEstados[0].Estado);
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
                msnError("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
        }
        
    });
}

function iniAutocomplete(){
    $("#ipCliente").kendoAutoComplete({
        dataTextField: "ter__raz",
        dataValueField: "ter__nit",        
        placeholder: "Selecione un cliente...",
        filter: "contains",
        minLength: 3,
        select: clienteNacional,
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: "http://190.144.16.114:8810/rest/Parameters/SIRgfc_cli",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST",
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try {
                        authdsgfc_cli.dsgfc_cli.eetemp[0].picter_raz = $("#ipCliente").val();                        
                        if (operation === 'read') {
                            authdsgfc_cli["eegfc_cli"] = [options];
                            return JSON.stringify(authdsgfc_cli);
                        } 
                    } catch (e) {
                        msnError(e.message)
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    if(e.dsgfc_cli.eeEstados[0].Estado==="OK"){
                        return e.dsgfc_cli.eegfc_cli;
                    }else{
                        msnError(e.dsgfc_cli.eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                msnError("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
            change: function (e) {
                console.log("Change client");
            },
            requestStart: function (e) {
                console.log("Request Start servicio cliente");
            }            
        }
    });
    
    $("#ipVendedor").kendoAutoComplete({
        dataTextField: "ter__raz",
        placeholder: "Selecione un vendedor...",
        filter: "contains",
        minLength: 3,
        select: codigoVendedor,
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: "http://190.144.16.114:8810/rest/Parameters/SIRsic_ven",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST",
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try{
                        if($("#ipSucursal").val()==""){
                            msnError("Debe seleccionar primero la sucursal");                       
                        }else{
                            authdssic_ven.dssic_ven.eetemp[0].picsuc_cod = $("#ipSucursal").val();
                            console.log(JSON.stringify(authdssic_ven));
                            
                            if (operation === 'read') {
                                authdssic_ven["eesic_ven1"] = [options];
                                return JSON.stringify(authdssic_ven);
                            } 
                        }                        
                    } catch (e) {
                        msnError(e.message)
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    if(e.dssic_ven.eeEstados[0].Estado==="OK"){
                        return e.dssic_ven.eesic_ven1;
                    }else{
                        msnError(e.dssic_ven.eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                msnError("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
            change: function (e) {
                console.log("Change vandedor");
            },
            requestStart: function (e) {
                console.log("Request Start servicio vendedor");
            }            
        }
    });
    
}

function iniGridDetalle(){
    
    function claseArticulo(container, options) {        
        $('<input id="idClaseArticulo" data-bind="value: ' + options.field + '" />')
		.appendTo(container) 
		.kendoDropDownList({
                    dataTextField: 'cla__des',
            dataValueField: 'cla__cod',
            optionLabel: "Seleccionar clase de articulo...",
            change: onSelectClase,
            dataBound:onSelectClase,
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: "http://190.144.16.114:8810/rest/Parameters/SIRinv_cla",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) {
                        try {
                            authdsinv_cla.dsinv_cla.eetemp[0].picsuc_cod = $("#ipSucursal").val();
                            if (operation === 'read') {
                                authdsinv_cla["eeinv_cla"] = [options];
                                return JSON.stringify(authdsinv_cla);
                            }	
                        } catch (e) {
                            msnError("facturacion.js 501 \n"+e.message);
                        }
                    },
                },
                schema: {
                    type: "json",
                    data:function (e){
                        if(e.dsinv_cla.eeEstados[0].Estado==="OK"){                            
                            return e.dsinv_cla.eeinv_cla;
                        }else{
                            msnError("facturacion.js 511 \n"+e.dsinv_cla.eeEstados[0].Estado);
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
                    msnError("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                }
            }			
        });
    }
    
    
    function onSelectClase(e){        
        $("#idArticulo").kendoDropDownList({
            dataTextField: 'art__des',
            dataValueField: 'art__cod',
            optionLabel: "Seleccionar articulo...",
            select: onSelectArticulo,
            dataBound: onSelectArticulo,
            change: setIVA,
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: "http://190.144.16.114:8810/rest/Parameters/SIRinv_art",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) {                        
                        authdsinv_art.dsinv_art.eetemp[0].piicla_cod = $("#idClaseArticulo").val();                        
                       // console.log("facturacion.js 548 \n"+JSON.stringify(authdsinv_art));
                        try {
                            if (operation === 'read') {
                                authdsinv_art["eeinv_art"] = [options];                                
                                return JSON.stringify(authdsinv_art);
                            }	
                        } catch (e) {
                            msnError("facturacion.js 553 \n"+e.message)
                        }
                    },
                },
                schema: {
                    type: "json",
                    data:function (e){ 
                        
                        if(e.dsinv_art.eeEstados[0].Estado==="OK"){
                            return e.dsinv_art.eeinv_art;
                        }else{
                            msnError("facturacion.js 561 \n"+e.dsinv_art.eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "art__cod",
                        fields: {
                            art__cod: {validation: {required: true}, type: 'number'},
                            art__des: {validation: {required: true}, type: 'string'},
                            art__iva: {type: 'number'}
                        }
                    }
                },
                error: function (xhr, error) {
                    msnError("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                }
            }
        });//msnError("voy aquí");        
    }
    
    function onSelectArticulo(e){        
        $("#idListaPrecios").kendoDropDownList({
            dataTextField: 'lis__des',
            dataValueField: 'lis__num',    
            optionLabel: "Seleccionar lista de precios...",
            select: setValorArticulo,
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: "http://190.144.16.114:8810/rest/Parameters/SIRgpr_lpd",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) {                        
                        authdsgpr_lis.dsgpr_lpd.eetemp[0].piicla_cod = $("#idClaseArticulo").val();
                        authdsgpr_lis.dsgpr_lpd.eetemp[0].picart_cod = "123456";
                        debugger
                        console.log("552 authdsgpr_lis "+JSON.stringify(authdsgpr_lis));
                        try {
                            if (operation === 'read') {
                                authdsgpr_lis["eegrp_lpd1"] = [options];
                                return JSON.stringify(authdsgpr_lis);
                            }	
                        } catch (e) {
                            msnError("facturacion.js 557 \n"+e.message);
                        }
                    },
                },
                schema: {
                    type: "json",
                    data:function (e){                        
                        if(e.dsgpr_lpd.eeEstados[0].Estado==="OK"){
                            return e.dsgpr_lpd.eegrp_lpd1;
                        }else{
                            msnError(e.dsgpr_lpd.eeEstados[0].Estado);
                        }                    
                    },
                    model: {
                        id: "lis__num",
                        fields: {
                            lis__num: {validation: {required: true}, type: 'number'},
                            lis__des: {validation: {required: true}, type: 'string'},
                            lpd__pre: {type: 'number'}
                        }
                    }
                },
                error: function (xhr, error) {
                    msnError("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                }
            }	
        });
    }
    
    function articulo(container, options) {
        $('<input id="idArticulo" data-bind="value: ' + options.field + '" />')
		.appendTo(container) 
		.kendoDropDownList({
                    dataTextField: 'art__des',
            dataValueField: 'art__cod',
            optionLabel: "Seleccionar articulo...",
            select: onSelectArticulo,
            dataBound: onSelectArticulo,
            change: setIVA,
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: "",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) {
                        authdsinv_art.dsinv_art.eetemp[0].piicla_cod = $("#idClaseArticulo").val();
                        try {
                            if (operation === 'read') {
                                authdsinv_art["eeinv_art"] = [options];                               
                                return JSON.stringify(authdsinv_art);
                            }	
                        } catch (e) {
                            msnError(e.message)
                        }
                    },
                },
                schema: {
                    type: "json",
                    data:function (e){
                        msnError(e.dsinv_art.eeEstados[0].Estado);
                        if(e.dsinv_art.eeEstados[0].Estado==="OK"){
                            return e.dsinv_art.eeinv_art;
                        }else{
                            msnError(e.dsinv_art.eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "art__cod",
                        fields: {
                            art__cod: {validation: {required: true}, type: 'number'},
                            art__des: {validation: {required: true}, type: 'string'},
                            art__iva: {type: 'number'}
                        }
                    }
                },
                error: function (xhr, error) {
                    msnError("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                }
            }			
        });        
    }
    
    function listaPrecios(container, options) {
        $('<input id="idListaPrecios" data-bind="value: ' + options.field + '" />')
		.appendTo(container) 
		.kendoDropDownList({
                    dataTextField: 'lis__des',
            dataValueField: 'lis__num',    
            optionLabel: "Seleccionar lista de precios...",
            select: setValorArticulo,
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: "",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) {                        
                        authdsgpr_lis.dsgpr_lpd.eetemp[0].piicla_cod = $("#idClaseArticulo").val();
                        authdsgpr_lis.dsgpr_lpd.eetemp[0].picart_cod = $("#idArticulo").val();
                        console.log(""+JSON.stringify(authdsgpr_lis));
                        try {
                            if (operation === 'read') {
                                authdsgpr_lis["eegrp_lpd1"] = [options];                               
                                return JSON.stringify(authdsgpr_lis);
                            }	
                        } catch (e) {
                            msnError("facturacion.js 665 \n"+e.message)
                        }
                    },
                },
                schema: {
                    type: "json",
                    data:function (e){                        
                        if(e.dsgpr_lpd.eeEstados[0].Estado==="OK"){
                            return e.dsgpr_lpd.eegrp_lpd1;
                        }else{
                            msnError(e.dsgpr_lpd.eeEstados[0].Estado);
                        }                    
                    },
                    model: {
                        id: "lis__num",
                        fields: {
                            lis__num: {validation: {required: true}, type: 'number'},
                            lis__des: {validation: {required: true}, type: 'string'},
                            lpd__pre: {type: 'number'}
                        }
                    }
                },
                error: function (xhr, error) {
                    msnError("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                }
            }			
        });        
    }
    
    var dataSource = new kendo.data.DataSource({
        transport: {
            create: function(options){
                debugger
                if((localStorage["detalle_factura"]==="")||(!localStorage["detalle_factura"])){
                    var testData =[options.data];
                    localStorage["detalle_factura"] = JSON.stringify(testData); 
                }else{
                    var localData =  JSON.parse(localStorage["detalle_factura"])
                    options.data.ID = localData[localData.length-1].ID + 1;
                    localData.push(options.data);
                    localStorage["detalle_factura"] = JSON.stringify(localData);
                    localData = JSON.parse(localStorage["detalle_factura"]); 
                    localStorage["detalle_factura"] = "";
                }
                options.success(options.data);
            },
            read: function(options){                 
                var localData = JSON.parse(localStorage["detalle_factura"]);                 
                options.success(localData);
                
            },
            update: function(options){
                
                var localData = JSON.parse(localStorage["detalle_factura"]); 
                
                for(var i=0; i<localData.length; i++){
                    if(localData[i].ID == options.data.ID){
                        localData[i].Value = options.data.Value;
                    } 
                }
                localStorage["detalle_factura"] = JSON.stringify(localData); 
                options.success(options.data);
            },
            destroy: function(options){ 
                var localData = JSON.parse(localStorage["detalle_factura"]); 
                for(var i=0; i<localData.length; i++){
                    if(localData[i].ID === options.data.ID){
                        localData.splice(i,1);
                        break;
                    }
                } 
                localStorage["detalle_factura"] = JSON.stringify(localData); 
                options.success(localData);
            },
            parameterMap: function (options, operation) {
                        try {
                            
                            if (operation === 'create') {
                                
                            }	
                        } catch (e) {
                            msnError("facturacion.js 685 \n"+e.message)
                        }
                   },
        },
        schema: {            
            model: {
                fields: {
                    ID: { type: "number", editable: false },
                    Clase: { type: "string", validation: { required: true} },
                    Articulo: { type: "string", validation: { required: true} },
                    ListaPrecio: {type: "string", validation: { required: true}},
                    Descripcion: { type: "string" },
                    Cantidad: { type: "number", validation: { required: true, min:1} },                    
                    Descuento: { type: "number", validation: { min: 0, max: 0.1, step: 0.01}},
                    IVA: { type: "number", validation: { required: true, min: 0, max: 0.1, step: 0.01} },
                    ValorUnitario: { type: "number" },
                    ValorTotal: { type: "number" },
                    CodAmortizacion: { type: "string" },
                    DiasAmortizacion: { type: "number", validation: { min:1} }
                }}
        },
        pageSize: 20
    });
    
    var grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        batch: false,
        pageable: true,
        height: 550,
        toolbar: ["create"],        
        columns: [            
            {
                field: "clase",
                title: "Clase de articulo",                
                editor: claseArticulo,
                template: function (e){                    
                    if(e.clase){return e.clase.cla__des;}
                }
            },
            {
                field: "articulo",
                title: "Articulo",
                editor: articulo,
                template: function (e){
                    if(e.articulo){return e.articulo.art__des;}
                }
            },
            {
                field: "listaPrecios",
                title: "Lista de precios",
                editor: listaPrecios,
                template: function (e){                    
                    if(e.listaPrecios){return e.listaPrecios.lis__des;}
                }
            },
            {
                field: "Descripcion",
                title: "Descripción"
            },
            {
                field: "Cantidad",
                title: "Cantidad"
            },
            {
                field: "Descuento",
                title: "Descuento",
                format: "p0"
                
            },
            {
                field: "IVA",
                title: "IVA",
                editor: iva,
                format: "p0",
                step: 0.01
            },
            {
                field: "ValorUnitario",
                title: "Valor unitario",
                editor: valorUnitario,
                format: "{0:c}"
                
            },
            {
                field: "ValorTotal",
                title: "Valor total",
                editor: valorTotal,
                format: "{0:c}"
            },
            {
                field: "CodAmortizacion",
                title: "Código de amortizacion"
            },
            {
                field: "DiasAmortizacion",
                title: "Días de amortización",
                format: "{0:n0}",
            },
            { command: ["edit", "destroy"], title: "&nbsp;", width: 150 }],
        editable: "popup"
    });
}

function valorUnitario(container, options){
    $('<input id="idValorUnitario"/>')
		.appendTo(container) 
		.kendoNumericTextBox({
                });    
}

function iva(container, options){
    $('<input id="idIVA"/>')
		.appendTo(container) 
		.kendoNumericTextBox({
                format: "p0",
                step: 0.01
                });    
}

function valorTotal(container, options){
    $('<input id="idValorTotal"/>')
		.appendTo(container) 
		.kendoNumericTextBox({
                format: "c",                
                });    
}

function setIVA(e){
    debugger
        var selected= e.sender.selectedIndex;
        var iva= e.sender.dataSource._data[(selected-1)].art__iva;
        var numerictextbox = $("#idIVA").data("kendoNumericTextBox");
        numerictextbox.value(iva/100);              
}

function validaCabecera(){
    
    var usuario = sessionStorage.getItem("usuario");
    var fiid = sessionStorage.getItem("fiid");
    var sucursal = $("#ipSucursal").val();
    var claDocumento = $("#ipCDocumento").val();    
    var condiPagos = $("#ipCdePago").val();
    var fecha = $("#ipFecha").val();
    var fechaVencimeinto = $("#ipFechaVencimiento").val();
    var descuento = $("#ipDescuento").val();
    var divisa = $("#ipDivisa").val();
    var tasa = $("#ipTasa").val();
    var fletes = $("#ipFletes").val();
    var observaciones = $("#txtAObservaciones").val();
    var cabeceraValida = "";    
    var fechaTasa = $("#ipFechaTasa").val();
    var listaPrecios = $("#ipListaPrecios").val();
    
    var jSonData = new Object();
    jSonData.dsSIRgfc_fac = new Object();
    jSonData.dsSIRgfc_fac.eeDatos = new Array();
    jSonData.dsSIRgfc_fac.eeDatos[0] = new Object();
    jSonData.dsSIRgfc_fac.eeDatos[0].picusrcod = usuario;
    jSonData.dsSIRgfc_fac.eeDatos[0].picfiid = fiid;
    jSonData.dsSIRgfc_fac.eegfc_fac = new Array();
    jSonData.dsSIRgfc_fac.eegfc_fac[0] = new Object();
    jSonData.dsSIRgfc_fac.eegfc_fac[0].clc__cod = claDocumento;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].cpto__cod = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].dpc__fec = fechaVencimeinto;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__dto = descuento;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__est = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__fec = fecha;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__obs = observaciones;    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].lis__num = listaPrecios;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].loc__cod = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__cla = divisa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__fec = fechaTasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__val = tasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].pago__cod = condiPagos;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].suc__cod = sucursal;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ter__nit = nitCliente;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ven__cod = codVendedor;
    console.log(JSON.stringify(jSonData));
    $.ajax({
        type: "POST",
        data: JSON.stringify(jSonData),
        url: "http://172.21.24.146:8810/rest/Comercial/Valida_gfc_fac", //ipServicios + baseFactura +"ValidaCabecera",
        dataType : "json",
        contentType: "application/json;",
        success: function (resp) {
            console.log(JSON.stringify(resp));                
            cabeceraValida = JSON.stringify(resp.dsSIRgfc_fac.eeEstados[0].Estado);            
        },
        error: function (e) {
            console.log(JSON.stringify(e));
            msnError("Error consumiendo el servicio de validar cabecera\n"+ e.status +" - "+ e.statusText);
        }
    }).done(function(){
        if(cabeceraValida=='"OK"'){
            msnError("Cabecera valida");
            console.log("Cabecera valida \n" + cabeceraValida);                     
        }else{                    
            msnError("Cabecera invalida"+cabeceraValida);
            console.log("Datos  \n" + cabeceraValida);                
        }
    });
}

function calcularFechaVencimiento(){    
    var fechaTex = $("#ipFecha").val();
    var fechaIni = new Date(fechaTex);
    var fechaVencimiento="";
    var opcionDePago = diasCredito;
    fechaVencimiento = sumarDias(fechaIni, diasCredito);
    
    $("#ipFechaVencimiento").kendoDatePicker({        
	format: "yyyy-MM-dd",
	disableDates: ["sa", "su"],
	value: new Date(fechaVencimiento)        
    }); 
}

function sumarDias(fechax, dias){
    fechax.setDate(fechax.getDate() + dias);
    return fechax;
}
function onBlurTasaDeCambio(){
    if(tasaDeCambio != $("#ipTasa").val()){
        $("#ipFechaTasa").kendoDatePicker({        
            format: "yyyy-MM-dd",
            disableDates: ["sa", "su"],
            value: hoy        
        });  
    }
}

function clienteNacional(e){
    var dataItem = this.dataItem(e.item.index()); 
    var clienteNacional = dataItem.gfc__nal;
    nitCliente = dataItem.ter__nit;
    console.log(clienteNacional)
    
    var comboboxDivisa= $("#ipDivisa").data("kendoComboBox")
    comboboxDivisa.enable(!clienteNacional);
    
    var numericTextBoxTasa= $("#ipTasa").data("kendoNumericTextBox")
    numericTextBoxTasa.enable(!clienteNacional);
    
    var datepickerFechaTasa= $("#ipFechaTasa").data("kendoDatePicker")
    datepickerFechaTasa.enable(!clienteNacional);     
}

function codigoVendedor(e){
    var dataItem = this.dataItem(e.item.index()); 
    codVendedor = dataItem.ven__cod;    
}

function setTestData(){    
    var testData = "";
    localStorage["detalle_factura"] = testData;
    //$("#grid").data("kendoGrid").dataSource.read();
}

function setValorArticulo(e){
    debugger
    var valor = e.sender.dataSource._data["0"].lpd__pre;
    var numerictextbox = $("#idValorUnitario").data("kendoNumericTextBox");
    numerictextbox.value(valor);
    
    var iva = $("#idIVA").val();
    var total = parseFloat(valor) * (parseFloat(1)+parseFloat(iva)); //idValorTotal
    
    numerictextbox = $("#idValorTotal").data("kendoNumericTextBox");
    numerictextbox.value(total);

}

function guardarFactura(){
    
    var usuario = sessionStorage.getItem("usuario");
    var fiid = sessionStorage.getItem("fiid");
    var sucursal = $("#ipSucursal").val();
    var claDocumento = $("#ipCDocumento").val();    
    var condiPagos = $("#ipCdePago").val();
    var fecha = $("#ipFecha").val();
    var fechaVencimeinto = $("#ipFechaVencimiento").val();
    var descuento = $("#ipDescuento").val();
    var divisa = $("#ipDivisa").val();
    var tasa = $("#ipTasa").val();
    var fletes = $("#ipFletes").val();
    var observaciones = $("#txtAObservaciones").val();
    var cabeceraValida = "";    
    var fechaTasa = $("#ipFechaTasa").val();
    var listaPrecios = $("#ipListaPrecios").val();
    
    var jSonData = new Object();
    jSonData.dsSIRgfc_fac = new Object();
    jSonData.dsSIRgfc_fac.eeDatos = new Array();
    jSonData.dsSIRgfc_fac.eeDatos[0] = new Object();
    jSonData.dsSIRgfc_fac.eeDatos[0].picusrcod = usuario;
    jSonData.dsSIRgfc_fac.eeDatos[0].picfiid = fiid;
    jSonData.dsSIRgfc_fac.eegfc_fac = new Array();
    jSonData.dsSIRgfc_fac.eegfc_fac[0] = new Object();
    jSonData.dsSIRgfc_fac.eegfc_fac[0].clc__cod = claDocumento;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].cpto__cod = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].dpc__fec = fechaVencimeinto;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__dto = descuento;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__est = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__fec = fecha;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__obs = observaciones;    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].lis__num = listaPrecios;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].loc__cod = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__cla = divisa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__fec = fechaTasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__val = tasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].pago__cod = condiPagos;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].suc__cod = sucursal;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ter__nit = nitCliente;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ven__cod = codVendedor;
    
    console.log("facturacion.js 1028\n"+JSON.stringify(jSonData));
    
    var jSonDataDetalle = new Object();
    jSonDataDetalle = $("#grid").data();
    console.log("facturacion.js 1028\n"+JSON.stringify(jSonDataDetalle));
    
    $.each(jSonDataDetalle, function(i,item){
        console.log(jSonDataDetalle[i].ID)
        //document.write("<br>"+i+" - "+miJSON[i].valor+" - "+miJSON[i].color+" - "+miJSON[i].caracteristica.tipo+" - "+miJSON[i].caracteristica.ref);
    })
    
}
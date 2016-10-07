/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var hoy = new Date(sessionStorage.getItem("fechaSistema"));
hoy.setHours(0,0,0,0);
var tasaDeCambio = "";
var data="";

ip=sessionStorage.getItem("ip");
puerto=sessionStorage.getItem("puerto");

$(document).ready(function() {
    
    iniDropDownList();
    
    iniAutocomplete();
    
    $("#ipFecha").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy/MM/dd",
        value: new Date(hoy),
        disableDates: ["sa", "su"]
    });    
    $("#ipFechaVencimiento").kendoDatePicker({
        culture: "es-CO",
        format: "yyyy/MM/dd",        
        value: new Date(hoy),
        disableDates: ["sa", "su"]
    });
    
    $("#ipFechaTasa").kendoDatePicker({
        format: "yyyy/MM/dd",        
        //value: new Date(hoy),
        disableDates: ["sa", "su"]
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
    
    var datepickerFechaTasa= $("#ipFechaTasa").data("kendoDatePicker");
    datepickerFechaTasa.readonly();
    
    iniGridDetalle();
    
    var staticNotification = $("#staticNotification").kendoNotification({
        appendTo: "#appendto"
    }).data("kendoNotification");
    
    var kendoDropDownListVendedor = $("#ipVendedor").data("kendoDropDownList");
    kendoDropDownListVendedor.enable(false); 
});
/** 
 * Se encarga de cargar la información de los combobox de la cabecera de la factura
 * @returns {undefined}
 */
function iniDropDownList(){    
    function onChangetSucursal(e){        
        //        var autocompleteVendedor = $("#ipVendedor").data("kendoAutoComplete");
        //        autocompleteVendedor.enable(true); 
    };
    
    //carga el combo de sucursales
    $("#ipSucursal").kendoDropDownList({
        optionLabel: "Seleccione la sucursal",
        dataTextField: "suc__nom",
        dataValueField: "suc__cod",
        template:'<div class="divElementDropDownList">#: data.suc__nom #</div>',
        change: onChangetSucursal,
        dataSource: {
            transport: {
                read: {
                    url: ipServicios+"rest/Parameters/SIRSucursalagencia",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        if (operation === 'read') {
                            auth.dssic_suc.eetemp[0].piccia_nit = sessionStorage.getItem("companyNIT");
                            //console.log(JSON.stringify(auth));
                            auth["eesic_suc"] = [options];
                            return JSON.stringify(auth);
                        }	
                    } catch (e) {
                        kendo.alert(e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_suc.eeEstados[0].Estado==="OK"){
                        return e.dssic_suc.eesic_suc;
                    }else{
                        kendo.alert(e.dssic_suc.eeEstados[0].Estado);
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
                kendo.alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
    
    
    $("#ipCdePago").kendoDropDownList({
        optionLabel: "Seleccione la forma de pago",
        dataTextField: "pag__des",
        dataValueField: "fac__pag"
    });   
    
    
    //carga las clases de documentos
    
    $("#ipCDocumento").kendoDropDownList({
        optionLabel: "Seleccione el tipo de documento",
        dataTextField: "cpto__des",
        dataValueField: "cpto__cod",      
        template:'<div class="divElementDropDownList">#: data.cpto__des #</div>',
        dataSource: {
            transport: {
                read: {
                    url: ipServicios+"rest/Parameters/SIRgfc_cpto",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {                    
                    try {                         
                        if (operation === 'read') {
                            authdsgfc_cpto["eegfc_cpto"] = [options];                            
                            return JSON.stringify(authdsgfc_cpto);
                        }	
                    } catch (e) {
                        kendo.alert(e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsgfc_cpto.eeEstados[0].Estado==="OK"){
                        return e.dsgfc_cpto.eegfc_cpto;
                    }else{
                        kendo.alert(e.dsgfc_cpto.eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "cpto__cod",
                    fields: {
                        cpto__cod: {validation: {required: true}, type: 'number'},
                        cpto__des: {validation: {required: true}, type: 'string'}
                    }
                }
            },
            error: function (xhr, error) {
                kendo.alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }        
    });
    
    // divisa
    
    function onSelectDivisa(e){
        
        var dataItemDivisa = e.sender.dataSource._data[e.sender.selectedIndex-1];
        tasaDeCambio = dataItemDivisa.mnd__tas__act;        
        var tasaNumeric = $("#ipTasa").data("kendoNumericTextBox");
        tasaNumeric.value(tasaDeCambio);        
        
        var fechaTasaTex = dataItemDivisa.mnd__fec__vig;
        fechaTasaTex = fechaTasaTex.replace(/-/g, "/");  
        var fechaTasa = new Date(fechaTasaTex);
        fechaTasa.setHours(0,0,0,0);
        
        $("#ipFechaTasa").kendoDatePicker({        
            format: "yyyy/MM/dd",
            disableDates: ["sa", "su"],
            value: new Date(fechaTasa)
        });
        
        if(fechaTasa.getTime()===hoy.getTime()){
             $("#ipActualizarTasa")[0].disabled=true;
        }else{
             $("#ipActualizarTasa")[0].disabled=false;
        }
    };
    
    $("#ipDivisa").kendoDropDownList({
        optionLabel: "Seleccione la moneda",
        dataTextField: "mnd__des ",
        dataValueField: "mnd__cla",
        template:'<div class="divElementDropDownList">#: data.mnd__des #</div>',
        change: onSelectDivisa,       
        dataSource: {
            transport: {
                read: {
                    url: ipServicios+"rest/Parameters/SIRsic_mnd",
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
                        kendo.alert(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_mnd.eeEstados[0].Estado==="OK"){
                        return e.dssic_mnd.eesic_mnd;
                    }else{
                        kendo.alert("Problemas con el servicio: "+e.dssic_mnd.eeEstados[0].Estado);
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
                kendo.alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }
        
    });
    
    $("#ipVendedor").kendoDropDownList({
        dataTextField: "ter__raz",        
        dataValueField: "ven__cod", 
        optionLabel: "Selecione un vendedor...",                
        
    });
}

function iniAutocomplete(){
    $("#ipCliente").kendoAutoComplete({
        dataTextField: "ter__raz",
        dataValueField: "ter__nit",        
        placeholder: "Selecione un cliente...",
        minLength: 3,
        filter: "contains",
        template:'<div class="divElementDropDownList">#: data.ter__raz #</div>',
        select: setInfoCliente,
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
                        kendo.alert(e.message);
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    if(e.dsgfc_cli.eeEstados[0].Estado==="OK"){
                        return e.dsgfc_cli.eegfc_cli;
                    }else if(e.dsgfc_cli.eeEstados[0].Estado==="ERROR: Patrón de Búsqueda Insuficiente !!!"){
                        
                    }else{
                        kendo.alert(e.dsgfc_cli.eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                kendo.alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
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

function iniGridDetalle(){
    
    function conceptoDet(container, options) {        
        $('<input id="ipConceptoDet" style="width: 100%;" data-bind="value: ' + options.field + '" />').appendTo(container).kendoDropDownList({
            optionLabel: "Seleccione el tipo de documento",
            dataTextField: "cpto__des",
            dataValueField: "cpto__cod",
            template:'<div class="divElementDropDownList">#: data.cpto__des #</div>',
            change: onChangeConceptoDet,
            dataSource: {
                transport: {
                    read: {
                        url: ipServicios+"rest/Parameters/SIRgfc_cpto", 
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) {                    
                        try {                         
                            if (operation === 'read') {
                                authdsgfc_cpto["eegfc_cpto"] = [options];                            
                                return JSON.stringify(authdsgfc_cpto);
                            }	
                        } catch (e) {
                            kendo.alert(e.message)
                        }
                    }
                },
                schema: {
                    type: "json",
                    data:function (e){
                        if(e.dsgfc_cpto.eeEstados[0].Estado==="OK"){
                            return e.dsgfc_cpto.eegfc_cpto;
                        }else{
                            kendo.alert(e.dsgfc_cpto.eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "cpto__cod",
                        fields: {
                            cpto__cod: {validation: {required: true}, type: 'pdif__cla'},
                            cpto__des: {validation: {required: true}, type: 'string'},
                            pdif__cla: {validation: {required: true}, type: 'pdif__cla'}
                        }
                    }
                },
                error: function (xhr, error) {
                    kendo.alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                }
            }
        });
    }
    
    function claseArticulo(container, options) {        
        $('<input id="idClaseArticulo" style="width: 100%;" data-bind="value: ' + options.field + '" />').appendTo(container).kendoDropDownList({
            dataTextField: 'cla__des',
            dataValueField: 'cla__cod',
            optionLabel: "Seleccionar clase de articulo...",
            template:'<div class="divElementDropDownList">#: data.cla__des #</div>',
            change: onChangeClase,            
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: ipServicios+"rest/Parameters/SIRinv_cla",
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
                            kendo.alert(e.message);
                        }
                    }
                },
                schema: {
                    type: "json",
                    data:function (e){
                        if(e.dsinv_cla.eeEstados[0].Estado==="OK"){                            
                            return e.dsinv_cla.eeinv_cla;
                        }else{
                            kendo.alert(e.dsinv_cla.eeEstados[0].Estado);
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
                    kendo.alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                }
            }			
        });
    }
    
    function articulo(container, options) {
        $('<input id="idArticulo" style="width: 100%;" data-bind="value: ' + options.field + '" />').appendTo(container).kendoDropDownList({
            dataTextField: 'art__des',
            dataValueField: 'art__cod',
            optionLabel: "Seleccionar articulo..."           
            
        });        
    }
    
    function descripcion(container, options) {
        $('<textarea id="idDescripcion" style="width: 100%; height: 150px; resize:none;" class="k-textbox"s data-bind="value: ' + options.field + '" />').appendTo(container)
    }
    
    function cantidad(container, options){
        $('<input id="ipCantidad" style="width: 100%;" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field+ '"/>').appendTo(container).kendoNumericTextBox({        
            format: "n0",            
            min: 1,
            change: setValorTotal,        
            spin: setValorTotal
        });    
    }
    
    function descuento(container, options){
        $('<input id="idDescuento" style="width: 100%;" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field+ '"/>').appendTo(container).kendoNumericTextBox({
            format: "p0",
            step: 0.01,
            change: setValorTotal,        
            spin: setValorTotal
        });    
    }
    
    function iva(container, options){
        $('<input id="idIVA" style="width: 100%;" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field+ '"/>').appendTo(container).kendoNumericTextBox({
            format: "p0",
            step: 0.01
        });    
    }
    
    function valorUnitario(container, options){    
        $('<input id="idValorUnitario" style="width: 100%;" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field+ '"/>').appendTo(container).kendoNumericTextBox({        
            format: "c2",
            change: setValorTotal        
        });    
    }
    
    function valorTotal(container, options){
        $('<input id="idValorTotal" style="width: 100%;" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field+ '"/>').appendTo(container).kendoNumericTextBox({
            format: "c2"                
        });    
    }
    
    function codigoAmortizacion(container, options) {        
        $('<input id="idCodigoAmortizacion" style="width: 100%;" data-bind="value: ' + options.field + '" />').appendTo(container) .kendoDropDownList({
            dataTextField: 'pdif__des',
            dataValueField: 'pdif__cla',
            optionLabel: "Seleccionar codigo de amortización...",  
            template:'<div class="divElementDropDownList">#: data.pdif__des #</div>',
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: ipServicios+"rest/Parameters/SIRsic_pdif",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) {
                        try {                            
                            if (operation === 'read') {
                                authdssic_pdif["eesic_pdif"] = [options];
                                return JSON.stringify(authdssic_pdif);
                            }	
                        } catch (e) {
                            kendo.alert(e.message);
                        }
                    }
                },
                schema: {
                    type: "json",
                    data:function (e){
                        if(e.dssic_pdif.eeEstados[0].Estado==="OK"){                            
                            return e.dssic_pdif.eesic_pdif;
                        }else{
                            kendo.alert(e.dssic_pdif.eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "pdif__cla",
                        fields: {
                            pdif__cla: {validation: {required: true}, type: 'number'},
                            pdif__des: {validation: {required: true}, type: 'string'}
                        }
                    }
                },
                error: function (xhr, error) {
                    kendo.alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                }
            }			
        });
    }
    
    function diasAmortizacion(container, options){
        $('<input id="ipDiasAmortizacion" style="width: 100%;" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field+ '"/>').appendTo(container).kendoNumericTextBox({        
            format: "n0",            
            min: 0
        });    
    }
    
    function fechaAmortizacion(container, options) {        
        $('<input id="ipFechaAmortizacion" style="width: 100%;" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field+ '"/>').appendTo(container).kendoDatePicker({
            format: "{0:dd/MM/yyyy}",
            value: new Date(hoy)
        });
    }
    
    function onChangeClase(e){        
        $("#idArticulo").kendoDropDownList({
            dataTextField: 'art__des',
            dataValueField: 'art__cod',
            optionLabel: "Seleccionar articulo...",
            template:'<div class="divElementDropDownList">#: data.art__des #</div>',
            change: onChangeArticulo,
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: ipServicios+"rest/Parameters/SIRinv_art",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) {
                        authdsinv_art.dsinv_art.eetemp[0].piicla_cod = $("#idClaseArticulo").val();
                        authdsinv_art.dsinv_art.eetemp[0].piilis_num = sessionStorage.getItem("listaPrecioCliente");//lista del cliente        
                        console.log("authdsinv_art"+JSON.stringify(authdsinv_art));
                        try {
                            if (operation === 'read') {
                                authdsinv_art["eeinv_art"] = [options];                                
                                return JSON.stringify(authdsinv_art);
                            }	
                        } catch (e) {
                            kendo.alert("Error" +e.message);
                        }
                    },
                },
                schema: {
                    type: "json",
                    data:function (e){ 
                        
                        if(e.dsinv_art.eeEstados[0].Estado==="OK"){
                            return e.dsinv_art.eeinv_art;
                        }else{
                            kendo.alert("Error: " +e.dsinv_art.eeEstados[0].Estado);
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
                    kendo.alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
                }
            }
        });
    }
    
    function onChangeConceptoDet(e){
        
        var codAmortizacion= e.sender.dataSource._data[e.sender.selectedIndex-1].pdif__cla;
        var dropdownlist = $("#idCodigoAmortizacion").data("kendoDropDownList");
        var numericTextBoxTasa= $("#ipDiasAmortizacion").data("kendoNumericTextBox");
        var datepickerFechaTasa= $("#ipFechaAmortizacion").data("kendoDatePicker");
        
        if(codAmortizacion===0){
            dropdownlist.enable(false);
            numericTextBoxTasa.enable(false);            
            datepickerFechaTasa.enable(false);
        }else{
            dropdownlist.enable(true);
            numericTextBoxTasa.enable(true);            
            datepickerFechaTasa.enable(true);
            dropdownlist.value(codAmortizacion);
            dropdownlist.readonly();   
        }        
    }
    
    function onChangeArticulo(e){        
        setIVA(e);
        setValorArticulo(e);       
    }
    
    
    function setIVA(e){
        var selected= e.sender.selectedIndex;
        var iva= e.sender.dataSource._data[(selected-1)].art__iva;
        var numerictextbox = $("#idIVA").data("kendoNumericTextBox");    
        numerictextbox.value(iva/100);    
        numerictextbox.readonly();
        
    }
    
    function setValorArticulo(e){
        var valor = 0;    
        valor = e.sender.dataSource._data[e.sender.selectedIndex-1].art__val;
        
        var numerictextbox = $("#idValorUnitario").data("kendoNumericTextBox");
        numerictextbox.value(valor);    
    }
    
    function setValorTotal(){
        var cantidad = $("#ipCantidad").val();
        var valor = $("#idValorUnitario").val();
        var iva = $("#idIVA").val();
        var descuento = $("#idDescuento").val();
        valor = (parseFloat(valor) * (parseFloat(1)-parseFloat(descuento)));
        var total = parseFloat(cantidad) * (parseFloat(valor) * (parseFloat(1)+parseFloat(iva))); //idValorTotal
        
        var numerictextbox = $("#idValorTotal").data("kendoNumericTextBox");
        numerictextbox.value(total);
    }
    
    
    
    var dataSource = new kendo.data.DataSource({        
        schema: {            
            model: {
                fields: {
                    ID: { type: "number", editable: false },
                    ConceptoDet: { type: "string", editable: false },
                    Clase: { type: "string", validation: { required: true} },
                    Articulo: { type: "string", validation: { required: true} },                    
                    Descripcion: { type: "string" },
                    Cantidad: { type: "number", format: "n0", validation: { required: true, min:1} },                    
                    Descuento: { type: "number", format: "p0", validation: { min: 0, max: 0.1, step: 0.01}},
                    IVA: { type: "number", format: "p0", validation: { required: true, min: 0, max: 0.1, step: 0.01} },
                    ValorUnitario: { type: "number", format: "c2" },
                    ValorTotal: { type: "number", format: "{0:c}" },
                    CodAmortizacion: { type: "string" },
                    DiasAmortizacion: { type: "number", format: "n0", validation: { min:0} },
                    FechaAmortizacion: { type: "date", format: "{0:dd/MM/yyyy}"}
                }}
        },
        pageSize: 20
    });
    
    var grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        navigatable: true,
        batch: false,
        pageable: true,
        height: 500,
        dataBinding : onDataBoundGrid,        
        columns: [
            {
                field: "conceptoDet",
                title: "Concepto",                
                editor: conceptoDet,
                template: function (e){                    
                    if(e.conceptoDet){return e.conceptoDet.cpto__des;}
                    
                }
            },
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
                field: "Descripcion",
                title: "Descripción",
                editor: descripcion
            },
            {
                field: "Cantidad",
                title: "Cantidad",                
                editor: cantidad
            },
            {
                field: "Descuento",
                title: "Descuento",
                editor: descuento
            },
            {
                field: "IVA",
                title: "IVA",
                editor: iva
            },
            {
                field: "ValorUnitario",
                title: "Valor unitario",
                editor: valorUnitario
            },
            {
                field: "ValorTotal",
                title: "Valor total",
                editor: valorTotal                
            },
            {
                field: "codAmortizacion",
                title: "Código de amortizacion",
                hidden:true, 
                editor: codigoAmortizacion,
                template: function (e){                    
                    if(e.codAmortizacion){return e.codAmortizacion.pdif__des;}
                }
            },
            {
                field: "DiasAmortizacion",
                title: "Días de amortización",
                editor: diasAmortizacion,
                hidden:true
                
            },
            {
                field: "FechaAmortizacion",
                title: "Fecha de amortización",
                hidden:true,
                editor: fechaAmortizacion,
                template: '#= kendo.toString(FechaAmortizacion, "MM/dd/yyyy" ) #'
            },
            { command: [
                    {name: "edit", template: "<a class='k-grid-edit'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "delete", template: "<a class='k-grid-delete'><span class='k-sprite po_cerrar'></span></a>"}
                ], title: "detalle", width: 300 }],
        editable: {
            mode: "popup",
            window: {
                title: "Editar",
                animation: false,
                width: "700px"
            }
        }
    }).data("kendoGrid");
}

function validaCabecera(){
    var usuario = sessionStorage.getItem("usuario");
    var fiid = sessionStorage.getItem("picfiid");
    var sucursal = $("#ipSucursal").val();
    var claDocumento = $("#ipCDocumento").val();    
    var condiPagos = $("#ipCdePago").val();
    var fecha = $("#ipFecha").val();
    var fechaVencimeinto = $("#ipFechaVencimiento").val();    
    var divisa = $("#ipDivisa").val();
    var tasa = $("#ipTasa").val();
    var fletes = $("#ipFletes").val();
    var observaciones = $("#txtAObservaciones").val();
    var cabeceraValida = "";    
    var fechaTasa = $("#ipFechaTasa").val();
    var listaPrecios = $("#ipListaPrecios").val();
    var actualizarTasa = $("#ipActualizarTasa")["0"].checked;
        
    var jSonData = new Object();
    jSonData.dsSIRgfc_fac = new Object();
    jSonData.dsSIRgfc_fac.eeDatos = new Array();
    jSonData.dsSIRgfc_fac.eeDatos[0] = new Object();
    jSonData.dsSIRgfc_fac.eeDatos[0].picusrcod = usuario;
    jSonData.dsSIRgfc_fac.eeDatos[0].picfiid = fiid;
    jSonData.dsSIRgfc_fac.eegfc_fac = new Array();
    jSonData.dsSIRgfc_fac.eegfc_fac[0] = new Object();    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].cpto__cod = claDocumento;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].dpc__fec = fechaVencimeinto;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__est = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__fec = fecha;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].obs__fac = observaciones;    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].lis__num = listaPrecios;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].loc__cod = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__cla = divisa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__fec = fechaTasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__val = tasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__act = actualizarTasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].pago__cod = condiPagos;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].suc__cod = sucursal;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ter__nit = sessionStorage.getItem("nitCliente");
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ven__cod = sessionStorage.getItem("codVendedor");
    console.log("jSonData \n"+JSON.stringify(jSonData));
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(jSonData),
        url: ipServicios+"rest/Comercial/Valida_gfc_fac", //ipServicios + baseFactura +"ValidaCabecera",
        dataType : "json",
        contentType: "application/json;",
        success: function (resp) {
            console.log(JSON.stringify(resp));                
            cabeceraValida = JSON.stringify(resp.dsSIRgfc_fac.eeEstados[0].Estado);            
        },
        error: function (e) {
            console.log(JSON.stringify(e));
            kendo.alert("Error consumiendo el servicio de validar cabecera\n"+ e.status +" - "+ e.statusText);
        }
    }).done(function(){
        if(cabeceraValida=='"OK"'){
            sessionStorage.setItem("cabeceraValida","true");
            agregarItemDetalle();            
            console.log("Cabecera valida \n" + cabeceraValida);                     
        }else{
            sessionStorage.setItem("cabeceraValida","false");
            kendo.alert("Cabecera invalida"+cabeceraValida);
            console.log("Datos  \n" + cabeceraValida);                
        }
    });
}

function calcularFechaVencimiento(diasCredito){    
    
    var fechaTex = $("#ipFecha").val();
    var fechaIni = new Date(fechaTex); //fecha = new Date().toString('yyyy/M/d');
    var yyyy = fechaIni.getDate();
    var fechaVencimiento="";
    fechaVencimiento = sumarDias(fechaIni, diasCredito);
    
    $("#ipFechaVencimiento").kendoDatePicker({        
	format: "yyyy/MM/dd",
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
            format: "yyyy/MM/dd",
            disableDates: ["sa", "su"],
            value: hoy        
        });  
        $("#ipActualizarTasa")[0].disabled=true;
    }
}

function setInfoCliente(e){     
    
    var dataItem = this.dataItem(e.item.index()); 
    var clienteNacional = dataItem.gfc__nal;    
    sessionStorage.setItem("nitCliente", dataItem.ter__nit); // sessionStorage.setItem("
    sessionStorage.setItem("listaPrecioCliente", dataItem.lis__num);
    sessionStorage.setItem("codVendedor", dataItem.ven__cod);    
    sessionStorage.setItem("opciondepago", dataItem.fac__pag);
    
    var kendoDropDownListVendedor = $("#ipVendedor").data("kendoDropDownList");
    kendoDropDownListVendedor.enable(true); 
    
    $("#ipCdePago").kendoDropDownList({
        optionLabel: "Seleccione la forma de pago",
        dataTextField: "pag__des",
        dataValueField: "fac__pag",
        dataBound:onDataBoundOpcPago,
        change: onChangetfacpag,
        dataSource: {
            transport: {
                read: {
                    url: ipServicios+"rest/Parameters/SIRfac_pag",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {                        
                        authfacpag.dsfac_pag.eetemp[0].piifac_pag = sessionStorage.getItem("opciondepago");
                        //                        console.log("authfacpag \n"+JSON.stringify(authfacpag));
                        if (operation === 'read') {                            
                            authfacpag["eefac_pag"] = [options];
                            return JSON.stringify(authfacpag);
                        }	
                    } catch (e) {
                        kendo.alert("Error 825"+e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsfac_pag.eeEstados[0].Estado==="OK"){
                        return e.dsfac_pag.eefac_pag;
                    }else{
                        kendo.alert(e.dsfac_pag.eeEstados[0].Estado);
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
                kendo.alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
        }
        
    });
    
    $("#ipVendedor").kendoDropDownList({
        dataTextField: "ter__raz",        
        dataValueField: "ven__cod", 
        placeholder: "Selecione un vendedor...",        
        dataBound:onDataBoundVendedor,
        dataSource: {
            type: "json",
            serverFiltering: true,
            transport: {
                read:{
                    url: ipServicios+"rest/Parameters/SIRsic_ven", //SIRsic_ven
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST",
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try{
                        if($("#ipSucursal").val()==""){
                            kendo.alert("Debe seleccionar primero la sucursal");                       
                        }else{
                            authdssic_ven.dssic_ven.eetemp[0].picsuc_cod = $("#ipSucursal").val();
                            authdssic_ven.dssic_ven.eetemp[0].piiven_cod = sessionStorage.getItem("codVendedor");
                            //                            console.log("authdssic_ven 877 \n"+JSON.stringify(authdssic_ven));
                            if (operation === 'read') {
                                authdssic_ven["eesic_ven1"] = [options];
                                return JSON.stringify(authdssic_ven);
                            } 
                        }                        
                    } catch (e) {
                        kendo.alert(e.message)
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    if(e.dssic_ven.eeEstados[0].Estado==="OK"){
                        return e.dssic_ven.eesic_ven1;
                    }else{
                        kendo.alert(e.dssic_ven.eeEstados[0].Estado);
                    }
                },
                model:{}
            },
            error: function (xhr, error) {
                kendo.alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            },
            change: function (e) {
                //console.log("Change vandedor");
            },
            requestStart: function (e) {
                //                console.log("Request Start servicio vendedor");
            }            
        }
    });
    
    var comboboxDivisa= $("#ipDivisa").data("kendoDropDownList");
    comboboxDivisa.enable(!clienteNacional);
    
    var numericTextBoxTasa= $("#ipTasa").data("kendoNumericTextBox");
    numericTextBoxTasa.enable(!clienteNacional);
    
    var datepickerFechaTasa= $("#ipFechaTasa").data("kendoDatePicker");
    datepickerFechaTasa.enable(!clienteNacional);     
}

function codigoVendedor(e){
    var dataItem = this.dataItem(e.item.index()); 
    sessionStorage.setItem("codVendedor", dataItem.ven__cod);    
}

function guardarFactura(){    
    var usuario = sessionStorage.getItem("usuario");
    var fiid = sessionStorage.getItem("fiid");
    var sucursal = $("#ipSucursal").val();
    var claDocumento = $("#ipCDocumento").val();    
    var condiPagos = $("#ipCdePago").val();
    var fecha = $("#ipFecha").val();
    var fechaVencimeinto = $("#ipFechaVencimiento").val();    
    var divisa = $("#ipDivisa").val();
    var tasa = $("#ipTasa").val();
    var fletes = $("#ipFletes").val();
    var observaciones = $("#txtAObservaciones").val();
    var facturaGuardada = "";    
    var fechaTasa = $("#ipFechaTasa").val();
    var listaPrecios = $("#ipListaPrecios").val();
    var actualizarTasa = $("#ipActualizarTasa")["0"].checked;
    var numFactura = "";
    var msn = "";
    
    var jSonData = new Object();
    jSonData.dsSIRgfc_fac = new Object();
    jSonData.dsSIRgfc_fac.eeDatos = new Array();
    jSonData.dsSIRgfc_fac.eeDatos[0] = new Object();
    jSonData.dsSIRgfc_fac.eeDatos[0].picusrcod = usuario;
    jSonData.dsSIRgfc_fac.eeDatos[0].picfiid = fiid;
    jSonData.dsSIRgfc_fac.eegfc_fac = new Array();
    jSonData.dsSIRgfc_fac.eegfc_fac[0] = new Object();    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].cpto__cod = claDocumento;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].dpc__fec = fechaVencimeinto;    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__est = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__fec = fecha;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].obs__fac = observaciones;    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].lis__num = listaPrecios;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].loc__cod = "1"; // ???
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__cla = divisa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__fec = fechaTasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__val = tasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].mnd__act = actualizarTasa;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].pago__cod = condiPagos;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].suc__cod = sucursal;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ter__nit = sessionStorage.getItem("nitCliente");
    jSonData.dsSIRgfc_fac.eegfc_fac[0].ven__cod = sessionStorage.getItem("codVendedor");    
    jSonData.dsSIRgfc_fac.eegfc_itms = new Array();
    
    var jSonDataGrid = new Object();
    jSonDataGrid = $("#grid").data("kendoGrid").dataSource.data();
    
    $.each(jSonDataGrid, function(i,item){ 
        
        var jSonDetalle = new Object();
        jSonDetalle.cpto__cod = jSonDataGrid[i].conceptoDet.cpto__cod;
        jSonDetalle.art__cod = jSonDataGrid[i].articulo.art__cod;
        jSonDetalle.cla__cod = jSonDataGrid[i].clase.cla__cod;
        jSonDetalle.itms__can = jSonDataGrid[i].Cantidad;        
        jSonDetalle.des__itms = jSonDataGrid[i].Descripcion;
        jSonDetalle.itms__pdt = (jSonDataGrid[i].Descuento)*100;
        jSonDetalle.itms__val = jSonDataGrid[i].ValorTotal;
        jSonDetalle.itms__val__u = jSonDataGrid[i].ValorUnitario;        
        jSonDetalle.lis__num = jSonDataGrid[i].listaPrecios;        
        jSonDetalle.itms__piv = (jSonDataGrid[i].IVA)*100;
        if(jSonDataGrid[i].CodAmortizacion!==""){
            jSonDetalle.pdif__cla = jSonDataGrid[i].CodAmortizacion;
            jSonDetalle.ddif__dias = jSonDataGrid[i].DiasAmortizacion;
            jSonDetalle.doc__fec__ini = jSonDataGrid[i].FechaAmortizacion;
        }
        jSonData.dsSIRgfc_fac.eegfc_itms[i]=jSonDetalle;
    })    
    console.log("jSonData "+JSON.stringify(jSonData));
    
    $.ajax({
        type: "POST",
        data: JSON.stringify(jSonData),
        url: ipServicios+"rest/Comercial/SICUDgfc_fac",
        dataType : "json",
        contentType: "application/json;",
        success: function (resp) {            
            console.log(JSON.stringify(resp));                
            facturaGuardada = JSON.stringify(resp.dsSIRgfc_fac.eeEstados[0].Estado); 
            msn = resp.dsSIRgfc_fac.eeSgfc_fac["0"].desmsg;
            numFactura = resp.dsSIRgfc_fac.eeSgfc_fac["0"].facnro
        },
        error: function (e) {
            console.log(JSON.stringify(e));
            kendo.alert("Error consumiendo el servicio de guardar\n"+ e.status +" - "+ e.statusText);
        }
    }).done(function(){
        if(facturaGuardada=='"OK"'){
            
            var dialog = $('#dialog');
            
            function onClose() {
                undo.fadeIn();
            }
            
            dialog.kendoDialog({
                width: "400px",
                title: "Que desea hacer?",
                closable: false,
                modal: true,
                content: "<p>"+msn+" El número de la factura es: "+numFactura+"</p>"+"<br><p></p>",
                actions: [
                    { text: 'Crear nueva factura', primary: true, action: nuevaFactura },
                    { text: 'Imprimir factura', action: imprimirFac }
                ]                
            });
            console.log("Factura guardada \n" + facturaGuardada);                     
        }else{                    
            kendo.alert("factura con errores  \n"+facturaGuardada);
            console.log("Datos  \n" + cabeceraValida);                
        }
    });
}

function agregarItemDetalle(e){    
    if(sessionStorage.getItem("cabeceraValida")==null || sessionStorage.getItem("cabeceraValida")=="false"){
        validaCabecera();    
    }else{
        var grid = $("#grid").data("kendoGrid");
        grid.addRow();
    }
}
function onDataBoundOpcPago(e){
    var dropdownlist = $("#ipCdePago").data("kendoDropDownList");
    dropdownlist.value(sessionStorage.getItem("opciondepago"));    
    calcularFechaVencimiento (dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].fac__num);    
}
function onDataBoundVendedor(e){
    var dropdownlist = $("#ipVendedor").data("kendoDropDownList");
    dropdownlist.value(sessionStorage.getItem("codVendedor"));         
}

function onChangetfacpag(e){    
    var dataItemfacpag = this.dataItem(e.item.index());        
    var diasCredito = dataItemfacpag.fac__num;
    calcularFechaVencimiento (diasCredito);    
};

function onDataBoundGrid(e){    
    var valor = $("#idValorUnitario").val();
    var iva = $("#idIVA").val();
    var valorTotal = $("#idValorTotal").val();
    var cantidad = $("#ipCantidad").val();
    
    if(e.sender.dataSource._data.length!==0){
        e.sender.dataSource._data[0].Cantidad = cantidad;
        e.sender.dataSource._data[0].IVA = iva;    
        e.sender.dataSource._data[0].ValorTotal = valorTotal;
        e.sender.dataSource._data[0].ValorUnitario= valor;    
    }
    var grid = $("#grid").data("kendoGrid");  
    
}

function nuevaFactura(e){
    
    var dialog = $('#dialog');
    dialog.fadeIn();
    location.reload();
}

function imprimirFac(){
    var dialog = $('#dialog');
    dialog.fadeIn();
    kendo.alert("Próximamente");
    nuevaFactura();
}
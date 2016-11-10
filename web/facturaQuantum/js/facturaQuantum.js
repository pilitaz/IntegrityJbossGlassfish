/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var hoy = new Date(sessionStorage.getItem("fechaSistema"));
hoy.setHours(0,0,0,0);
var tasaDeCambio = "";
var dataGridDetalle=[];
var dataSource={};
ip=sessionStorage.getItem("ip");
puerto=sessionStorage.getItem("puerto");
var itemID = null; 

$(document).ready(function() {
    
    sessionStorage.setItem("cabeceraValida","false");    
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
    
    gridDetalle();
    
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
        
    //carga el combo de sucursales
    $("#ipSucursal").kendoDropDownList({
        optionLabel: "Seleccione la sucursal",
        dataTextField: "suc__nom",
        dataValueField: "suc__cod",
        template:'<div class="divElementDropDownList">#: data.suc__nom #</div>',        
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
                        alertDialogs(e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_suc.eeEstados[0].Estado==="OK"){
                        return e.dssic_suc.eesic_suc;
                    }else{
                        alertDialogs(e.dssic_suc.eeEstados[0].Estado);
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
                        alertDialogs(e.message);
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsgfc_cpto.eeEstados[0].Estado==="OK"){
                        return e.dsgfc_cpto.eegfc_cpto;
                    }else{
                        alertDialogs(e.dsgfc_cpto.eeEstados[0].Estado);
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
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
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
        
        if(fechaTasa.getTime()===hoy.getTime()){
             $("#ipActualizarTasa")[0].disabled=true;
        }else{
             $("#ipActualizarTasa")[0].disabled=false;
        }
        
        $("#ipFechaTasa").kendoDatePicker({        
            format: "yyyy/MM/dd",
            disableDates: ["sa", "su"],
            value: new Date(fechaTasa)
        });
        
        
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
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_mnd.eeEstados[0].Estado==="OK"){
                        return e.dssic_mnd.eesic_mnd;
                    }else{
                        alertDialogs("Problemas con el servicio: "+e.dssic_mnd.eeEstados[0].Estado);
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
}
function gridDetalle(){  
        
    var grid = $("#grid").kendoGrid({
        dataSource: dataGridDetalle,
        navigatable: true,
        batch: false,
        pageable: true,
        selectable: "row",
        height: 400,     
        columns: [
            {
                field: "ConceptoDet",
                title: "Concepto",
            },
            {
                field: "ClaseArticulo",
                title: "Clase de articulo"
            },
            {
                field: "Articulo",
                title: "Articulo"
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
                title: "Descuento"
            },
            {
                field: "IVA",
                title: "IVA"
            },
            {
                field: "ValorUnitario",
                title: "Valor unitario",
                format: "{0:c}"
            },
            {
                field: "ValorTotal",
                title: "Valor total",
                format: "{0:c}"
            },
            {
                field: "codAmortizacion",
                title: "Código de amortizacion",
                hidden:true
            },
            {
                field: "DiasAmortizacion",
                title: "Días de amortización",                
                hidden:true
                
            },
            {
                field: "FechaAmortizacion",
                title: "Fecha de amortización",
                hidden:true,
                template: '#= kendo.toString(FechaAmortizacion, "yyyy/MM/dd" ) #'
            },
            { command: [
                    {name: "editar", click: editarItem, template: "<a class='k-grid-editar'><span class='k-sprite po_editoff'></span></a>"},
                    {name: "eliminar", click: eliminarItem, template: "<a class='k-grid-eliminar'><span class='k-sprite po_cerrar'></span></a>"}
                ] 
                }],
        editable: {
            mode: "popup",
            window: {
                title: "Editar",
                animation: false,
                width: "700px"
            }            
        },
        cancel: function (e) {            
            e._defaultPrevented = true;
            $('#grid').data('kendoGrid').refresh();
        }
    }).data("kendoGrid");
    
    function eliminarItem(e){ 
        e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
        
        var grid = $("#grid").data("kendoGrid");
        var itemID = grid.dataItem(grid.select());
        
        for (var i=0; i<dataGridDetalle.length; i++){
            if(dataGridDetalle[i].ID===itemID.ID){
                dataGridDetalle.splice(i, 1);
            }
        }
        gridDetalle();
    }
    
    function editarItem(e){
        
        e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
        //itemID = this.dataItem($(e.currentTarget).closest("tr"));
        var grid = $("#grid").data("kendoGrid");
        itemID = grid.dataItem(grid.select());
        
        var widthPopUp = $("body").width();
        widthPopUp = widthPopUp * (60/100);
        var heightPopUp = $("body").height();
        heightPopUp = heightPopUp * (80/100);
        
        $("body").append("<div id='windowItemEdit'></div>");
        var myWindow = $("#windowItemEdit");        
        var undo = $("#undo");
        
        function onCloseWindowItemFacEdit() {
            
            document.getElementById("windowItemEdit").remove();            
            undo.fadeIn();  
        }
        
        myWindow.kendoWindow({
            width: widthPopUp,
            height: heightPopUp,
            title: "Editar",
            content: sessionStorage.getItem("url")+ "/facturaQuantum/html/popupItemFactura.html",
            visible: false,
            modal: true,
            actions: [            
                "Close"
            ],
            close: onCloseWindowItemFacEdit
        }).data("kendoWindow").center().open();
    }
    
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
    var listaPrecios = sessionStorage.getItem("listaPrecioCliente");
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
            alertDialogs("Error consumiendo el servicio de validar cabecera\n"+ e.status +" - "+ e.statusText);
        }
    }).done(function(){
        if(cabeceraValida=='"OK"'){
            sessionStorage.setItem("cabeceraValida","true");
            agregarItemDetalle();            
            console.log("Cabecera valida \n" + cabeceraValida);                     
        }else{
            sessionStorage.setItem("cabeceraValida","false");
            alertDialogs("Cabecera invalida"+cabeceraValida);
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
        $("#ipActualizarTasa")[0].disabled=false;
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
                        alertDialogs("Error 825"+e.message)
                    }
                },
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dsfac_pag.eeEstados[0].Estado==="OK"){
                        return e.dsfac_pag.eefac_pag;
                    }else{
                        alertDialogs(e.dsfac_pag.eeEstados[0].Estado);
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
                    type: "POST"
                },
                parameterMap: function (options, operation) { // authdsgfc_cli JSon que se envia al cliente
                    try{
                        if($("#ipSucursal").val()==""){
                            alertDialogs("Debe seleccionar primero la sucursal");                       
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
                        alertDialogs(e.message)
                    }                
                    
                }
            },
            schema: {
                data: function (e){                    
                    if(e.dssic_ven.eeEstados[0].Estado==="OK"){
                        return e.dssic_ven.eesic_ven1;
                    }else{
                        alertDialogs(e.dssic_ven.eeEstados[0].Estado);
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
    
    var comboboxDivisa= $("#ipDivisa").data("kendoDropDownList");
    comboboxDivisa.enable(!clienteNacional);
    
    var numericTextBoxTasa= $("#ipTasa").data("kendoNumericTextBox");
    numericTextBoxTasa.enable(!clienteNacional);
    
    var datepickerFechaTasa= $("#ipFechaTasa").data("kendoDatePicker");
    datepickerFechaTasa.enable(!clienteNacional);
    
    $("#ipActualizarTasa")[0].disabled = clienteNacional;
}

function codigoVendedor(e){
    var dataItem = this.dataItem(e.item.index()); 
    sessionStorage.setItem("codVendedor", dataItem.ven__cod);    
}

function guardarFactura(){    
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
    var facturaGuardada = "";    
    var fechaTasa = $("#ipFechaTasa").val();
    var listaPrecios = sessionStorage.getItem("listaPrecioCliente");
    var actualizarTasa = $("#ipActualizarTasa")["0"].checked;
    var numFactura = "";
    var msn = "";
    
    var jSonData = new Object();
    jSonData.dsSIRgfc_fac = new Object();
    jSonData.dsSIRgfc_fac.eeDatos = new Array();
    jSonData.dsSIRgfc_fac.eeDatos[0] = new Object();
    jSonData.dsSIRgfc_fac.eeDatos[0].picusrcod = usuario;
    jSonData.dsSIRgfc_fac.eeDatos[0].fiid = fiid;
    jSonData.dsSIRgfc_fac.eegfc_fac = new Array();
    jSonData.dsSIRgfc_fac.eegfc_fac[0] = new Object();    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].cpto__cod = claDocumento;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__fec = fecha;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].fac__fec__venc = fechaVencimeinto;    
    jSonData.dsSIRgfc_fac.eegfc_fac[0].obs__fac = observaciones;
    jSonData.dsSIRgfc_fac.eegfc_fac[0].lis__num = listaPrecios;
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
    jSonDataGrid = dataGridDetalle;
    
    $.each(jSonDataGrid, function(i,item){ 
        
        var jSonDetalle = new Object();
        jSonDetalle.cpto__cod = jSonDataGrid[i].CodConceptoDet;
        jSonDetalle.art__cod = jSonDataGrid[i].ArticuloId;
        jSonDetalle.cla__cod = jSonDataGrid[i].CodClaseArticulo;
        jSonDetalle.itms__can = jSonDataGrid[i].Cantidad;        
        jSonDetalle.des__itms = jSonDataGrid[i].Descripcion;
        jSonDetalle.itms__pdt = (jSonDataGrid[i].Descuento)*100;
        jSonDetalle.itms__val__u = jSonDataGrid[i].ValorUnitario; 
        jSonDetalle.lis__num = listaPrecios; 
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
            if(facturaGuardada=='"OK"'){
                msn = resp.dsSIRgfc_fac.eeSgfc_fac["0"].desmsg;
                numFactura = resp.dsSIRgfc_fac.eeSgfc_fac["0"].facnro
            }
        },
        error: function (e) {
            console.log(JSON.stringify(e));
            alertDialogs("Error consumiendo el servicio de guardar\n"+ e.status +" - "+ e.statusText);
        }
    }).done(function(){
        if(facturaGuardada=='"OK"'){
            var actions = new Array();
            actions[0] = new Object();
            actions[0].text = "Crear nueva factura";
            actions[0].primary = "true";
            actions[0].action = nuevaFactura;
//            actions[1] = new Object();
//            actions[1].text = "Imprimir factura";            
//            actions[1].action = "imprimirFac";     
            
            createDialog("Que desea hacer?", msn+" El número de la factura es: "+numFactura, "400px", "auto", true, false, actions);
            console.log("Factura guardada \n" + facturaGuardada);                     
        }else{                    
            alertDialogs("factura con errores  \n"+facturaGuardada);
            console.log("Datos  \n" + facturaGuardada);                
        }
    });
}

function agregarItemDetalle(e){
    itemID=null;
    
    if(sessionStorage.getItem("cabeceraValida")==null || sessionStorage.getItem("cabeceraValida")=="false"){
        validaCabecera();    
    }else{    
    
        var widthPopUp = $("body").width();
        widthPopUp = widthPopUp * (60/100);
        var heightPopUp = $("body").height();
        heightPopUp = heightPopUp * (80/100);
        
        $("body").append("<div id='windowItemFac'></div>");
        var myWindow = $("#windowItemFac");
        var undo = $("#undo");
        
        function onCloseWindowItemFac() {
            document.getElementById("windowItemFac").remove();            
            undo.fadeIn();  
        }
        
        myWindow.kendoWindow({
            width: widthPopUp,
            height: heightPopUp,
            title: "Agregar",
            content: sessionStorage.getItem("url")+ "/facturaQuantum/html/popupItemFactura.html",
            visible: false,
            modal: true,
            actions: [            
                "Close"
            ],
            close: onCloseWindowItemFac
        }).data("kendoWindow").center().open();
    }
}

function closePopUp(){    
    $("#windowItemFac").data("kendoWindow").close();
}

function closePopUpEditar(){    
    $("#windowItemEdit").data("kendoWindow").close();
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

function nuevaFactura(e){ 
    var dialog = $('#dialog');
    dialog.fadeIn();    
    location.reload();
}

function imprimirFac(){
    var dialog = $('#dialog');
    dialog.fadeIn();
    alertDialogs("Próximamente");
    nuevaFactura();
}
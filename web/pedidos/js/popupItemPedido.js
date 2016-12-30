/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var objArticulo= new Object();

$(document).ready(function() {
    $("#btAgregar").kendoButton({
    });
    
    $("#btCancelar").kendoButton({
    });
    
    var objClasesDeArticulos = new sirConsultaClasesDeArticulos();
    var jsonClasesDeArticulos = objClasesDeArticulos.getjson();
    var urlClasesDeArticulos = objClasesDeArticulos.getUrlSir();
    var mapDataClasesDeArticulos = objClasesDeArticulos.getMapData();
        
    $("#idClaseArticulo").kendoDropDownList({
        dataTextField: 'cla__des',
        dataValueField: 'cla__cod',
        optionLabel: "Seleccionar clase de articulo...",
        template:'<div class="divElementDropDownList">#: data.cla__des #</div>',                  
        change: onChangeClase,
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: urlClasesDeArticulos,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {                        
                        if (operation === 'read') {
                            var key1 = Object.keys(jsonClasesDeArticulos)[0];
                            var key2 = Object.keys(jsonClasesDeArticulos[key1])[1];
                            jsonClasesDeArticulos[key1][key2][0].picsuc_cod = JSON.parse(sessionStorage.getItem("regPedidos")).ped__num;
                            return JSON.stringify(jsonClasesDeArticulos);
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
                        return e[key1][mapDataClasesDeArticulos];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
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
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }			
    });
    
    var objArticulos = new sirConsultaArticulos();
    var jsonArticulos = objArticulos.getjson();
    var urlArticulos = objArticulos.getUrlSir();
    var mapDataArticulos = objArticulos.getMapData();
     
    
    $("#idArticulo").kendoAutoComplete({
        dataTextField: 'art__des',
        optionLabel: "Seleccionar articulo...",
        minLength: 3,
        filter: "contains",
        template:'<div class="divElementDropDownList">#: data.art__des #</div>',
        select: onChangeArticulo,
        dataBound: onDataBoundArticulo,
        dataSource: {
            type: "json",
            transport: {
                read: {
                    url: urlArticulos,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {                  
                    try {
                        if (operation === 'read') {
                            var key1 = Object.keys(jsonArticulos)[0];
                            var key2 = Object.keys(jsonArticulos[key1])[1];
                            jsonArticulos[key1][key2][0].piicla_cod = $("#idClaseArticulo").val();
                            jsonArticulos[key1][key2][0].piilis_num = sessionStorage.getItem("listaPrecioCliente");//lista del cliente        
                            jsonArticulos[key1][key2][0].picart_des = $("#idArticulo").val();
                            return JSON.stringify(jsonArticulos);                                                           
                        }	
                    } catch (e) {
                        alertDialogs("Error" +e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){                         
                    var key1 = Object.keys(e)[0];
                    if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                        return e[key1][mapDataArticulos];
                    } else {
                        alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                    }
                },
                model: {
                    id: "art__cod",
                    fields: {
                        art__cod: {validation: {required: true}, type: 'string'},
                        art__des: {validation: {required: true}, type: 'string'},
                        art__iva: {type: 'number'}
                    }
                }
            },
            error: function (xhr, error) {
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }   
        }
    });
    
    $("#ipCantidad").kendoNumericTextBox({                
        format: "n0",            
        min: 1,
        value: 1,
        change: setValorTotal,        
        spin: setValorTotal
        
    });
    
    $("#idDescuento").kendoNumericTextBox({
        format: "p0",
        step: 0.01,
        min:0,
        value: 0,
        change: setValorTotal,        
        spin: setValorTotal
    });
    
    $("#idIVA").kendoNumericTextBox({
        format: "p0",
        step: 0.01,
        change: setValorTotal,        
        spin: setValorTotal
    });
    
    $("#idValorUnitario").kendoNumericTextBox({        
        format: "c2",
        change: setValorTotal,
        spin: setValorTotal
    });
    
    $("#idValorTotal").kendoNumericTextBox({
        format: "c2"                
    });
    
    $("#idCodigoAmortizacion").kendoDropDownList({
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
                        alertDialogs(e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){
                    if(e.dssic_pdif.eeEstados[0].Estado==="OK"){                            
                        return e.dssic_pdif.eesic_pdif;
                    }else{
                        alertDialogs(e.dssic_pdif.eeEstados[0].Estado);
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
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }			
    });
        
    $("#ipDiasAmortizacion").kendoNumericTextBox({        
        format: "n0",            
        min: 0
    });
    
    $("#ipFechaAmortizacion").kendoDatePicker({
        format: "{0:yyyy/MM/dd}",
        value: new Date(parent.hoy)
    });
    
    function onChangeConceptoDet(e){
        
        
        var codAmortizacion= e.sender.dataSource._data[e.sender.selectedIndex-1].tcon_dif;
        var dropdownlist = $("#idCodigoAmortizacion").data("kendoDropDownList");
        var numericTextBoxTasa= $("#ipDiasAmortizacion").data("kendoNumericTextBox");
        var datepickerFechaTasa= $("#ipFechaAmortizacion").data("kendoDatePicker");        
        
        dropdownlist.enable(codAmortizacion);
        numericTextBoxTasa.enable(codAmortizacion);            
        datepickerFechaTasa.enable(codAmortizacion);
        
    }
    
    function onChangeClase(e){
        $("#idArticulo").parent().removeClass(".k-input");    
        $("#idArticulo").data("kendoAutoComplete").value('');
    }
    
    function onChangeArticulo(e){
        var item= e.dataItem;
        objArticulo = item;
        setIVA(item);
        setValorArticulo(item);       
    }
    
    function setIVA(item){        
        var iva= item.art__iva;
        var numerictextbox = $("#idIVA").data("kendoNumericTextBox");    
        numerictextbox.value(iva/100);    
        numerictextbox.readonly();
        
    }
    
    function setValorArticulo(item){
        
        var valor = 0;    
        valor = item.art__val;        
        var numerictextbox = $("#idValorUnitario").data("kendoNumericTextBox");
        numerictextbox.value(valor);
        numerictextbox.readonly();
        setValorTotal();
    }
    
    function setValorTotal(){
        
        var iva = $("#idIVA").val();
        if(iva>=1){
           iva=iva/100;
           var numerictextbox = $("#idIVA").data("kendoNumericTextBox");    
           numerictextbox.value(iva);          
        }
        var descuento = $("#idDescuento").val();
        var numerictextbox = $("#idDescuento").data("kendoNumericTextBox");
        numerictextbox.readonly();
        if(descuento>=1){            
            descuento=descuento/100;                
            numerictextbox.value(descuento);            
        }
        var cantidad = $("#ipCantidad").val();
        var valor = $("#idValorUnitario").val();        
        valor = (valor * (parseFloat(1)-parseFloat(descuento)));
        var total = parseFloat(cantidad) * (parseFloat(valor) * (parseFloat(1)+parseFloat(iva))); //idValorTotal
        
        var numerictextbox = $("#idValorTotal").data("kendoNumericTextBox");
        numerictextbox.value(total);
        numerictextbox.readonly();
    }
    
//    if(parent.itemID !== null){        
//        console.log("Cargando edicón item: "+parent.itemID.ID);
//        $("#btAgregar")["0"].attributes[2].nodeValue = "agregarItem()";
//        $("#btAgregar")["0"].textContent= "Actualizar";                
//        $("#btCancelar")["0"].attributes[2].nodeValue = "btnCancelarEditar()";
//        setInformacionItem();
//    }
});



function agregarItem(){   
    
    var pedido = JSON.parse(sessionStorage.getItem("regPedidos"))
    
    var dropdownlist = $("#idClaseArticulo").data("kendoDropDownList");    
    var codClaseArticulo = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cla__cod;
    var claseArticulo = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cla__des;
    
    
    var codArticulo = objArticulo.art__cod;
    var nombreArticulo = objArticulo.art__des;    
    var cantidad = $("#ipCantidad").val();
    var descuento = $("#idDescuento").val()*100;
    var iva = $("#idIVA").val()*100;
    var valorUnitario = $("#idValorUnitario").val();
    var valorTotal = $("#idValorTotal").val();
    
    var itemGuardado;
    
    var verboHTML= "POST";
    
//    if(parent.itemID !== null){
//       verboHTML="PUT" ;
//    }

    var objDetalePed = new SICUDDetallePedido();
    var jsonDetalePed = objDetalePed.getjson();
    var urlDetalePed = objDetalePed.getUrlSir();
    var mapDataDetalePed = objDetalePed.getMapData();
    
    var key1 = Object.keys(jsonDetalePed)[0];
    var key2 = Object.keys(jsonDetalePed[key1])[1];
    debugger
    jsonDetalePed[key1][key2][0].suc__cod = pedido.suc__cod;
    jsonDetalePed[key1][key2][0].clc__cod = codClaseArticulo;
    jsonDetalePed[key1][key2][0].ped__fec = pedido.ped__fec;//lista del cliente        
    jsonDetalePed[key1][key2][0].ped__num = pedido.ped__num;
    jsonDetalePed[key1][key2][0].lis__num = sessionStorage.getItem("listaPrecioCliente");
    jsonDetalePed[key1][key2][0].cla__cod = codClaseArticulo;//lista del cliente        
    jsonDetalePed[key1][key2][0].art__cod = codArticulo;    
    //jsonDetalePed[key1][key2][0].pre__pcod = sessionStorage.getItem("listaPrecioCliente");//lista del cliente        
    jsonDetalePed[key1][key2][0].ped__can = cantidad;
    jsonDetalePed[key1][key2][0].lpd__pre = valorUnitario;
    jsonDetalePed[key1][key2][0].ped__dct = descuento;   
    jsonDetalePed[key1][key2][0].ped__iva = iva;
    
    $.ajax({
        type: verboHTML,
        data: JSON.stringify(jsonDetalePed),
        url: urlDetalePed,
        dataType : "json",
        contentType: "application/json;",
        success: function (e) {
            if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                itemGuardado = e[key1].eeEstados[0].Estado;
            } else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            }
//            itemGuardado = resp.dsSIRgfc_fac.eeEstados[0].Estado;                        
        },
        error: function (e) {            
            alertDialogs("Error consumiendo el servicio de guardar\n"+ e.status +" - "+ e.statusText);
        }
    }).done(function(e){
        if(itemGuardado=="OK"){
            
            var key1 = Object.keys(jsonDetalePed)[0];
            var key2 = Object.keys(jsonDetalePed[key1])[1]; 
            var pedido = e[key1][key2][0]; 
            
            var objFiltroPedidos = new sirConsultaPedidos();
            var jsonFiltroPedidos = objFiltroPedidos.getjson();
            var urlFiltroPedidos = objFiltroPedidos.getUrlSir();
            var mapDataFiltroPedidos = objFiltroPedidos.getMapData();
            
            var key1 = Object.keys(jsonFiltroPedidos)[0];
            var key2 = Object.keys(jsonFiltroPedidos[key1])[1];
            jsonFiltroPedidos[key1][key2][0].pidped_fec = pedido.ped__fec;
            jsonFiltroPedidos[key1][key2][0].piiped_num = pedido.ped__num;
            jsonFiltroPedidos[key1][key2][0].picsuc_cod = pedido.suc__cod;
            console.log(JSON.stringify(jsonFiltroPedidos));
            try{                
                $.ajax({
                    type: "POST",
                    data: JSON.stringify(jsonFiltroPedidos),
                    url: urlFiltroPedidos,
                    dataType : "json",
                    contentType: "application/json;",
                    success: function (e) {                        
                        if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                            return e[key1][mapDataFiltroPedidos];
                        } else {
                            alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
                        }
                    },
                    error: function (e) {
                        alertDialogs(" Error al consumir el servicio 733"+ e.status +" - "+ e.statusText);                
                    }
                }).done(function(e){
                    var pedido = e[key1][mapDataFiltroPedidos][0];
                    sessionStorage.setItem("regPedidos", JSON.stringify(pedido));                                         
                    parent.closePopUpCabecera();
                });
            }catch (e) {
                alertDialogs("Function: consumeServAjaxSIR Error: 740 " + e.message);
            }
            parent.closePopUp();
        }else{                    
            alertDialogs("factura con errores  \n"+itemGuardado);
            console.log("Datos  \n" + itemGuardado);                
        }
    });
    
}

function setInformacionItem(){
    
    var kendoDropDownListConcepto = $("#ipConceptoDet").data("kendoDropDownList");    
    kendoDropDownListConcepto.value(parent.itemID.CodConceptoDet);
        
    var kendoDropDownListClaseArticulo = $("#idClaseArticulo").data("kendoDropDownList");    
    kendoDropDownListClaseArticulo.value(parent.itemID.CodClaseArticulo);
    
    $("#idArticulo").parent().removeClass(".k-input");
    $("#idArticulo").val(parent.itemID.Articulo);
    
    $("#idDescripcion").val(parent.itemID.Descripcion);

    var numerictextboxCantidad = $("#ipCantidad").data("kendoNumericTextBox");    
    numerictextboxCantidad.value(parent.itemID.Cantidad);
    
    var numerictextboxDescuento = $("#idDescuento").data("kendoNumericTextBox");    
    numerictextboxDescuento.value(parent.itemID.Descuento);
    
    var numerictextboxIVA = $("#idIVA").data("kendoNumericTextBox");    
    numerictextboxIVA.value(parent.itemID.IVA);
    
    var numerictextboxValorUnitario = $("#idValorUnitario").data("kendoNumericTextBox");    
    numerictextboxValorUnitario.value(parent.itemID.ValorUnitario);
    
    var numerictextboxValorTotal = $("#idValorTotal").data("kendoNumericTextBox");    
    numerictextboxValorTotal.value(parent.itemID.ValorTotal);
    
    var kendoDropDownListClaseArticulo = $("#idCodigoAmortizacion").data("kendoDropDownList");    
    kendoDropDownListClaseArticulo.value(parent.itemID.CodAmortizacion);
    
    var numerictextboxValorTotal = $("#ipDiasAmortizacion").data("kendoNumericTextBox");    
    numerictextboxValorTotal.value(parent.itemID.DiasAmortizacion);
    
    $("#ipFechaVencimiento").kendoDatePicker({        
	format: "yyyy/MM/dd",
	disableDates: ["sa", "su"],
	value: new Date(parent.itemID.FechaAmortizacion)        
    }); 
    
//    idItem = parent.itemID.ID;
//    objArticulo.art__cod = parent.itemID.ArticuloId;
//    objArticulo.art__des = parent.itemID.Articulo;    
    //parent.itemID=null;
}

function btnCancelar(){
    parent.closePopUp();
}

function btnCancelarEditar(){
    parent.closePopUpEditar();
}

function onDataBoundArticulo(){    
    $("#idArticulo").data("kendoAutoComplete");
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var idItem=0;
var objArticulo= new Object();

$(document).ready(function() {
    $("#btAgregar").kendoButton({
    });
    
    $("#btCancelar").kendoButton({
    });
    
    $("#ipConceptoDet").kendoDropDownList({
        optionLabel: "Seleccione el tipo de documento",
        dataTextField: "cpto__des",
        dataValueField: "cpto__cod",      
        template:'<div class="divElementDropDownList">#: data.cpto__des #</div>',
        change: onChangeConceptoDet,
        dataBound: onChangeConceptoDet,
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
                    url: ipServicios+"rest/Parameters/SIRinv_cla",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    try {
                        authdsinv_cla.dsinv_cla.eetemp[0].picsuc_cod = parent.$("#ipSucursal").val();                        
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
                data:function (e){
                    if(e.dsinv_cla.eeEstados[0].Estado==="OK"){                            
                        return e.dsinv_cla.eeinv_cla;
                    }else{
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
                alertDialogs("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
            }
        }			
    });
    
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
                    url: ipServicios+"rest/Parameters/SIRinv_art",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST"
                },
                parameterMap: function (options, operation) {
                    authdsinv_art.dsinv_art.eetemp[0].piicla_cod = $("#idClaseArticulo").val();
                    authdsinv_art.dsinv_art.eetemp[0].piilis_num = sessionStorage.getItem("listaPrecioCliente");//lista del cliente        
                    authdsinv_art.dsinv_art.eetemp[0].picart_des = $("#idArticulo").val();
                    console.log("authdsinv_art"+JSON.stringify(authdsinv_art));
                    try {
                        if (operation === 'read') {
                            authdsinv_art["eeinv_art"] = [options];                                  
                            return JSON.stringify(authdsinv_art);                                
                        }	
                    } catch (e) {
                        alertDialogs("Error" +e.message);
                    }
                }
            },
            schema: {
                type: "json",
                data:function (e){                         
                    if(e.dsinv_art.eeEstados[0].Estado==="OK"){
                        //                            console.log("authdsinv_art "+JSON.stringify(authdsinv_art));
                        return e.dsinv_art.eeinv_art;
                    }else{
                        alertDialogs("Error: " +e.dsinv_art.eeEstados[0].Estado);
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
        if(descuento>=1){            
            descuento=descuento/100;
            var numerictextbox = $("#idDescuento").data("kendoNumericTextBox");    
            numerictextbox.value(descuento);            
        }
        var cantidad = $("#ipCantidad").val();
        var valor = $("#idValorUnitario").val();        
        valor = (valor * (parseFloat(1)-parseFloat(descuento)));
        var total = parseFloat(cantidad) * (parseFloat(valor) * (parseFloat(1)+parseFloat(iva))); //idValorTotal
        
        var numerictextbox = $("#idValorTotal").data("kendoNumericTextBox");
        numerictextbox.value(total);
    }
    
    if(parent.itemID !== null){        
        console.log("Cargando edicón item: "+parent.itemID.ID);
        $("#btAgregar")["0"].attributes[2].nodeValue = "actualizarItem()";
        $("#btAgregar")["0"].textContent= "Actualizar";                
        $("#btCancelar")["0"].attributes[2].nodeValue = "btnCancelarEditar()";
        setInformacionItem();
    }
});



function agregarItem(){
    
    var id=0;
    
    var dropdownlist = $("#ipConceptoDet").data("kendoDropDownList");
    var codConceptoDet = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cpto__cod;
    var conceptoDet = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cpto__des;
    
    var dropdownlist = $("#idClaseArticulo").data("kendoDropDownList");    
    var codClaseArticulo = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cla__cod;
    var claseArticulo = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cla__des;
    
    
    var codArticulo = objArticulo.art__cod;
    var nombreArticulo = objArticulo.art__des;
    var descripcion = $("#idDescripcion").val();
    var cantidad = $("#ipCantidad").val();
    var descuento = $("#idDescuento").val();;
    var iva = $("#idIVA").val();;
    var valorUnitario = $("#idValorUnitario").val();
    var valorTotal = $("#idValorTotal").val();
    var codAmortizacion = $("#idCodigoAmortizacion").val();
    var diasAmortizacion = $("#ipDiasAmortizacion").val();
    var fechaAmortizacion = $("#ipFechaAmortizacion").val();

    if(parent.dataGridDetalle && parent.dataGridDetalle.length===0){
        id=1;
    }else{
       for(var i = 0; i<parent.dataGridDetalle.length; i++ ) {
           id=parent.dataGridDetalle[i].ID+1;
       }
    }    
    var obj = {
        ID: id,
        CodConceptoDet:codConceptoDet,
        ConceptoDet: conceptoDet,
        CodClaseArticulo: codClaseArticulo,
        ClaseArticulo: claseArticulo,
        Articulo: nombreArticulo,
        ArticuloId: codArticulo,
        Descripcion: descripcion,
        Cantidad: parseInt(cantidad),                    
        Descuento: descuento,
        IVA: iva,
        ValorUnitario: valorUnitario,
        ValorTotal: valorTotal,
        CodAmortizacion: codAmortizacion,
        DiasAmortizacion: diasAmortizacion,
        FechaAmortizacion: fechaAmortizacion            
    };

    parent.dataGridDetalle.push(obj);
    parent.gridDetalle();   
    parent.closePopUp();
    
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
    
    idItem = parent.itemID.ID;
    objArticulo.art__cod = parent.itemID.ArticuloId;
    objArticulo.art__des = parent.itemID.Articulo;    
    parent.itemID=null;
}

function actualizarItem(){
    
    var dropdownlist = $("#ipConceptoDet").data("kendoDropDownList");
    
    var codConceptoDet = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cpto__cod;
    var conceptoDet = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cpto__des;
    
    var dropdownlist = $("#idClaseArticulo").data("kendoDropDownList");    
    var codClaseArticulo = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cla__cod;
    var claseArticulo = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cla__des;
    
    
    var codArticulo = objArticulo.art__cod;
    var nombreArticulo = objArticulo.art__des;
    var descripcion = $("#idDescripcion").val();
    var cantidad = $("#ipCantidad").val();
    var descuento = $("#idDescuento").val();;
    var iva = $("#idIVA").val();;
    var valorUnitario = $("#idValorUnitario").val();
    var valorTotal = $("#idValorTotal").val();
    var codAmortizacion = $("#idCodigoAmortizacion").val();
    var diasAmortizacion = $("#ipDiasAmortizacion").val();
    var fechaAmortizacion = $("#ipFechaAmortizacion").val();
    
    var obj = {
        ID: idItem,
        CodConceptoDet:codConceptoDet,
        ConceptoDet: conceptoDet,
        CodClaseArticulo: codClaseArticulo,
        ClaseArticulo: claseArticulo,
        Articulo: nombreArticulo,
        ArticuloId: codArticulo,
        Descripcion: descripcion,
        Cantidad: parseInt(cantidad),                    
        Descuento: descuento,
        IVA: iva,
        ValorUnitario: valorUnitario,
        ValorTotal: valorTotal,
        CodAmortizacion: codAmortizacion,
        DiasAmortizacion: diasAmortizacion,
        FechaAmortizacion: fechaAmortizacion            
    };
    
    
    for(var i = 0; i<parent.dataGridDetalle.length; i++ ) {        
        if(idItem===parent.dataGridDetalle[i].ID){        
            parent.dataGridDetalle.splice(i,1,obj);
        }
    }    
    parent.gridDetalle();
    parent.closePopUpEditar();
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
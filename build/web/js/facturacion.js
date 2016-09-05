/* 
	* To change this license header, choose License Headers in Project Properties.
	* To change this template file, choose Tools | Templates
	* and open the template in the editor.
*/

var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1; //hoy es 0!
var yyyy = hoy.getFullYear();
hoy = yyyy+'/'+ mm+'/'+dd;
var facpag = "";

sessionStorage.setItem("usuario", "amonserrate");
sessionStorage.setItem("fiid", "4330416117457397760");

var auth = {  
	"dssic_suc":{  
		"eeDatos":[  
			{  
				"picusrcod":"amonserrate",
				"fiid":"4330416117457397760"
			}
		]
	}
};

var authfacpag = {  
	"dsfac_pag":{  
		"eeDatos":[  
			{  
				"picusrcod":"amonserrate",
				"fiid":"4330416117457397760"
			}
		]
	}
};

var authsic_clc = {  
	"dssic_clc":{  
		"eeDatos":[  
			{  
				"picusrcod":"amonserrate",
				"fiid":"4330416117457397760"
			}
		]
	}
};
var kendoComboBoxSucursal, kendoComboBoxClaseDocumento, kendoComboBoxFormasPago, kendoComboBoxDivisa;

$(document).ready(function() {
	
	function onSelect(e){
		var dataItem = this.dataItem(e.item.index());
		alert(dataItem.suc__cod);
	};	
	
	//carga el combo de sucursales
	$("#ipSucursal").kendoComboBox({
		dataTextField: "suc__nom",
		dataValueField: "suc__cod",
		suggest: true,
		index: 3,
		select: onSelect,
		dataSource: {
			transport: {
				read: {
					url: "http://190.144.16.114:8810/rest/Parameters/SirSucursalagencia",
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
						suc__cod: {validation: {required: true}, type: 'number'},
						suc__nom: {validation: {required: true}, type: 'string'}
					}
				}
			},
			error: function (xhr, error) {
				alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
			},
		}
		
	});
	
	//carga las condiciones de pago
	function onSelectfacpag(e){
		var dataItemfacpag = this.dataItem(e.item.index());
		alert(dataItemfacpag.fac__num);
		facpag = dataItemfacpag.fac__num;
	};
	
	$("#ipCdePago").kendoComboBox({
		dataTextField: "pag__des",
		dataValueField: "fac__pag",
		suggest: true,
		index: 3,
		select: onSelectfacpag,
		dataSource: {
			transport: {
				read: {
					url: "http://190.144.16.114:8810/rest/Parameters/Sirfac_pag",
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
						alert(e.message)
					}
				},
			},
			schema: {
				type: "json",
				data:function (e){
					if(e.dsfac_pag.eeEstados[0].Estado==="OK"){
						return e.dsfac_pag.eefac_pag;
						}else{
						alert(e.dsfac_pag.eeEstados[0].Estado);
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
				alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
			},
		}
		
	});
	
	//carga las clases de documentos
	function onSelectsic_clc(e){
		var dataItemsic_clc = this.dataItem(e.item.index());
		alert(dataItemsic_clc.clc__cod);
	};
	
	$("#ipCDocumento").kendoComboBox({
		dataTextField: "clc__nom",
		dataValueField: "clc__cod",
		suggest: true,
		index: 3,
		select: onSelectsic_clc,
		dataSource: {
			transport: {
				read: {
					url: "http://190.144.16.114:8810/rest/Parameters/Sirsic_clc",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					type: "POST"
				},
				parameterMap: function (options, operation) {
					try {
						if (operation === 'read') {
							authsic_clc["eesic_clc"] = [options];
							return JSON.stringify(authsic_clc);
						}	
						} catch (e) {
						alert(e.message)
					}
				},
			},
			schema: {
				type: "json",
				data:function (e){
					if(e.dssic_clc.eeEstados[0].Estado==="OK"){
						return e.dssic_clc.eesic_clc;
						}else{
						alert(e.dssic_clc.eeEstados[0].Estado);
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
				alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
			},
		}
		
	});
	
	debugger
    var roleViewModel = kendo.observable({
        categories: new kendo.data.DataSource({			
			transport: {
				read: {
					url: "http://190.144.16.114:8810/rest/Parameters/Sirfac_pag",
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
						alert(e.message)
					}
				},
			},
			schema: {
				type: "json",
				data:function (e){
					if(e.dsfac_pag.eeEstados[0].Estado==="OK"){
						return e.dsfac_pag.eefac_pag;
						}else{
						alert(e.dsfac_pag.eeEstados[0].Estado);
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
				alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
			}	
		}),        
		categoryEditor: function(container, options) {
			$('<input data-bind="value: ' + options.field + '" />')
			.appendTo(container) 
			.kendoComboBox({
				dataSource: roleViewModel.categories,
				dataTextField: 'pag__des',
				dataValueField: 'fac__pag'
			});
		}
	});
	
	$("#ipFecha").kendoDatePicker({
		format: "yyyy/MM/dd",
		value: new Date(hoy),
		disableDates: ["sa", "su"]
	});    
	$("#ipFechaVencimiento").kendoDatePicker({
		format: "yyyy/MM/dd",        
		value: new Date(hoy),
		disableDates: ["sa", "su"]
	});
	
	var clientes= [
		//        {"id": "1", "nit": "000458324", "cliente" : "ABC Ltda"},
		//        {"id": "2", "nit": "000458325", "cliente" : "Pelaez Hermanos S.A."},
		//        {"id": "3", "nit": "000458326", "cliente" : "Comercial papelera S.A"}
	];
	
	// cargarParametros();
	
	$("#ipCliente").kendoAutoComplete({
		dataSource: clientes,
		filter: "contains",
		minLength: 3,
		placeholder: "Selecione un cliente...",
		dataBound: listaClientes
		//        dataSource: {
		//            type: "odata",
		//            serverFiltering: true,
		//            transport: {
		//                read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
		//            }
		//        }
	});
	
	$("#validacion").kendoButton({
	});    
	function nana(container, options) {
		$('<input data-bind="value: ' + options.field + '" />')
		.appendTo(container) 
		.kendoComboBox({
			dataTextField: 'pag__des',
			dataValueField: 'fac__pag',
			dataSource: {
				type: "json",
				transport: {
					read: {
						url: "http://190.144.16.114:8810/rest/Parameters/Sirfac_pag",
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
							alert(e.message)
						}
					},
				},
				schema: {
					type: "json",
					data:function (e){
						if(e.dsfac_pag.eeEstados[0].Estado==="OK"){
							return e.dsfac_pag.eefac_pag;
							}else{
							alert(e.dsfac_pag.eeEstados[0].Estado);
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
					alert("Error de conexion del servidor " +xhr.xhr.status+" "+ xhr.errorThrown);
				}
			}			
		});
	}
	$("#grid").kendoGrid({
		//        dataSource: dataSource,
		navigatable: true,
		batch: false,
		pageable: true,
		height: 550,
		toolbar: ["create"],
		
		columns: [            
			{
				field: "pag__des",
				title: "Clase de articulo",                
				editor: nana,
				template: function (e){if(e.pag__des){return e.pag__des.pag__des;}}
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
				title: "Valor unitario"
			},
			{
				field: "ValorTotal",
				title: "Valor total"
			},
			{
				field: "CodAmortizacion",
				title: "Código de amortizacion"
			},
			{
				field: "DiasAmortizacion",
				title: "Días de amortización"
			},
		{ command: ["edit", "destroy"], title: "&nbsp;", width: 150 }],
		editable: "popup"
	});
});
function validaDocumento(){
	$("#body").find(":input");
	
}

function validaDocumentodos(){
    
    var usuario = sessionStorage.getItem("usuario");
    var fiid = sessionStorage.getItem("fiid");
    var sucursal = $("#ipSucursal").val();
    var claDocumento = $("#ipCDocumento").val();
    var nitCliente = $("#ipCliente").val();
    var condiPagos = $("#ipCdePago").val();
    var fecha = $("#ipFecha").val();
    var fechaVencimeinto = $("#ipFechaVencimiento").val();
    var descuento = $("#ipDescuento").val();
    var divisa = $("#ipDivisa").val();
    var tasa = $("#ipTasa").val();
    var fletes = $("#ipFletes").val();
    var observaciones = $("#txtAObservaciones").val();
    var cabeceraValida = "";
    var codVendedor = $("#ipVendedor").val();
    
    var jSonData = new Object();
    jSonData.dsFactura = new Object();
    jSonData.dsFactura.eeDatos = new Array();
    jSonData.dsFactura.eeDatos[0] = new Object();
    jSonData.dsFactura.eeDatos[0].picusrcod = usuario;
    jSonData.dsFactura.eeDatos[0].picfiid = fiid;
    jSonData.dsFactura.eegfc_fac = new Array();
    jSonData.dsFactura.eegfc_fac[0] = new Object();
    jSonData.dsFactura.eegfc_fac[0].clc__cod = claDocumento;
    jSonData.dsFactura.eegfc_fac[0].cpto__cod = "1"; // ???
    jSonData.dsFactura.eegfc_fac[0].dpc__fec = fechaVencimeinto;
    jSonData.dsFactura.eegfc_fac[0].fac__dto = descuento;
    jSonData.dsFactura.eegfc_fac[0].fac__est = "1"; // ???
    jSonData.dsFactura.eegfc_fac[0].fac__fec = fecha;
    jSonData.dsFactura.eegfc_fac[0].fac__obs = observaciones;
    jSonData.dsFactura.eegfc_fac[0].lis__num = "12";  // este dato aún no esta en la intefaz
    jSonData.dsFactura.eegfc_fac[0].loc__cod = "1"; // ???
    jSonData.dsFactura.eegfc_fac[0].mnd__cla = divisa;
    jSonData.dsFactura.eegfc_fac[0].mnd__fec = "2016-05-12"; // por el momento se coloca la misma fecha de factura pero esta es la fecha de la tasa
    jSonData.dsFactura.eegfc_fac[0].mnd__val = tasa;
    jSonData.dsFactura.eegfc_fac[0].pago__cod = condiPagos;
    jSonData.dsFactura.eegfc_fac[0].suc__cod = sucursal;
    jSonData.dsFactura.eegfc_fac[0].ter__nit = nitCliente;
    jSonData.dsFactura.eegfc_fac[0].ven__cod = codVendedor;
    console.log(JSON.stringify(jSonData));
    $.ajax({
        type: "POST",
        data: JSON.stringify(jSonData),
        url: "http://172.21.24.146:8810/rest/Facturacion/ValidaCabecera", //ipServicios + baseFactura +"ValidaCabecera",
        dataType : "json",
        contentType: "application/json;",
        success: function (resp) {
            console.log(JSON.stringify(resp));                
            cabeceraValida = JSON.stringify(resp.dsFactura.eeEstados[0].Estado);            
		},
        error: function (e) {
            console.log(JSON.stringify(e));
            alert("Error consumiendo el servicio de validar cabecera\n"+ e.status +" - "+ e.statusText);
		}
		}).done(function(){
        if(cabeceraValida=='"OK"'){
            alert("Cabecera valida");
            console.log("Cabecera valida \n" + cabeceraValida);                     
			}else{                    
            alert("Cabecera invalida"+cabeceraValida);
            console.log("Datos  \n" + cabeceraValida);                
		}
	});
}

function calcularFechaVencimiento(){
	debugger
    var fechaTex = $("#ipFecha").val();
    var fechaIni = new Date(fechaTex);
    var fechaVencimiento="";
    var opcionDePago = facpag;
    fechaVencimiento = sumarDias(fechaIni, facpag);
	//if(opcionDePago=="1"){
	//	fechaVencimiento=fecha;         
	//	}else{
    //    var opcionPagoText = ipCdePago.text();
    //    var reg = /\d+/;
    //    var diasArray = opcionPagoText.match(reg);
    //    var dias = parseInt(diasArray[0]);
    //    fechaVencimiento = sumarDias(fechaIni, dias);     
//}
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

function cargarParametros(){
    try{  
        var dataSucursal, dataFormasPago, dataClaseDocumento, dataDivisa;
		
        $.ajax({            
            type: "POST",
            url: "http://172.21.24.146:8810/rest/Facturacion/QueryParam",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {
                
                dataSucursal = JSON.stringify(resp.dsttParametros.eesic_suc);
                dataClaseDocumento = JSON.stringify(resp.dsttParametros.eesic_clc);
                dataFormasPago = JSON.stringify(resp.dsttParametros.eefac_pag);
                dataDivisa = JSON.stringify(resp.dsttParametros.eesic_mnd); 
                sessionStorage.setItem("dataSucursal",dataSucursal);
                sessionStorage.setItem("dataClaseDocumento",dataClaseDocumento); 
                sessionStorage.setItem("dataFormasPago",dataFormasPago);
                sessionStorage.setItem("dataDivisa",dataDivisa);
			},
            error: function (e) {
                console.log(JSON.stringify(e));
                alert("Error consumiendo el servicio\n"+ e.status +" - "+ e.statusText);
			}
			}).done(function(){
            var jsonDataSucursal= JSON.parse(dataSucursal)
            // sucursal
            $("#ipSucursal").kendoComboBox({
                dataTextField: "suc__nom",
                dataValueField: "suc__cod",
                dataSource: jsonDataSucursal,
                height: 100,
                template: '<span>#: data.suc__cod # - #: data.suc__nom #</span>',
			});
            
            kendoComboBoxSucursal = $("#ipSucursal").data("kendoComboBox");
            var setValueSucursal = function(e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
				kendoComboBoxSucursal.value($("#value").val());
			}
            
            // Clase de documento
            var jsonDataClaseDocumento= JSON.parse(dataClaseDocumento)
            $("#ipCDocumento").kendoComboBox({
                dataTextField: "clc__nom",
                dataValueField: "clc__cod",
                dataSource: jsonDataClaseDocumento,
                height: 100,                
			});
            
            kendoComboBoxClaseDocumento = $("#ipCDocumento").data("kendoComboBox");
            var setValueClaseDocumento = function(e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
				kendoComboBoxClaseDocumento.value($("#value").val());
			}
            
            // Formas de pago
            var jsonDataFormasPago= JSON.parse(dataFormasPago);
            $("#ipCdePago").kendoComboBox({
                dataTextField: "pag__des",
                dataValueField: "fac__pag",        
                dataSource: jsonDataFormasPago,
                height: 100,
                change: calcularFechaVencimiento               
			});
            
            kendoComboBoxFormasPago = $("#ipCdePago").data("kendoComboBox");
            var setValueClaseDocumento = function(e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
				kendoComboBoxFormasPago.value($("#value").val());
			}
            
            // Divisa
            var jsonDataDivisa= JSON.parse(dataDivisa);
            $("#ipDivisa").kendoComboBox({
                dataTextField: "mnd__des",
                dataValueField: "mnd__cla",        
                dataSource: jsonDataDivisa,
                height: 100,
                template: '<span>#: data.mnd__cla # - #: data.mnd__des #</span>',
			});
            
            kendoComboBoxDivisa = $("#ipDivisa").data("kendoComboBox");
            var setValueDivisa = function(e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
				kendoComboBoxDivisa.value($("#value").val());
			}
		});      
        
	}catch(e){alert(e.message);}
}

function listaClientes(e){
    try{
        $.ajax({            
            type: "POST",
            url: "http://172.21.24.146:8810/rest/Facturacion/QueryParam",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {
                
                
			},
            error: function (e) {
                console.log(JSON.stringify(e));
                alert("Error consumiendo el servicio\n"+ e.status +" - "+ e.statusText);
			}
		}).done(function(){});
	}catch(e){alert(e.message);}
	}		
    $(document).ready(function () {
      
    var datos_cliente = JSON.parse(sessionStorage.getItem("Detalle_Cliente"));

    
            
    $("#btAgregar").kendoButton({
        click: guardar
    });
    $("#btCancelar").kendoButton({
        click: cancelar
    });
    
        var data = [
        {text: "Si", value: "1"},
        {text: "No", value: "0"},
    ];
    
    $("#Certificado_Analisis").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        
        dataSource: data
        
    });
        $("#Despachos_Parciales").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        
        dataSource: data
        
    });
    $("#Cliente_Nacional").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",       
        dataSource: data
        
    });
        $("#Transporte_por").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",       
        dataSource: data
        
    });
        $("#Precio_Establecimiento").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        
        dataSource: data
        
    });
    
    
      $("#Identificacion").kendoNumericTextBox();
      $("#Cupo_De_Credito").kendoNumericTextBox();
      $("#Cupo_De_Ventas").kendoNumericTextBox();
      $("#Copias_Factura").kendoNumericTextBox();
      $("#Tope_Galones").kendoNumericTextBox();
      
      $("#Dia_Pago").kendoDatePicker();
      $("#Hora_Pago").kendoTimePicker();
      
        function cargar_datos (){
            var datos_cliente = JSON.parse(sessionStorage.getItem("Detalle_Cliente"));
            
            $("#nit")[0].value = datos_cliente.ter__nit; 
            $("#nombre")[0].value = datos_cliente.ter__raz;  
            $("#Identificacion")[0].value=datos_cliente.cal__ide;
            $("#Cupo_De_Credito")[0].value=datos_cliente.cli__cre;
            $("#Cupo_De_Ventas")[0].value=datos_cliente.cli__ven; 
            $("#Persona_Contacto_Tesoreria")[0].value=datos_cliente.con__tes; 
            $("#Persona_Contacto_Ventas")[0].value=datos_cliente.con__ven; 
            $("#Copias_Factura")[0].value=datos_cliente.num__cop__fac;             
            $("#Dia_Pago")[0].value=datos_cliente.dia__pag;
            $("#Hora_Pago")[0].value=datos_cliente.hor__pag;
            $("#Email")[0].value=datos_cliente.ter__email;           
            $("#Tope_Galones")[0].value=datos_cliente.cli__gal;
            
            if (datos_cliente.cer__ana===true) {
                 var Analisis1 = 0; 
            }else{
                var Analisis1 = 1; 
            }
            if (datos_cliente.dpc__par===true) {
                 var Despachos1 = 0; 
            }else{
                var Despachos1 = 1; 
            }if (datos_cliente.cli__tra===true) {
                 var Transporte1 = 0; 
            }else{
                var Transporte1 = 1; 
            }
            if (datos_cliente.ter__cret===true) {
                 var PrecioEstablecimiento = 0; 
            }else{
                var PrecioEstablecimiento = 1; 
            }
            $("#Certificado_Analisis").data("kendoDropDownList").select(Analisis1);
            $("#Despachos_Parciales").data("kendoDropDownList").select(Despachos1);
            $("#Transporte_por").data("kendoDropDownList").select(Transporte1);
            $("#Precio_Establecimiento").data("kendoDropDownList").select(PrecioEstablecimiento);
            
        }
      
       
       function guardar(){
           var  actualizar = new cudClientes();
           var  actjson = actualizar.getjson();
           var  urlactualizar = actualizar.getUrlSir();    
           
           var cedula = $("#nit")[0].value;          
           var cliente = $("#claseCliente").data("kendoDropDownList");
           var select = cliente.selectedIndex;
           var Clase_cliente = cliente.dataSource._data[select].cla__cli;
           var Identificacion = $("#Identificacion")[0].value;
           var Credito =$("#Cupo_De_Credito")[0].value;
           var ventas = $("#Cupo_De_Ventas")[0].value; 
           var Persona_tesoreria = $("#Persona_Contacto_Tesoreria")[0].value; 
           var Persona_ventas = $("#Persona_Contacto_Ventas")[0].value; 
           
          
            if (($("#Certificado_Analisis").data("kendoDropDownList")._old)==="1") {
                 var analisis = true; 
            }else{
                var analisis = false; 
            }
             if (($("#Despachos_Parciales").data("kendoDropDownList")._old)==="1") {
                 var despachos = true; 
            }else{
                var despachos = false; 
            }
              if (($("#Transporte_por").data("kendoDropDownList")._old)==="1") {
                 var transporte = true; 
            }else{
                var transporte = false; 
            }
             if (($("#Cliente_Nacional").data("kendoDropDownList")._old)==="1") {
                 var clienteNacional = true; 
            }else{
                var clienteNacional = false; 
            }
           var copias_factura = $("#Copias_Factura")[0].value;  
           var forma = $("#Forma_Pago").data("kendoDropDownList");
           var select = forma.selectedIndex;
           var forma_pago = forma.dataSource._data[select].fac__pag;
           
           var lista = $("#Numero_Lista").data("kendoDropDownList");
           var select = lista.selectedIndex;
           var listaPrecio = lista.dataSource._data[select].lis__num;
           
           var dia_Pago = $("#Dia_Pago")[0].value;
           var hora_Pago =$("#Hora_Pago")[0].value;
           var email =$("#Email")[0].value;
           var cli_estado = 99;
           
           var bodega = $("#Bodega").data("kendoDropDownList");
           var select = bodega.selectedIndex;
           var bodegas = bodega.dataSource._data[select].loc__cod;
           
            if (($("#Precio_Establecimiento").data("kendoDropDownList")._old)==="1") {
                 var precio_est = true; 
            }else{
                var precio_est = false; 
            }           
            var galones =$("#Tope_Galones")[0].value;
            
            
           actjson.dsSICUDgpd_cli.eegpd_cli[0].ter__nit=cedula;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].cla__cli=Clase_cliente;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].cal__ide=Identificacion;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].cli__cre=Credito;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].cli__ven=ventas;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].con__tes=Persona_tesoreria;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].con__ven=Persona_ventas;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].cer__ana=analisis;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].dpc__par=despachos;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].cli__tra=transporte;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].num__cop__fac=copias_factura;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].pago__cod=forma_pago;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].ter__lis=listaPrecio;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].dia__pag=dia_Pago;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].hor__pag=hora_Pago;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].email__ter=email;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].cli__est=cli_estado;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].loc__cod=bodegas;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].ter__cret=precio_est;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].cli__gal=galones;
           actjson.dsSICUDgpd_cli.eegpd_cli[0].gfc__nal=clienteNacional;
           
                    $.ajax({
                    type: "PUT",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsSICUDgpd_cli.eeEstados[0].Estado)=="OK")
                        {    
                           sessionStorage.setItem("Detalle_Vendedor",JSON.stringify(resp.dsSICUDgpd_cli.eegpd_cli[0]));
                            parent.cerrar1();
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_cli.eeEstados[0].Estado);  
                            
                        }
                    } 
        
                });
           
           
           
       }
       function cancelar(){
           
           parent.cerrar();
       }
       

       
      function nombre(container, options) {
        var obj = new sirConsultaCliente();
        var objJson = obj.getjson();
        var url = obj.getUrlSir();
        var mapData = obj.getMapData();
        $("#nombre")
                
                .kendoAutoComplete({
            dataTextField: "ter__raz",
            dataValueField: "ter__nit",        
            placeholder: "Selecione un cliente...",
            minLength: 4,
            filter: "contains",
            select: function(e) {                
            $("#nit").val(e.dataItem.ter__nit);    
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
                                          
                            if (operation === 'read') {
                                var key1 = Object.keys(objJson)[0];
                                var key2 = Object.keys(objJson[key1])[1];
                                objJson[key1][key2][0].picter_nit = "";
                                objJson[key1][key2][0].picter_raz = $("#nombre").val();
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
          
      }
    function filtroestado(container, options) {
        var obj = new sirConsultaCliente();
        var objJson = obj.getjson();
        var url = obj.getUrlSir();
        var mapData = obj.getMapData();
       $("#nit")
                
                .kendoAutoComplete({
            dataTextField: "ter__nit",
            dataValueField: "ter__nit",        
            placeholder: "Selecione un cliente...",
            minLength: 6,
            filter: "contains",
            select: function(e) {                
            $("#nombre").val(e.dataItem.ter__raz);    
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
                                          
                            if (operation === 'read') {
                                var key1 = Object.keys(objJson)[0];
                                var key2 = Object.keys(objJson[key1])[1];
                                objJson[key1][key2][0].picter_nit = $("#nit").val();
                                objJson[key1][key2][0].picter_raz = "";
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

    }                       
function claseCliente(container, options) {
        
        var consultar = new sirClaseCliente();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpr_cla";
        $("#claseCliente")
                .kendoDropDownList({
            dataTextField: "cla__nom",
            dataValueField: "cla__nom",
            //template:'<div class="divElementDropDownList">#: data.cla__nom #</div>',  
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
                            alertDialogs("Error Con Servicio Clase Cliente"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "cla__nom",
                        fields: {
                            cla__cli: {editable: false, nullable: false},
                            cla__nom: {editable: false, nullable: false}
                        }
                    }
                }
            }

        });
    }        
    function listaPrecio(){
        //-------------LISTA DE PRECIO
        var consultar = new sirLista();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpr_lis";
        $("#Numero_Lista")
                
                .kendoDropDownList({
            dataTextField: "lis__des",
            dataValueField: "lis__des",
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
                            alertDialogs("Error Con Servicio Listas de precio"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "lis__num",
                        fields: {
                            lis__num: {editable: false, nullable: false},
                            lis__des: {editable: false, nullable: false}
                        }
                    }
                }
            }

        });
    }
    function formaPago(){
         //-------FORMA DE PAGO
        var consultar = new sirFormadepago();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eefac_pag";
        $("#Forma_Pago")
                
                .kendoDropDownList({
            dataTextField: "pag__des",
            dataValueField: "fac__pag",
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
                            alertDialogs("Error Con Servicio Forma de pago "+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "fac__pag",
                        fields: {
                            fac__pag: {editable: false, nullable: false},
                            pag__des: {editable: false, nullable: false}
                        }
                    }
                }
            }

        });
    }
    function bodegas(){
         //-------BODEGA EN COSIGNA
        var consultar = new sirBodega();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eedpc_loc";
        $("#Bodega")
                .kendoDropDownList({
            dataTextField: "loc__des",
            dataValueField: "loc__cod",
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
                            alertDialogs("Error Con Servicio de Bodegas "+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "loc__cod",
                        fields: {
                            loc__cod: {editable: false, nullable: false},
                            loc__des: {editable: false, nullable: false}
                        }
                    }
                }
            }

        });
    }
    nombre();
    claseCliente();
    filtroestado();
    listaPrecio();
    formaPago();
    bodegas();
    cargar_datos();
       
       
});
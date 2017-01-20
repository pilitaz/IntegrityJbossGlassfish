   $(document).ready(function () {debugger
       
    $("#btAgregar").kendoButton({
        click: guardar
    });
    $("#btCancelar").kendoButton({
        click: cancelar
    });
       
       function guardar(){debugger
           var  actualizar = new CudVendedores();
           var  actjson = actualizar.getjson();
           var  urlactualizar = actualizar.getUrlSir();    
           var cedula = $("#nit")[0].value;
           var nombre = $("#nombre")[0].value;
           var cliente = $("#claseCliente").data("kendoDropDownList");
           var select = cliente.selectedIndex;
           cliente = cliente.dataSource._data[select].cla__cli;
           var cliente_nom = $("#claseCliente").data("kendoDropDownList").dataSource._data[select].cla__nom;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__nit=cedula;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].ter__raz=nombre;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].trr__cod=0;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__cli=cliente;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].cla__nom=cliente_nom;
           actjson.dsSICUDgpd_vdd.eegpd_vdd[0].vdd__est=99; 
           
           
                           $.ajax({
        
                    type: "POST",        
                    async: false,
                    data: JSON.stringify(actjson),
                    url: urlactualizar,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {debugger
                        if((resp.dsSICUDgpd_vdd.eeEstados[0].Estado)=="OK")
                        {    
                           sessionStorage.setItem("Detalle_Vendedor",JSON.stringify(resp.dsSICUDgpd_vdd.eegpd_vdd[0]));
                           
                            
                            parent.cerrar1();
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsSICUDgpd_vdd.eeEstados[0].Estado);  
                            $('#grid').data('kendoGrid').refresh();
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh(); 
                        }
                    } 
        
                });
           
           
           
       }
       function cancelar(){
           
           parent.cerrar();
       }
       
function sucursal(container, options) {debugger
        
        var consultar = new sirSucursales();
        var datajson = consultar.getjson();
       datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].piirgeo__cod = parseInt($("#Region").data("kendoDropDownList")._old);
       datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].picciu__cod= $("#Ciudad").data("kendoComboBox")._old;
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpd_cli_suc";
        $("#Establecimiento")
                .kendoComboBox({
            dataTextField: "com__con",
            dataValueField: "com__con",
            select: function(e) {                
              
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
                    data: function (e) {debugger
                        var key1 = Object.keys(e)[0];
                        if (e[key1].eeEstados[0].Estado === "OK") {
                            return e[key1][mapCud1];
                        } else {
                            alertDialogs("Error Con Servicio Sucursal"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "com__con",
                        fields: {
                            com__con: {editable: false, nullable: false},
                           
                        }
                    }
                }
            }

        });
    } 
       
      function regionCod(container, options) {debugger
        
        var consultar = new sirRegionGeografica();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpr_rgeo";
        $("#Region")
               
                .kendoDropDownList({
            dataTextField: "rgeo__nom",
            dataValueField: "rgeo__cod",
           placeholder:"select your option",
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
                    data: function (e) {debugger
                        var key1 = Object.keys(e)[0];
                        if (e[key1].eeEstados[0].Estado === "OK") {
                            return e[key1][mapCud1];
                        } else {
                            alertDialogs("Error Con Servicio Regiones"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "rgeo__nom",
                        fields: {
                            rgeo__cod: {editable: false, nullable: false},
                            rgeo__nom: {editable: false, nullable: false}
                        }
                    }
                }
            }

        });
    }
    function ciudades(container, options) {debugger
        
        var consultar = new sirCiudades();
        var datajson = consultar.getjson();
       // datajson.dsSIRsic_ciu.eeSIRsic_ciu[0].picciu_cod=$("#Region").data("kendoDropDownList")._old;
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eesic_ciu";
        $("#Ciudad")
                .kendoComboBox({
            dataTextField: "ciu__nom",
            dataValueField: "ciu__cod",
            select: function(e) {                
              sucursal();
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
                    data: function (e) {debugger
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
    }
       
    
    regionCod();
    ciudades();
    //filtroestado();
    
});
   $(document).ready(function () {debugger
    document.getElementById("Establecimiento").readOnly = true;   
    $("#btAgregar").kendoButton({
        click: guardar
    });
    $("#btCancelar").kendoButton({
        click: cancelar
    });
       
       function guardar(e){debugger
           
//           
//           var ciudad = $("#Ciudad").data("kendoComboBox");
//           var select1 = ciudad.selectedIndex;    
//           var establecimiento = $("#Establecimiento").data("kendoComboBox");
//           
//           
//           
//           if (select1===-1 || establecimiento===undefined){
//               alertDialogs("Debe Ingresar una ciudad y un establecimiento");   
//           
//           }else
//           {
//           ciudad = ciudad.dataSource._data[select1].ciu__cod;           
//           var select2 = establecimiento.selectedIndex;
//           if (select2===-1){
//           alertDialogs("Debe Ingresar una ciudad y un establecimiento");                  
//           }
//           else
//           {
//            var region = $("#Region").data("kendoDropDownList");
//            var select = region.selectedIndex;
//            region = region.dataSource._data[select].rgeo__cod;   
//            establecimiento = establecimiento.dataSource._data[select2].com__con;           
           parent.filtrar();
//           }
//       }
   }
       function cancelar(){
           
           parent.cerrar();
       }
       
function sucursal(e) {debugger
        
        var consultar = new sirSucursales();
        var datajson = consultar.getjson();
       datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].piirgeo__cod = parseInt($("#Region").data("kendoDropDownList")._old);
       datajson.dsSIRgpd_cli_suc.SIRgpd_cli_suc[0].picciu__cod= e.dataItem.ciu__cod;
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eegpd_cli_suc";
        document.getElementById("Establecimiento").readOnly = false;   
        $("#Establecimiento").removeClass();
        $("#Establecimiento").kendoComboBox({
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
              sucursal(e);
            },
            height: 100,
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
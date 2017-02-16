
function onloadPopUpCond() {
reasignar();
};
   
   function reasignar() {debugger
        var lista = sessionStorage.getItem("listado_tareas"); 
        var lista = JSON.parse(lista);
        
        document.getElementById("subtituloReasigna").innerHTML  = "Reasignacion de  "+lista.length +" tareas : "+lista[0].text; 
        var consultar = new sirconsulta();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "UserBPM";
        
        $("#reasiganar")
                .kendoComboBox({
               
            dataTextField: "usr__name",
            dataValueField: "usr__cod",
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
                            alertDialogs("Error Con Servicio Usuarios"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "usr__cod",
                        fields: {
                            usr__name: {editable: true, nullable: false},
                            usr__cod: {editable: true, nullable: false}
                            
                        }
                    }
                }
            }

        });
    }
   
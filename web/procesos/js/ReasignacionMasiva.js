
function onloadPopUpCond() {
reasignar();
};
   
   function reasignar() {debugger
        var lista = sessionStorage.getItem("listado_tareas"); 
        var lista = JSON.parse(lista);
        
        document.getElementById("subtituloReasigna").innerHTML  = "Reasignacion de  "+lista.length +" tareas : "+lista[0].text; 
        var consultar = new SirUsuariosReasigna();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eesearchuserstoreassign";
        datajson.dssearchuserstoreassign.SIRsearchuserstoreassign[0].picprocname=lista[0].proceso;
        datajson.dssearchuserstoreassign.SIRsearchuserstoreassign[0].pictaskname=lista[0].text;
        $("#reasiganar")
                .kendoComboBox({
               
            dataTextField: "username",
            dataValueField: "username",
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
                            alertDialogs("Error Con Servicio Usuarios"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "username",
                        fields: {
                            username: {editable: true, nullable: false},
                            
                            
                        }
                    }
                }
            }

        });
    }
   
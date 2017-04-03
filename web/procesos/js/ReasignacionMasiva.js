function CudTareaNormal(){
    var lista = sessionStorage.getItem("listado_tareas"); 
    var lista = JSON.parse(lista);   
    var usuario = $("#reasiganar").data("kendoComboBox");   
    var select = usuario.selectedIndex;
    var usuario = usuario.dataSource._data[select].usr__cod;
    
    var consultar = new cudReasignaTarea();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    datajson.dsreassignvarioustasks.reassignto[0].picuserreassign=usuario;
    var i=0;
    var array1 =[];
    for(var i = 0; i < lista.length; i++ ){
        var array = {};
        array.taskname =lista[i].text;
        array.procname =lista[i].proceso;
        array1.push(array);
    }
    datajson.dsreassignvarioustasks.eetask=array1;  
    
        $.ajax({
                
                type: "POST",        
                async: false,
                data: JSON.stringify(datajson),
                url: urlService,
                dataType: "json",        
                contentType: "application/json;",
                success: function (resp) { debugger
                    if((resp.dsreassignvarioustasks.eeEstados[0].Estado)=="OK")
                    {
                      
                       cerrarCustomPopUp();
                       
                       alertDialogs("Las tareas han sido reasignadas ");
                       $('#grid1').data('kendoGrid').refresh();                                             
                       $('#grid1').data('kendoGrid').dataSource.read();
                       $('#grid1').data('kendoGrid').refresh(); 
                    }
                    else   
                    {  
                         
                    } 
                } ,
                error: function (e) {
                  alertDialogs("Error" + e.status + " - " + e.statusText);
            }
                
            }); 
}
function cudTareaFlujo(){}

function reasignarTarea(){debugger
var tarea = sessionStorage.getItem("Flujo_Tarea"); 
   if (tarea==="true"){cudTareaFlujo(); }else{CudTareaNormal();}
}
$(document).ready(function (){
   
   var tarea = sessionStorage.getItem("Flujo_Tarea"); 
   if (tarea==="true"){reasignarFlujo(); }else{reasignarNormal();}
});

function reasignarFlujo() {debugger
    
    var lista = sessionStorage.getItem("listado_tareas"); 
    var lista = JSON.parse(lista);
    
    document.getElementById("subtitulo2").innerHTML  = "Reasignacion de  "+lista.length +" tareas : "+lista[0].text; 
    var consultar = new SirUsuariosReasigna();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eesearchuserstoreassign";
    datajson.dssearchuserstoreassign.SIRsearchuserstoreassign[0].picprocname=lista[0].proceso;
    datajson.dssearchuserstoreassign.SIRsearchuserstoreassign[0].pictaskname=lista[0].text;
    $("#reasiganar")
            .kendoComboBox({
                
        dataTextField: "username",
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
                        usr__cod: {editable: true, nullable: false},
                        
                    }
                }
            }
        }
        
    });
}
function reasignarNormal() {debugger
    var lista = sessionStorage.getItem("listado_tareas"); 
    var lista = JSON.parse(lista);
    
    document.getElementById("subtitulo2").innerHTML  = "Reasignacion de  "+lista.length +" tareas : "+lista[0].text; 
    var consultar = new SirUsuariosReasigna();
    var datajson = consultar.getjson();
    var urlService = consultar.getUrlSir();
    var mapCud1 = "eesearchuserstoreassign";
    datajson.dssearchuserstoreassign.SIRsearchuserstoreassign[0].picprocname=lista[0].proceso;
    datajson.dssearchuserstoreassign.SIRsearchuserstoreassign[0].pictaskname=lista[0].text;
    $("#reasiganar")
            .kendoComboBox({
                
                dataTextField: "username",
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
                        usr__cod: {editable: true, nullable: false},
                        
                    }
                }
            }
        }
        
    });
}

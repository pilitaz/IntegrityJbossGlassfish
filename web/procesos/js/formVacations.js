
$(document).ready(function () {
iniciar();
jefe();
pagoAnticipado();
});
function pagoAnticipado(){
    
     var estados = [
        {text: "Si", valor: "1"},
        {text: "No", valor: "0"},

    ];

    $("#anticipado").kendoComboBox({
        dataTextField: "text",
        dataValueField: "valor",
        placeholder: "...",
        dataSource: estados,
        
    });
}
function jefe(){
    

        var consultar = new sirJefes();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
        var mapCud1 = "eeusers";
        
               $("#jefe")
                .kendoDropDownList({
            dataTextField: "username",
            dataValueField: "usrcod",
            placeholder: "....",
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
                            alertDialogs("Error Con Servicio Jefes"+e[key1].eeEstados[0].Estado);
                        }
                    },
                    model: {
                        id: "usrcod",
                        fields: {
                            username: {editable: false, nullable: false},
                            usrcod: {editable: false, nullable: false}
                        }
                    }
                }
            }

        });
    
    
}
function iniciar(){
    $("#inicioVacaciones").kendoDatePicker();
    $("#diasPedir").kendoNumericTextBox({});
    $("#totaldiasvalor").kendoNumericTextBox({});
    
   var consultarUsr = new IniciaVacaciones();
   var data = consultarUsr.getjson();
   var urlservicio = consultarUsr.getUrlSir();
    $.ajax({
            
            type: "POST",        
            async: false,
            data: JSON.stringify(data),
            url: urlservicio,
            dataType: "json",        
            contentType: "application/json;",
            success: function (resp) { debugger
                if((resp.dsparam_proc_vac.eeEstados[0].Estado)=="OK")
                {
                  document.getElementById("fecha").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].fec_sol; 
                  document.getElementById("pendientes").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].tot_dias_hab; 
                  document.getElementById("corte").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].fec_cort; 
                  document.getElementById("anticipacion").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].dias_antic; 
                  document.getElementById("vacaciones").innerHTML=resp.dsparam_proc_vac.eeparam_proc_vac[0].num_dias_vac; 
                }
                else   
                {  
                    alert("Error"+resp.dsparam_proc_vac.eeEstados["0"].Estado);   
                } 
            } 
            
        });   
    
    
}                              
function ayuda(){
    var estado = document.getElementById("btnayuda").attributes[3].nodeValue;
    if (estado ==="on"){
        $("#mensaje").empty();
         $("#ayuda").empty();  
        document.getElementById("btnayuda").setAttribute("class", "k-sprite pro_infout");
        document.getElementById("btnayuda").setAttribute("estado", "off");
    }
    else
    {     
        $("#ayuda").append("<div id='mensaje'></div>");  
          $("#ayuda").append("<div id='asd'></div>");  
        document.getElementById("mensaje").innerHTML = " <strong>Ayuda: </strong><br>Has ingresado al formulario de solicitud de vacaciones. Con la diligencia de este formulario usted está iniciando oficialmente su solicitud de vacaciones. Recuerde, la suma de  los días  solicitados a disfrutar y a cobrar en valor no puede ser superior al máximo de días hábiles  pendientes por disfrutar. Esta empresa exige por lo menos 30 días de anticipación para la solicitud de vacaciones. ";
        document.getElementById("mensaje").setAttribute("class", "sidenavIzq1");
        document.getElementById("mensaje").setAttribute("style", "padding: 0.5cm 0.5cm 0.5cm 1cm");
        document.getElementById("btnayuda").setAttribute("class", "k-sprite pro_infoin");
        document.getElementById("btnayuda").setAttribute("estado", "on");
    }

}
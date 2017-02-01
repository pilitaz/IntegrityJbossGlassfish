
$(document).ready(function () {
iniciar();
});
function iniciar(){
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

$(document).ready(function () {

});
                              
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
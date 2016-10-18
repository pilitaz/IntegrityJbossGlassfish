
function ir_usuarios(){
    
    window.location = ("usuariosbpm.html");    
}



$(document).ready(function() {debugger


$('body').css('display', 'none');

$('body').fadeIn(1000);


  var usr_name = sessionStorage.getItem("Userid_bpm");  
 
    document.getElementById("demo").innerHTML = usr_name;

function agregarfuncion(e) {debugger

 /**  servicio para agregar funciones                 
var jsonResp = "";
    $.ajax({
        type: "POST",
        data:as ,
        url: urlCud,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {          
        },
        error: function (e) {
            kendo.alert("Error al enviar el registro.\n" + e.status + " - " + e.statusText);

        }
    });
    */
}


function eliminarfuncion(e) {debugger
var Selement=$('#jstree3').jstree('get_selected');
var  servicio = new addfuciones();
var  datajson = servicio.getjson();
var  urlService = servicio.getUrlSir();

/** Servicio para eliminar funciones                 
var jsonResp = "";
    $.ajax({
        type: "POST",
        data:as ,
        url: urlService,
        dataType: "json",
        contentType: "application/json;",
        success: function (resp) {
          
        },
        error: function (e) {
            kendo.alert("Error al enviar el registro.\n" + e.status + " - " + e.statusText);

        }
    });
    */               



} 
 
 


$('.link').click(function() {

event.preventDefault();

newLocation = this.href;

$('body').fadeOut(1000, newpage);

});

function newpage() {

window.location = newLocation;

}

});
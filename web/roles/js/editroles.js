

function ir_roles(){
    
    
    window.location = ("roles.html");
    
}

$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#arbol1').height(viewportHeight - 500);
   
});

$(document).ready(function() {debugger


$('body').css('display', 'none');

$('body').fadeIn(1000);

 $("#arbol1").load("tree2.html"); 
 $("#arbol2").load("tree3.html"); 

  var rol_name = sessionStorage.getItem("Rolname");  
  var rol_cod = sessionStorage.getItem("Idrol");  
 
document.getElementById("filtro").value = rol_name;

var jSon=[];

function agregarfuncion(e) {debugger
    
var Selement=$('#jstree2').jstree('get_selected');
if(Selement.length==1)
{
    
var  servicio = new addfuciones();
var  datajson = servicio.getjson();
var  urlService = servicio.getUrlSir();
Selement[0].toString(); 
var lenght = Selement[0].length; 
var piiportafolio = "";
var piicapitulo = "";
var piifuncion = "";
    switch(lenght) {
    case 4:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=0;
       piifuncion=0;
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
      break;
    case 8:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(4,7);
       piicapitulo=parseInt(piicapitulo);
       
      piifuncion=0;
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
     
      break;
       case 12:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(8,11);
       piicapitulo=parseInt(piicapitulo);
       
       piifuncion=0;
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
     
      break;
      
    case 13:
        
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(4,7);
       piicapitulo=parseInt(piicapitulo); 
       piifuncion=Selement[0].slice(8,12);
       piifuncion=parseInt(piifuncion); 
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piifuncion = piifuncion;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
      
      
    
      break;
      
       case 16:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(12,15);
       piicapitulo=parseInt(piicapitulo);
       
      piifuncion=0;
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
     
      break;
      
       case 17:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(8,11);
       piicapitulo=parseInt(piicapitulo); 
       piifuncion=Selement[0].slice(12,16);
       piifuncion=parseInt(piifuncion); 
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piifuncion = piifuncion;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
      
    break;
    
    case 21:
        
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(12,16);
       piicapitulo=parseInt(piicapitulo); 
       piifuncion=Selement[0].slice(16,20);
       piifuncion=parseInt(piifuncion); 
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piifuncion = piifuncion;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
      break;
    

    default:
     
  }
    
    
// servicio para agregar funciones                 

    $.ajax({
        
        type: "POST",        
        async: false,
        data: JSON.stringify(datajson),
        url: urlService,
        dataType: "json",
        
        contentType: "application/json;",
        success: function (resp) {  
            
        }        
        });
 $("#arbol2").load("tree3.html");     
}
else
{
   var arreglo=Selement; 
   var i=0;
   var j=0;
       
    var  servicio = new addfuciones();
     
    var datajson = new Object();
    var func = new Object();
    func.piiportafolio= "";
    func.piicapitulo= "";
    func.piifuncion= "";
    datajson.dsFunciones=[];
      datajson.dsFunciones.funciones=[];

    
   for(i in Selement){debugger 
       

    Selement[i].toString(); 
    
    var lenght = Selement[i].length; 
    var piiportafolio = "";
    var piicapitulo = "";
    var piifuncion = "";
    switch(lenght) {
    case 4:
       piiportafolio =Selement[i].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=0;
       piifuncion=0;
       datajson.dsFunciones.funciones[i].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[i].piirol = rol_cod;
      break;
    case 8:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(4,7);
       piicapitulo=parseInt(piicapitulo);
       
       piifuncion=0;
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
     
      break;
       case 12:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(8,11);
       piicapitulo=parseInt(piicapitulo);
       
       piifuncion=0;
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
     
      break;
      
    case 13:
        
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(4,7);
       piicapitulo=parseInt(piicapitulo); 
       piifuncion=Selement[0].slice(8,12);
       piifuncion=parseInt(piifuncion); 
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piifuncion = piifuncion;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
      
      
    
      break;
      
       case 16:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(12,15);
       piicapitulo=parseInt(piicapitulo);
       
      piifuncion=0;
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
     
      break;
      
       case 17:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(8,11);
       piicapitulo=parseInt(piicapitulo); 
       piifuncion=Selement[0].slice(12,16);
       piifuncion=parseInt(piifuncion); 
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piifuncion = piifuncion;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
      
    break;
    
    case 21:
        
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(12,16);
       piicapitulo=parseInt(piicapitulo); 
       piifuncion=Selement[0].slice(16,20);
       piifuncion=parseInt(piifuncion); 
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piifuncion = piifuncion;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
      break;
    

    default:
     

    
    
      
        }
       
       }
          
       
   }
}
    

    

           
    



function eliminarfuncion(e) {debugger
var Selement=$('#jstree3').jstree('get_selected');
var  servicio = new eliminarfunciones();
var  datajson = servicio.getjson();
var  urlService = servicio.getUrlSir();
Selement[0].toString(); 
var lenght = Selement[0].length; 
var piiportafolio = "";
var piicapitulo = "";
var piifuncion = "";
    switch(lenght) {
    case 4:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=0;
       piifuncion=0;
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
      break;
    case 8:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(4,7);
       piicapitulo=parseInt(piicapitulo);
       
      piifuncion=0;
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
     
      break;
       case 12:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(8,11);
       piicapitulo=parseInt(piicapitulo);
       
       piifuncion=0;
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
     
      break;
      
    case 13:
        
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(4,7);
       piicapitulo=parseInt(piicapitulo); 
       piifuncion=Selement[0].slice(8,12);
       piifuncion=parseInt(piifuncion); 
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piifuncion = piifuncion;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
      
      
    
      break;
      
       case 16:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(12,15);
       piicapitulo=parseInt(piicapitulo);
       
      piifuncion=0;
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
     
      break;
      
       case 17:
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(8,11);
       piicapitulo=parseInt(piicapitulo); 
       piifuncion=Selement[0].slice(12,16);
       piifuncion=parseInt(piifuncion); 
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piifuncion = piifuncion;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
      
    break;
    
    case 21:
        
       piiportafolio=Selement[0].slice(0,3);
       piiportafolio = parseInt(piiportafolio);
       piicapitulo=Selement[0].slice(12,16);
       piicapitulo=parseInt(piicapitulo); 
       piifuncion=Selement[0].slice(16,20);
       piifuncion=parseInt(piifuncion); 
       
       datajson.dsFunciones.funciones[0].piiportafolio = piiportafolio;
       datajson.dsFunciones.funciones[0].piicapitulo = piicapitulo;
       datajson.dsFunciones.funciones[0].piifuncion = piifuncion;
       datajson.dsFunciones.funciones[0].piirol = rol_cod;
      break;
    

    default:
     
  }
    
    
// servicio para agregar funciones                 

    $.ajax({
        
        type: "DELETE",        
        async: false,
        data: JSON.stringify(datajson),
        url: urlService,
        dataType: "json",
        
        contentType: "application/json;",
        success: function (resp) {  
            
        }        
        });

        //window.location.reload();
        $("#arbol2").load("tree3.html"); 
        
    


} 
 
 
$("#botonagregar").kendoButton({
                        click: agregarfuncion
                       
                        
                    });
$("#botoneliminar").kendoButton({
    click: eliminarfuncion
         });              



$('.link').click(function() {

event.preventDefault();

newLocation = this.href;

$('body').fadeOut(1000, newpage);

});

function newpage() {

window.location = newLocation;

}

});
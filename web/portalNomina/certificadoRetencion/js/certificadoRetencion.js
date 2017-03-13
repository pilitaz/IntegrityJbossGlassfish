 $(window).resize(function () {debugger
    var viewportHeight = $(window).height();                       
    $('#divPDF').height(viewportHeight - 50);
});

 function getPDF(selector) {
     // $("#pag").removeClass("fondo");
        kendo.drawing.drawDOM($(selector),{ forcePageBreak: ".page-break" }).then(function(group){
          kendo.drawing.pdf.saveAs(group, "Certificado_Retencion.pdf");
        });
//        $("#principal").addClass("jorge");
      }
      function mostrarDatos(e){debugger
      
      }
   function consultar() {
        var año=document.getElementById('añoGrabable').value;         
        var consultar = new sirRetencion();
        var datajson = consultar.getjson();
        var urlService = consultar.getUrlSir();
       datajson.dsCertificadoingret.SIRCertificadoingret[0].piiano=parseInt(año);
       $.ajax({
        
                    type: "POST",        
                    async: false,
                    data: JSON.stringify(datajson),
                    url: urlService,
                    dataType: "json",        
                    contentType: "application/json;",
                    success: function (resp) {
                        if((resp.dsCertificadoingret.eeEstados[0].Estado)=="OK")
                        {     
                           
                            mostrarDatos(resp);
                            //parent.cerrarPopup();
                        }
                        else
                        {
                            alertDialogs("Error"+resp.dsCertificadoingret.eeEstados[0].Estado); 
                                                     
                        }
                    } 
        
                }); 
       
      }
      
      
      
    $(document).ready(function() {
        $("#btnConsultar").kendoButton({
    click: consultar,
    });
    //document.body.style.zoom="100%";
    $(window).trigger("resize");    
    
    //getPDF('.page-container')     
    });
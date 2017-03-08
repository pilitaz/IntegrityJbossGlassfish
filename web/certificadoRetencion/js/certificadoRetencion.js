 function getPDF(selector) {
     // $("#pag").removeClass("fondo");
        kendo.drawing.drawDOM($(selector),{ forcePageBreak: ".page-break" }).then(function(group){
          kendo.drawing.pdf.saveAs(group, "Certificado_Retencion.pdf");
        });
//        $("#principal").addClass("jorge");
      }
  
    $(document).ready(function() {
       document.body.style.zoom="100%";

    getPDF('.page-container')     
    });
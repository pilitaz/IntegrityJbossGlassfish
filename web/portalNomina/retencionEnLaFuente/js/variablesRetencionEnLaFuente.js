
 function sirRetencionFuente() {
     
     var mapData = "ttconsultacomprobante";
     var urlSir = ipServicios + baseNomina +"SIConsultaretefte";
     var json = {  
         "dsSIConsultaretefte":{  
             "eeDatos":[  
                 {  
 //                    "picusrcod":sessionStorage.getItem("usuario"),
                     "picusrcod": "jsalazar_800001541",
                     "picfiid":sessionStorage.getItem("picfiid"),
                     "local_ip":sessionStorage.getItem("ipPrivada"),
                     "remote_ip":sessionStorage.getItem("ipPublica")
                 }
             ]            
         }
     };
     
     this.setUrlSir = function (newname) {
         if (newname) {
             urlSir = newname;
         }
     };
     this.getUrlSir = function () {
         return urlSir;
     };
     
     this.setjson = function (newname) {
         if (newname) {
             json = newname;
         }
     };
     this.getjson = function () {
         return json;
     };
     
     this.setMapData = function (newname) {
         if (newname) {
             mapData = newname;
         }
     };
     this.getMapData = function () {
         return mapData;
     };
     
 };
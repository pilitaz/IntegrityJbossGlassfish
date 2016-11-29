//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
 function sirconsultaMConta() {
    var mapData = "ee_user2"; 
    var urlSir = ipServicios + baseServicio +"SirUsuarios";
    var json = {  
     "dsee_user2":{  
      "eeDatos":[  
      {  
            "picusrcod":sessionStorage.getItem("usuario"),
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
    
    this.setMapData =  function (newname) {
        if (newname) {
            json = newname;
        }
    };
    this.getMapData= function () {
        return json;
    };
    
};

///////////////////////////////////////////////////////////////////////////////////////
function cudcreateMConta () {

    var urlCud = ipServicios + baseServicio  +"SicudUsuarios";
    var json = {  
       "dsee_user2":{  
          "eeDatos":[  
             {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
             }
          ],
          "ee_user2":[  
             {  
                "euserid":"apastori",
                "euser__Name":"Ansaldo PastoriS",
                "epassword":"**********",
                "usr__mail":"apastori@quantumltda.com",
                "usr__carp":"560187",
                "usr__est":1,
                "car__cod":9999,
                "car__nom":"PORTALNOMINA",
                "usr__jef":false,
                "usr__codjef":"aduarte"
             }
          ]
       }
    };
    this.setUrlCud = function (newname) {
        if (newname) {
            urlCud = newname;
        }
    };
    this.getUrlCud = function () {
        return urlCud;
    };
    
    this.setjson = function (newname) {
        if (newname) {
            json = newname;
        }
    };
    this.getjson= function () {
        return json;
    };
};

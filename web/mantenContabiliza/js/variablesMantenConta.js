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
    var mapData = "eesic_tcont"; 
    var urlSir = ipServicios + baseParameters +"SIRsic_tcont";
    var json = {  
     "dssic_tcont":{  
      "eeDatos":[  
      {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
//            "local_ip":sessionStorage.getItem("ipPrivada"),
//            "remote_ip":sessionStorage.getItem("ipPublica")
    }
    ],
     "eetemp": [
      {
        "piitcont__cod": 0, 
        "picclc__cod": "*"
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
            mapData = newname;
        }
    };
    this.getMapData= function () {
        return mapData;
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

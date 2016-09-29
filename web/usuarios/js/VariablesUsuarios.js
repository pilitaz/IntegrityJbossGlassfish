//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
 function sirconsulta() {
    var urlSir = "http://190.144.16.114:8810"+ "/rest/Base/BaseIntegrity/" +"SirUsuarios";
    var json = {  
     "dsee_user2":{  
      "eeDatos":[  
      {  
        "picusrcod":"jorgereita1",
        "picfiid":"80019884934504174879",
        "local_ip":"172.21.24.105",
        "remote_ip":"190.144.16.114"
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
    
};

///////////////////////////////////////////////////////////////////////////////////////
function cudcreate () {

    var urlCud = "http://190.144.16.114:8810/"+ "rest/Base/BaseIntegrity/" +"SicudUsuarios";
    var json = {  
       "dsee_user2":{  
          "eeDatos":[  
             {  
                "picusrcod":"jorgereita1",
                "picfiid":"80019884934504174879",
                "local_ip":"172.21.24.105",
                "remote_ip":"190.144.16.114"
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

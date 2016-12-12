/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para la lista de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaPedidos() {
    var mapData = "eegpd_ped";
    var urlSir = ipServicios + baseComercial + "SIRgpd_ped";
    var json = {
            "dsgpd_ped": {
		"eeDatos":[
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eetemp": [
                {
                    "picsuc__cod": "*",
                    "picclc__cod": "*",
                    "pidped__fec": "?",
                    "piiped__num": 0,
                    "picusuario": "*"
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
//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para Editar Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function siCudPedidos() {
    var mapData = "eesic_tcont";
    var urlSir = ipServicios + baseParameters + "SICUDsic_tcont";
    var json = {
        "dssic_tcont": {
            "eeDatos": [{
                "picusrcod": sessionStorage.getItem("usuario"),
                "fiid": sessionStorage.getItem("picfiid")
            }],
            "eesic_tcont": [{
                "clc__cod": "",
                "form__cod": 0,
                "mnd__ext": false,
                "tcont__cod": 0,
                "tcont__des": "",
                "tcont__est": 0,
                "tcont__fac": false,
                "tcont__form": "",
                "tcon_dif": false,
                "ter__reg ": ""
            }]
        }
   }

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

/**
 * Funcion para obtener la url y el json de entrada para la lista de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaSucursal() {
    var mapData = "eesic_suc";
    var urlSir = ipServicios + baseParameters + "SIRSucursalagencia";
    var json = 
            {  
   "dssic_suc":{  
      "eeDatos":[  
         {  
            "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
//                  "local_ip":sessionStorage.getItem("ipPrivada"),
//                  "remote_ip":sessionStorage.getItem("ipPublica")
         }],
      "eetemp": [
      	{
          "piccia_nit": ""
      	}]
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

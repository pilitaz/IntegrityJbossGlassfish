/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para la lista de Precios
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SIRgpr_lis() {
    var mapData = "eegpr_lis";
    var urlSir = ipServicios + baseComercial + "SIRgpr_lis";
    var json = {
        "dsSIRgpr_lis": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRgpr_lis": [
                {
                    "picart_cod": "*",
                    "piicla_cod": 0,
                    "piilis_num": 0,
                    "picmnd_cla": "*",
                    "piilis_est": 0
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
 * Funcion para obtener la url y el json de entrada para el detalle de lista de Precios
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function SIRgpr_lis_det() {
    var mapData = "eegpr_lpd";
    var urlSir = ipServicios + baseComercial + "SIRgpr_lis_det";
    var json = {  
   "dsSIRgpr_lis_det":{  
      "eeDatos":[  
         {  
            "picusrcod":"amonserrate",
            "picfiid":"982606324590544896",
            "local_ip": sessionStorage.getItem("ipPrivada"),
            "remote_ip": sessionStorage.getItem("ipPublica")
         }
      ],    
      "eeSIRgpr_lis": [
          {
            "picart_cod": "*",
            "piicla_cod": 0,
            "piilis_num": 0,
            "picmnd_cla": "*",
            "piilis_est": -1
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
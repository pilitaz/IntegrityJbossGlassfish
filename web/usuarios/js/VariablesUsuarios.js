//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirEjemplo () {
    var urlSir = ipServicios + baseServicio +"/SIRsic_por";
    var dataInputSir = {
        "dssic_por": {
            "SIRsic_por": [
                {
                    "piipor_cod": numero
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
    
    this.setdataInputSir = function (newname) {
        if (newname) {
            dataInputSir = newname;
        }
    };
    this.getdataInputSir = function () {
        return dataInputSir;
    };
    
};

///////////////////////////////////////////////////////////////////////////////////////
function cudEjemplo () {
//  var urlCud = "http://190.144.16.114:8810/rest/Base/BaseIntegrity/SICUDsic_por";
    var urlCud = ipServicios + baseServicio +"/SICUDsic_por";
    var dataInputCud = {
        "dssic_por": {
            "eesic_por": [
                {
                    "por__bas": "",
                    "por__cod": "",
                    "por__des": "",
                    "por__est": 0
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
    
    this.setdataInputCud = function (newname) {
        if (newname) {
            dataInputCud = newname;
        }
    };
    this.getdataInputCud = function () {
        return dataInputCud;
    };
};

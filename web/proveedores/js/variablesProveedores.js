//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirProveedores() {
   var urlSir = ipServicios + baseContabilidad + "SIRcon_prvBYnitandraz";
    var json = {  
   "dsSIRcon_prv":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
		"SIRcon_prv": [{
			"picter__nit": "",
			"picter__raz": ""
			
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
    
};
////////////////////////////////////////////////////////////////////////
function sirCiudades() {
    var urlSir = ipServicios + baseContabilidad +"SIRsic_ciu";
    var json = {  
   "dsSIRsic_ciu":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
		"eeSIRsic_ciu": [{
			"picciu_cod": "*"
			
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
    
};
////////////////////////////////////////////////////////////////////////
function sirProveedor() {
    var urlSir = ipServicios + baseContabilidad +"SIRcon_prv";
    var json = {
 "dsSIRcon_prv": {
  "eeDatos": [{
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
  }],
   "eeSIRcon_prv": [{
   "piibco_cod1": 0,
   "picdpto_cod": "*",
   "picter_nit": "*",
   "picter_raz": "*",
   "piiprv_est": -1
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
    
};
////////////////////////////////////////////////////////////////////////
function sirFormapago() {
    var urlSir = ipServicios + baseContabilidad +"SIRsic_fpag";
    var json = {
 "dsSIRsic_fpag": {
  "eeDatos": [{
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
  }],
  "SIRsic_fpag": [{
   "piipag__cod":0
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
    
};
///////////////////////////////////////////////////////////////
function sirConsultaTercero() {
    var mapData = "eesic_ter";
    var urlSir = ipServicios + baseParameters + "SIRsic_ter";
    var json = 
           {  
   "dsSIRsic_ter":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
  "eeSIRsic_ter": [{
       "picter_nit": "",
       "picter_raz": "",
       "piiter_est": -1
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
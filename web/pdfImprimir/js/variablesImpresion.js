
//-------------------------------------------------------------------------
function sirImpresion() {
    var urlSir =  "http://190.144.16.114:8810/rest/Contab/SIRImprcertretECU";
    var json ={  
   "dscertret":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
     ],
       "Sircertret":[  
         {  
            "piiretdesde":"",
            "piirethasta":"",
            "pidfecimpr":""
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
//-----------------------------------------

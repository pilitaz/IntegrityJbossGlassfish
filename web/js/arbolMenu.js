/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function cargarArbol() {
    try {
        $(function () {
            try {
                $('#jstree2').jstree(JSON.parse(sessionStorage.getItem("txtJson2")));
                if (sessionStorage.getItem("pcfAct")) {
                    $('#jstree2').jstree(true).select_node(sessionStorage.getItem("pcfAct"));
                }
            } catch (e) {
                alert("funcion Arbol: el json que recibe no es correcto ----" + e.message);
            }
            var to = false;
            $('#inpSearch').keyup(function (e) {
                debugger
              if(to) { clearTimeout(to); }
              to = setTimeout(function () {
                var v = $('#inpSearch').val();
                //$('#jstree2').jstree(true).search(v);
                $('#jstree2').jstree('search', v);
              }, 250);
            });
            $('#jstree2').on('dblclick', function () {
                if (sessionStorage.getItem("cabeceraLast") || (sessionStorage.getItem("cabeceraNew")) || (sessionStorage.getItem("cabeceraTitu")) || (sessionStorage.getItem("cabeceraLlaves"))) {
                    sessionStorage.removeItem('cabeceraTitu');
                    sessionStorage.removeItem('cabeceraNew');
                    sessionStorage.removeItem('cabeceraLlaves');
                    sessionStorage.removeItem('cabeceraLast');
                }
                var id = $('#jstree2').jstree(false).get_selected();
                var id = $('#jstree2').jstree(true).get_selected();
                sessionStorage.setItem("pcfAct", id);
                sessionStorage.setItem("ncf", $('#jstree2').jstree(true).get_text($('#jstree2').jstree(true).get_selected()))
                for (var i = 0; i < id.length; i++) {
                    if ($('#jstree2').jstree(true).is_open(id[i])) {
                        $('#jstree2').jstree(true).close_node(id[i]);
                    } else {
                        $('#jstree2').jstree(true).open_node(id[i]);
                    }
                    if (!$('#jstree2').jstree(true).is_parent(id[i])) {
                        var texto = id[i];
                        var portaf = texto.split("P");
                        sessionStorage.setItem("portafolio", portaf[0]);
                        parent.fijarPcf(sessionStorage.setItem("pcf", texto));
                    }
                }
            });
        });
    } catch (err) {
        alert(err);
    }
}


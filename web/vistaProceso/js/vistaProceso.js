$(document).ready(function() {
    var tooltip = $("#agglomerations").kendoTooltip({
        filter: "a",
        width: 200,
        position: "top"
    }).data("kendoTooltip");
    
    $("#agglomerations").find("a").click(false);
});
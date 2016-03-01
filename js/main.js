$(document).ready(function() {
	var headerClasses = "col-xs-5 col-sm-2 col-sm-offset-2 col-md-2 col-md-offset-2 col-lg-2 col-lg-offset-2 text-right"
	var pClasses = "col-xs-7"
  $.getJSON("js/data.json", function(data) {
		console.log(data.mainInfo)
		$.each(data.mainInfo, function(key, value) {
			console.log(data.mainInfo)
			console.log(key, value)
			console.log(typeof(value))
			$(".mainContent").append('<header id="' + key + '">' + key + '</header>');
			$(".mainContent>header").wrap('<div class="row"></div>');
			$(".mainContent>div.row>header").addClass(headerClasses);
			if (typeof(value) === "object") {
				$.each(value, function(key1, value1) {
					$(".mainContent>div.row>header" + "#" + key).after('<p><a href="' + value1 + '">' + key1 + '"</a></p>');
				});
			}
			else {
				$(".mainContent>div.row>header" + "#" + key).after("<p>" + value + "</p>");
			};
			$(".mainContent>div.row>p").addClass(pClasses);
		});
	});	
});
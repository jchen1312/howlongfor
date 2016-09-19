//-------------Done------------
var url_base="http://wwwp.cs.unc.edu/Courses/comp426-f15/users/sclewis/Codiad/workspace/cs426/Final%20Project/HLFP.php";

$(document).ready(function(){

	$("form").submit(function(e){
		e.preventDefault();
		$.ajax({url:url_base+"/submit",
			type:"POST",
			data:$(this).serialize(),
			success:function(data,status,jqXHR){//get list of reviews
				$('div.submitContainter').empty();
				$('div.submitContainter').html("<div>Sucessful Submission</div>");
			},
			error:function(jqXHR, textStatus, errorThrown){
				$('div.submitContainter').empty();
				$('div.submitContainter').html("<div>Try Again</div>");
			}

		});
		/*
		$('div.submitContainter').empty();
		$('div.submitContainter').html("<div>Sucessful Submission</div>");*/
	});

});
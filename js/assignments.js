//----------------------------DONE-------------------------------
var url_base="http://wwwp.cs.unc.edu/Courses/comp426-f15/users/sclewis/Codiad/workspace/cs426/Final%20Project/HLFP.php";
var diff=0,avg,cont=0,asTime=0,avgTime,sTime=10000,lTime=0,avgMin,sMin,lMin,lHr,sHr;
var first=true;//also have rid and aid
var last=false;
$(document).ready(function(){
	
	var aid=getUrlParameter('id');
	//alert(aid);
	$.ajax({url:url_base+"/review/assignment/"+aid,//gets all reviews
	    	type:"GET",
			dataType:"json",
	    	success:function(reviews,status,jqXHR){//get list of reviews
				for(var i=0;i<reviews.length;i++){
					if(i==reviews.length-1){
						last=true;
					}
					parse_reviews(reviews[i]);
				}
			}
	    });
	//SUBMIT REVIEW
	
});
var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;
	
	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');
	
	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
var parse_reviews=function(parsereview){
	    var review=JSON.parse(parsereview);
		var grade,time,difficulty,comment,cname,pname,semester,number;
		grade=review.grade;
		time=review.time;
			    console.log(time);

		difficulty=review.difficulty;
		comment=review.comment;
		cname=review.cname;
		pname=review.pname;
		semester=review.semester;
		number=review.number;
		var r = new Review(grade,time,difficulty,comment,cname,pname,semester,number);
		calcStats(r);
		if(first){
			load_details(r);
			first=false;
		}
		if(last){
		load_stats(r);
		last=false;
		}
		load_comments(r);
	//	$('#details_wrapper').append(r.makeDiv());
};
var calcStats=function(review){
	diff=diff+review.difficulty;
	asTime=asTime+review.time;
	cont++;
	avg=diff/cont;
	avg=Math.round(avg * 100) / 100;
	avgTime=asTime/cont;
	avgTime=Math.floor(avgTime/60);
	avgMin=Math.floor((asTime/cont)%60);
	if(review.time<sTime){
		sTime=review.time;
		sMin=Math.floor(sTime%60);
		sHr=Math.floor(sTime/60);
	}

	console.log("review.time"+review.time);
	console.log("stime"+sTime);

	if(review.time>lTime){
		lTime=review.time;
		lMin=Math.floor(lTime%60);
		lHr=Math.floor(lTime/60);
	}

	console.log("review.time"+review.time);
	console.log("ltime"+lTime);

};

var load_details=function(review){
	var cDiv=$("<div></div>");    
	cDiv.addClass('details');
	cDiv.attr('id', 'class');
    cDiv.html("<b>Class: </b>"+review.cname);
    cDiv.data('details', this);
	$('#details_wrapper').append(cDiv);
	
	var pDiv=$("<div></div>");    
	pDiv.addClass('details');
	pDiv.attr('id', 'prof');
    pDiv.html("<b>Prof: </b>"+review.pname);
    pDiv.data('details', this);
	$('#details_wrapper').append(pDiv);
	
	var tDiv=$("<div></div>");    
	tDiv.addClass('details');
	tDiv.attr('id', 'term');
    tDiv.html("<b>Term: </b>"+review.semester);
    tDiv.data('details', this);
	$('#details_wrapper').append(tDiv);

};
var load_stats=function(review){
	var difDiv=$("<div></div>");    
	difDiv.addClass('assignment_stats');
	difDiv.attr('id', 'difficulty_avg');
    difDiv.html("<b>Difficulty Rating: </b>"+avg);
    difDiv.data('assignment_stats', this);
	$('#a_stats').append(difDiv);
	
	var avTDiv=$("<div></div>");    
	avTDiv.addClass('assignment_stats');
	avTDiv.attr('id', 'avg_time');
    avTDiv.html("<b>Average Time: </b>"+avgTime +" hrs "+avgMin+"  minutes");
    avTDiv.data('assignment_stats', this);
	$('#a_stats').append(avTDiv);
	
	var sTDiv=$("<div></div>");    
	sTDiv.addClass('assignment_stats');
	sTDiv.attr('id', 'short_time');
    sTDiv.html("<b>Shortest Time: </b>"+sHr +" hrs "+sMin+"  minutes");
    sTDiv.data('assignment_stats', this);
	$('#a_stats').append(sTDiv);
	
	var lTDiv=$("<div></div>");    
	lTDiv.addClass('assignment_stats');
	lTDiv.attr('id', 'long_time');
    lTDiv.html("<b>Longest Time: </b>"+lHr +" hrs "+lMin+"  minutes");
    lTDiv.data('assignment_stats', this);
	$('#a_stats').append(lTDiv);
};
var load_comments=function(review){
	var cmTDiv=$("<div></div>");    
	cmTDiv.addClass('assignment_comment');
	cmTDiv.attr('id', 'comment');
    cmTDiv.html("<b>"+review.grade+" | </b> "+review.comment);
    cmTDiv.data('assignment_comment', this);
	$('#a_comments').append(cmTDiv);
};
var Review=function(grade,time,difficulty,comment,cname,pname,semester,number){
	this.grade=grade;
	this.time=time;
	this.difficulty=difficulty;
	this.comment=comment;
	this.cname=cname;
	this.pname=pname;
	this.semester=semester;
	this.number=number;
};

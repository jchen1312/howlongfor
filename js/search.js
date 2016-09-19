//-----------------------DONE----------------------
var url_base="http://wwwp.cs.unc.edu/Courses/comp426-f15/users/sclewis/Codiad/workspace/cs426/Final%20Project/HLFP.php";

$(document).ready(function(){
	var input, intype,sortby,filter;
	var parameter;
	var GET = {};
         var queryString = window.location.search.replace(/^\?/, '');
         queryString.split(/\&/).forEach(function(keyValuePair) {
             var paramName = keyValuePair.replace(/=.*$/, ""); 
             var paramValue = keyValuePair.replace(/^[^=]*\=/, ""); 
             GET[paramName] = paramValue;
         });
         
         if(GET["main_search"] === undefined) {
         	GET["main_search"] = "";
         	}
         	GET["main_search"] = GET["main_search"].replace('+', ' ');
         	document.getElementById("search").getElementsByTagName("input")[0].value = GET["main_search"];
		
		
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

		if(getUrlParameter('submitted')==2){
			$('div.results').empty();
			input=$("#searchbox").val();
			intype=$("#select").val();
			sortby=$("#sortopt").val();
			filter=$("#filteropt").val();
		   $.ajax({url:url_base+"/search/"+intype+"/"+input,
			 	type:"GET",
				dataType:"json",
			  	success:function(classes,status,jqXHR){//get list of classes
					for(var i=0;i<classes.length;i++){
						load_classes(classes[i]);
						//console.log(classes[i]);
					}
				},
				error:function(jqXHR, textStatus, errorThrown){
					alert(errorThrown);
				}
			});
		}
	
	$("#search").submit(function(e){
		$('div.results').empty();
		e.preventDefault();
		input=$("#searchbox").val();
		intype=$("#select").val();
		sortby=$("#sortopt").val();
		filter=$("#filteropt").val();
	    $.ajax({url:url_base+"/search/"+intype+"/"+input,
	    	type:"GET",
			dataType:"json",
	    	success:function(classes,status,jqXHR){//get list of classes
				for(var i=0;i<classes.length;i++){
					load_classes(classes[i]);
					//console.log(classes[i]);
				}
			},
			error:function(jqXHR, textStatus, errorThrown){
				alert(errorThrown);
			}
	    });
	    /*----------------click on reset to clear page-----------------------------*/
	  $("#s_reset").click(function(e){
	  		$("div.results").empty();
	  });
	    /*--------------click on each assignment link to--------------------*/
	});
	$('div.results').on("click",'div.result_clas',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		var cid=e.target.id;
		$('div.results').empty();
		//alert('clicked on class');
	    $.ajax({url:url_base+"/section/class/"+cid,
			type:"GET",
			dataType:"json",
			success:function(sections,status,jqXHR){
				//alert("ajax");
				//$('#browse_wrapper').empty();
				for (var i=0; i<sections.length; i++) {
		    	//display individual sections
		    	load_section(sections[i]);
		    	//console.log(sections[i]);
		    }  
			}
		});
	});
	$('div.results').on("click",'div.result_sect',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		var sid=e.target.id;
		$('div.results').empty();
		//alert('clicked on class');
	    $.ajax({url:url_base+"/assignment/section/"+sid,
			type:"GET",
			dataType:"json",
			success:function(assignments,status,jqXHR){
				//alert("ajax");
				for (var i=0; i<assignments.length; i++) {
		    	//display individual sections
		    	load_assign(assignments[i]);
		    	//console.log(sections[i]);
		    }  
			}
		});
	});
	$('div.results').on("click",'div.result_assign',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		var aid=e.target.id;
		var redirect="http://wwwp.cs.unc.edu/Courses/comp426-f15/users/sclewis/Codiad/workspace/cs426/Final%20Project/assignment.html?id="+aid;
		//console.log(redirect);
		window.location.assign(redirect);
	});

});
var load_assign=function(assign){
	    //alert("loading sections");
	    var assignments=JSON.parse(assign);
		var semester, sid, number, cname,pname,aid;
		semester=assignments.semester;
		number=assignments.number;
		cname=assignments.cname;
		sid=assignments.sid;
		pname=assignments.pname;
		aid=assignments.aid;

        //alert(semester);
		var a = new Assignments(semester,number,cname,sid,pname,aid);
		//alert("load class"+name);
		//$('div#'+did).append(c.makeDiv())
		
		$('div.results').append(a.makeDiv());

};
var Assignments=function(semester,number,cname,sid,pname,aid){
	this.semester=semester;
	this.number=number;
	this.cname=cname;
	this.sid=sid;
	this.pname=pname;
	this.aid=aid;
}
Assignments.prototype.makeDiv=function(){
	var aDiv=$("<div></div>");
    aDiv.addClass('result_assign');
    aDiv.attr('id', this.aid);//????what id to use
    aDiv.html("Assignment "+this.number);
    aDiv.data('result_assign', this);
    return aDiv;
}
var load_section=function(sections){
	    //alert("loading sections");
	    var parsesect=JSON.parse(sections);
		var semester, sid, cid, pid,pname;
		semester=parsesect.semester;
		pid=parsesect.pid;
		cid=parsesect.cid;
		sid=parsesect.sid;
		pname=parsesect.pname;
        //alert(semester);
		var s = new Section(semester,pid,cid,sid,pname);
		//alert("load class"+name);
		//$('div#'+did).append(c.makeDiv())
		
		$('div.results').append(s.makeDiv());
};
var Section=function(semester,pid,cid,sid,pname){
	this.semester=semester;
	this.pid=pid;
	this.cid=cid;
	this.sid=sid;
	this.pname=pname;
}
Section.prototype.makeDiv=function(){
	var sDiv=$("<div></div>");
    sDiv.addClass('result_sect');
    sDiv.attr('id', this.sid);
    sDiv.html(this.pname+" - "+this.semester);
    sDiv.data('result_sect', this);
    return sDiv;
}
var load_classes=function(classes){
   var clas=JSON.parse(classes);
   var name, did,cid;
    name=clas.name;
    did=clas.did;
    cid=clas.cid;
   
    var c = new Classes(name,did,cid);
    console.log(name);
	$('div.results').append(c.makeDiv());
};
var Classes=function(name,did,cid){
	this.name=name;
	this.cid=cid;
	this.did=did;
};
Classes.prototype.makeDiv=function(){
	var cDiv=$("<div></div>");
    cDiv.addClass('result_clas');
    cDiv.attr('id', this.cid);//????what id to use
    cDiv.html(this.name);
    cDiv.data('result_clas', this);
    return cDiv;
};

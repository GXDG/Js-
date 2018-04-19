var eg={}
eg.AJAX=function(config,callback){
	var xmlhttp=new XMLHttpRequest()
	if (xmlhttp) {

		if (config.ISASYN) {
			xmlhttp.onreadystatechange=function(){
				if (xmlhhtp.readyState==4 && xmlhttp.status) {}
			}
		}
	}
}
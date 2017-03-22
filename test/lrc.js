function lrcParser(data){
//LRC Parsing
//Split the Data into Arrays
var _arrayOfLrc=data.split("\n");

var _LRC={
 meta:{},
 text:[],
 lyrics:[]
 
};

function timer2Second (strTime) {
    var tp = strTime.match(/([0-9]+?):([0-9]+?)\.([0-9]+)/);
    var timeSencond = parseInt(tp[1])*60+parseInt(tp[2])+parseInt(tp[3])*0.01;
	return timeSencond;
}

_arrayOfLrc.forEach(function(item,index,ar){
    //Meta Data
    		var metaData=/\[(\D+):(\D+)\]/;
            var textData=/^(\w+)/;
            var timeData=/^(\[\d+:\d+\.\d+\]|\[\d+:\d+\])(.+)/;
    //Meta Data        
	if(metaData.test(item)){
		var d=metaData.exec(item);
        _LRC.meta[d[1]]=d[2];
       
	}
    else if(textData.test(item)){
        _LRC.text.push(textData.exec(item)[1]);
    }
    else if(timeData.test(item)){
       var data=timeData.exec(item);
       _LRC.lyrics.push({'time':timer2Second(data[1]),'lyrics':data[2]});
       data=null; //clean
        
    }
   
});

return _LRC;
}

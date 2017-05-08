import './toutiao.less';
var toutiaoTemplate=require('./toutiao.hbs');
var $=require('../../lib/jquery-1.11.1.js');
// 数据
 $.ajax({
    type: "get",
    data: "random=" + Math.random(),
    url:"http://toutiao.com/api/article/olympic/?format=json",
    dataType:"jsonp",
    jsonp: "callback",
    success: function(dd) {
        var title=dd.title,data = dd.data,itemListArr=[];
	    $.each(data, function(i) {
	        $.each(data[i], function(j) {
	            if (data[i][j].title && data[i][j].datetime) {
	            	itemListArr.push({display_url:data[i][j].display_url,datetime:data[i][j].datetime,title:data[i][j].title})
	              }
	        });
	    });
	    var dd=sessionStorage.setItem("dd",JSON.stringify({title:title,itemList:itemListArr}));
    }
});
var tt=toutiaoTemplate(JSON.parse(sessionStorage.getItem("dd")));
module.exports = tt;



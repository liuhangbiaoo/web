import './less/index.less';
import bar from './es6/bar';

import top from './es6/top.es6';

// var bookListingTemplate=require('./hbs/head.hbs');
// var toutiao=require('./component/toutiao/toutiao');
var tt=require('./component/header/head');


document.getElementById("app").innerHTML=tt;

bar();
top();
// // append(toutiao)
// // append(tt)

// // function append(str){
// // 	document.addEventListener("DOMContentLoaded", function() {
// // 		var div = document.createElement('div');
// // 		div.innerHTML=str;
// // 		document.body.appendChild(div);
// // 	});
// // }
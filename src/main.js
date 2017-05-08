import './less/index.less';
import bar from './es6/bar';

import top from './es6/top.es6';

// var bookListingTemplate=require('./hbs/head.hbs');
var toutiao=require('./component/toutiao/toutiao');
var tt=require('./component/header/head');


bar();
top();

// document.addEventListener("DOMContentLoaded", function() {
// 	var div = document.createElement('div');
// 	div.innerHTML=tt;
// 	// div.innerHTML = bookListingTemplate({
// 	// 	username: "test",
// 	// 	books: [
// 	// 		{ title: "A book", synopsis: "With a description" },
// 	// 		{ title: "Another book", synopsis: "From a very good author" },
// 	// 		{ title: "Book without synopsis" }
// 	// 	]
// 	// });
// 	document.body.appendChild(div);
// });

append(toutiao)
append(tt)
function append(str){
	document.addEventListener("DOMContentLoaded", function() {
		var div = document.createElement('div');
		div.innerHTML=str;
		document.body.appendChild(div);
	});
}
var headTemplate=require('./head.hbs');
var tts=require('../toutiao/toutiao');
var tt=headTemplate({
		tko:tts,
		username: "test",
		books: [
			{ title: "A book", synopsis: "With a description" },
			{ title: "Another book", synopsis: "From a very good author" },
			{ title: "Book without synopsis" }
		]
});
module.exports = tt;
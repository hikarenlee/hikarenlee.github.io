function configureSinglePage() {
	$('head')
		.prepend($('<link rel="stylesheet" type="text/css" href="../style.css">'))
		.prepend($('<link href="https://fonts.googleapis.com/css?family=Raleway:300,600,700&display=swap" rel="stylesheet">'))
		.prepend($('<link rel="stylesheet" href="../fontawesome/css/all.css" media="all">'))
		.prepend($('<link rel="stylesheet" type="text/css" href="../case-study-page.css">'))
		.prepend($('<meta charset="UTF-8">'))
		.prepend($('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">'))
		.prepend($('<meta name="author" content="Brian Donahue">'))
		.prepend($('<meta name="description" content="UX, web design, & front-end development portfolio for Brian Donahue, Product Designer based in Silicon Valley, California">'))
		.prepend($('<meta name="keywords" content="product,product design,manager,UX,UX design,UX designer,user experience,design,designer,UI,HTML,CSS,JavaScript,Illustrator,Adobe,Photoshop,freelance,contractor,developer,front-end,front end,portfolio,graphic design,graphics,web,web development,for hire,resume,jQuery,storyboarding,prototyping,research,user research,researcher,information architecture,taxonomy">'))
		.prepend($('<meta name="format-detection" content="telephone=no">;'));

	$('.case-study')
		.prepend($('<nav><i class="fa fa-angle-left"></i> <a href="../index.html">Back to portfolio</a></nav>'))
		.append('<footer><p>Made by B Donahue</p><p><a href="https://linkedin.com/in/donahuebrian" target="_blank"><i class="fab fa-linkedin fa-2x" aria-label="linkedin"></i></a> &bullet; <a href="mailto:brimwd@gmail.com"><i class="fad fa-mailbox fa-2x" aria-label="email"></i></a> &bullet; <a href="sms:971-222-9892"><i class="fas fa-sms fa-2x" aria-label="email"></i></a></p></footer>');

	// handle redirect hashes
	switch(location.hash) {
		case '#dynamicLoadFailed' :
			// handle case
			console.log(location.hash);
			break;
		case '#asyncError' :
			// handle case
			console.log(location.hash);
			break;
	}
	history.replaceState(null, document.title, window.location.pathname);
}

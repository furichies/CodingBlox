 <html>
	 <head>
	 <title>Bloques</title>
	 </head>
	 <body>
Hola
 <?php

   $cat = $_GET["lang"];

   if (isset($cat)){
 
	   switch($cat):
		   case "en":
				header("Location: en.html");
				break;
		   case "es":
				header("Location: es.html");
				break;
		   default:
				header("Location: es.html");
				break;
		   
		   endswitch;
   
	} else { 
		header("Location: es.html");
		 }
   ?>
   </body>
   </html>

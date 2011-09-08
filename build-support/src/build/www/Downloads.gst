<%@ params(latest : String) %>
<html>

<head>
  <title>The Gosu Programming Language</title>
  <link rel="stylesheet" type="text/css" href="gosu.css"/>
  <SCRIPT language="JavaScript" SRC="javascript/javascript.js"></SCRIPT>
</head>

<body>
<!--#include virtual="header.html" -->

      <h1>Downloads</h1>
      <h2>Latest Stable:</h2>
      <a href="#" onClick="if(navigator.appVersion.indexOf('Win') == -1) { 
                                    this.href = '${latest}.tgz'
                                  } else {
                                    this.href = '${latest}.zip'
                                  }                                  
                                  return confirm('By downloading this software I confirm and accept the Gosu Terms of Use')"><img src="images/btn_download.png"/></a>
      <h2>Instructions:</h2>
      <ul>
	<li>Download</li>
	<li>Unzip to a directory</li>
	<li>Ensure that you have Java installed (version 1.5 or greater)</li>
	<li>From the command line, run bin/gosu.sh (on Unix) or bin/gosu.cmd (on Windows)</li>
	<li>Read a bit about how to get started with the built-in editor and a simple Gosu project file structure on <a href="http://metapete.blogspot.com/2011/05/setting-up-gosu-project.html"> this blog </a></li>
	<li><a href="doc/wwhelp/wwhimpl/api.htm?&context=gosu&src=getting-started-gosu-opensource&topic=Getting_Started_with_Gosu">Browse the Gosu documentation 'Getting Started'</a> chapter with complete installation instructions</li>
	<li><a href="doc/wwhelp/wwhimpl/api.htm?&context=gosu&src=intro&topic=Welcome_to_Gosu">Complete introduction to the Gosu language</a> in the documentation.
      </ul>

</li>
      <h2>Nightlies:</h2>

<!--#include virtual="footer.html" -->

</body>
<SCRIPT>setNav('download');</SCRIPT>
</html>


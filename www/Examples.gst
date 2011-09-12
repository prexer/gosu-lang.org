<%@ params(examples : java.util.List<String>) %>
<html>

<head>
  <title>The Gosu Programming Language</title>
  <link rel="stylesheet" type="text/css" href="gosu.css"/>
  <SCRIPT language="JavaScript" SRC="javascript/javascript.js"></SCRIPT>
</head>

<body>
<!--#include virtual="header.html" -->
<h1>Examples</h1>
<ul>
<% for( s in examples.sort() ) { %>
  <li style="margin:8px"><a href="examples/${s}.zip">${s}</a></li>
<% } %>
</ul>
<!--#include virtual="footer.html" -->
</body>
<SCRIPT>setNav('documentation');</SCRIPT>
</html>


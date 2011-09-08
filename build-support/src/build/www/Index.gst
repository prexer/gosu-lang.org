<%@ params(latest : String) %>
<html>
<head>
  <title>The Gosu Programming Language</title>
  <link rel="stylesheet" type="text/css" href="gosu.css"/>
  <SCRIPT language="JavaScript" SRC="javascript/javascript.js"></SCRIPT>
  <SCRIPT language="JavaScript">
    var tab = "home";
  </SCRIPT>
</head>
<body>
<!--#include virtual="header.html" -->
      <h1>About Gosu</h1>
	  
      <div style="float: left;width: 320px;margin:16px">
        Gosu is a programming language for the Java Virtual Machine (JVM).  <br/><br/>
	Gosu
        <ul>
          <li>is object oriented</li>
          <li>is statically typed</li>
          <li>is imperative</li>
          <li>is 100% compatible with Java</li>
          <li>features type inference</li>
          <li>supports closures</li>
          <li>provides simplified generics</li>
          <li>is being used in production by <a href="http://www.guidewire.com/our_customers">multi-billion dollar companies around the globe</a></li>
		  <li>is provided via the <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License v2.0</a></li>
        </ul>
        <div style="text-align: center;">
            <a href="#"  onClick="if(navigator.appVersion.indexOf('Win') == -1) { 
                                    this.href = '${latest}.tgz'
                                  } else {
                                    this.href = '${latest}.zip'
                                  }                                  
                                  return confirm('By downloading this software I confirm and accept the Gosu Terms of Use')">
				<img src="images/btn_download.png"/>
			</a>
			
            <div style="padding-top: 10px;">
				<a href="intro.shtml">Learn More</a> | <a href="downloads.shtml">Installation Instructions</a>
			</div>
        </div>
       </div>

      <div style="float: left;margin:16px;">
	    <pre ${"class"}="code" style="width:400px;height:300px">
<span ${"class"}="code-comment">// Declare some data</span>
<span ${"class"}="keyword">var</span> minLength = 4
<span ${"class"}="keyword">var</span> strings = { <span ${"class"}="code-string">"yellow"</span>, <span ${"class"}="code-string">"red"</span>, <span ${"class"}="code-string">"blue"</span> }

<span ${"class"}="code-comment">// Slice and dice the data using blocks</span>
<span ${"class"}="keyword">print</span>( strings.where( \ s -> s.length() >= minLength )
              .sort()
              .join( <span ${"class"}="code-string">", "</span> ) )

<span ${"class"}="code-comment">// Use standard java ${"class"}es</span>
<span ${"class"}="keyword">var</span> someFile = new java.io.File( <span ${"class"}="code-string">"SomeFile.txt"</span> )

<span ${"class"}="code-comment">// But with shiny new methods</span>
someFile.write( strings.join( <span ${"class"}="code-string">"\n"</span> ) )
		</pre>
      </div>

<!--#include virtual="footer.html" -->

</body>
</html>


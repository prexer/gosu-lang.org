// JavaScript Document

function getElementsByClass( searchClass, domNode, tagName) {
    if (domNode == null) domNode = document;
    if (tagName == null) tagName = '*';
    var el = new Array();
    var tags = domNode.getElementsByTagName(tagName);
    var tcl = " "+searchClass+" ";
    for(i=0,j=0; i<tags.length; i++) {
        var test = " " + tags[i].className + " ";
        if (test.indexOf(tcl) != -1)
            el[j++] = tags[i];
    }
    return el;
}

function changeClass(b,a)
{
    var originalClass = getElementsByClass(b);
    for(i=0; i<originalClass.length; i++)
        originalClass[i].className = a;
}

function setNav(item) {
	changeClass('navItem_on','navItem');
	document.getElementById(item).className = "navItem_on";
}

var sfHover = function() {
	var sfEls = document.getElementsByTagName("span");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" hover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" hover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);

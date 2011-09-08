package build.spec

uses java.io.File
uses java.lang.StringBuilder
uses gw.xml.*
uses build.docbook.*
uses gw.util.GosuEscapeUtil
uses java.util.*

class SpecHTMLConverter {

  static var SIMPLE_MAPPING = {"span" -> { "abbrev", "annotation", "code", "emphasis", "glossterm", "subscript", 
                                           "nonterminal", "lhs", "rhs" },
                               "ul" -> { "itemizedlist" },
                               "li" -> { "listitem" },
                               "tr" -> { "row" },
                               "td" -> { "entry" }
                              }

  var _book : Book as Book
  var _classStrs : java.util.Set<String> as ClassStrs = new HashSet<String>() 

  function writeToFile( f : File ) {
    f.write( genHTML() )
  }
  
  function genHTML() : String {
    var html = new StringBuilder( genHeader() );
    for( p in _book.Part ) {
      for( c in p.Chapter ) {
        genChapter(html, c)
      }
    }
    html.append( genFooter() )
    return html.toString() 
  }
  
  function genChapter( html : StringBuilder, chapter : Chapter ) {
    html.append("<div class='${getClassStr(chapter)}'>\n")
    html.append("    ")
    div( html, getClassStr(chapter) + "-title", "<h1>${genElt( chapter.Title2.first() )}</h1>" )
    html.append("\n")
    for( elt in chapter.$Contents.where(\ c -> not (c typeis Title) ) ) {
      addElt( html, 1, elt )
    }
    html.append("</div>")
  }
    
  function genSection( html : StringBuilder, depth : int, node : Section ) {
    html.append("  <div class='${getClassStr(node)}'>\n")
    var headerSize = depth <= 3 ? depth + 1 : 4
    div( html, getClassStr(node) + "-title", "<h${headerSize}>${genElt( node.Title2.first() )}</h${headerSize}>" )
    html.append("\n")
    for( elt in node.$Contents.where(\ c -> not (c typeis Title) ) ) {
      addElt( html, depth + 1, elt )
    }
    html.append("  </div>")
  }

  //TODO cgross - collect glossary terms  
  function genGlossTerm( html : StringBuilder, depth : int, node : Glossterm ) {
    html.append("<span class='${getClassStr(node)}'>\n")
    for( elt in node.$Contents ) {
      addElt( html, depth + 1, elt )
    }
    html.append("</span>")
  }
  
  function genRemark( html : StringBuilder, depth : int, node : Remark ) {
    if(not node.$Text.startsWith("TODO") ) {
      html.append(" <div class='${getClassStr(node)}'>\n")
      for( elt in node.$Contents ) {
        addElt( html, depth + 1, elt )
      }
      html.append(" </div>")
    }
  }
  
  function genLink( html : StringBuilder, depth : int, node : Link ) {
    var href = ""
    if( node.Linkend != null ) {
      href = "#" + getId( node.Linkend )    
    } else if( node.Href != null ) {
      href = node.Href
    }

    html.append(" <a class='${getClassStr(node)}' href='${href}'>\n")

    for( elt in node.$Contents ) {
      addElt( html, depth + 1, elt )
    }

    html.append(" </a>")
  }
  
  function genTbody( html : StringBuilder, depth : int, node : Tbody ) {
    html.append(" <table class='${getClassStr(node)}'>\n")

    //TODO - gen header
    if( _lastTHead != null ) {
      var row = _lastTHead.Row.first()
      html.append(" <tr class='${getClassStr(row)}'>\n")
      for( e in row.Entry ) {
        html.append(" <th class='${getClassStr(e)}'>\n")
        for( elt in e.$Contents ) {
          addElt( html, depth + 1, elt )
        }
        html.append(" </th>\n")
      }
      html.append(" </tr>\n")
    }
     
    for( elt in node.$Contents ) {
      addElt( html, depth + 1, elt )
    }
    html.append(" </table>")
  }
  
  function genElt(node : XmlContent ) : String {
    var sb = new StringBuilder()
    addElt( sb, 0, node );
    return sb.toString()
  }
  
  var _lastTHead : Thead //TODO cgross - remove once there are parent pointers
  
  function addElt( html : StringBuilder, depth : int, node : XmlContent ) {
    if( node typeis XmlElement ) {
      maybeAddAnchor( html, node )
      if( node typeis Section ) {
        genSection( html, depth, node )
      } else if( node typeis Glossterm ) {
        genGlossTerm( html, depth, node )
      } else if( node typeis Remark ) {
        genRemark( html, depth, node )
      } else if( node typeis Link ) {
        genLink( html, depth, node )
      } else if( node typeis Thead ) {
        //ignore, is used in tBody
        _lastTHead = node
      } else if( node typeis Tbody ) {
        genTbody( html, depth, node )
        _lastTHead = null
        //TODO check with dgreen
//      } else if( node typeis Programlisting ) {
//        genProgramListing( html, depth, node )
      } else {
        var eltType = getSimpleElementMapping( node )
        if( eltType != null ) {
          html.append("<${eltType} class='${getClassStr(node)}'>")
          for( elt in node.Contents ) {
            addElt( html, depth + 1, elt )
          }
          html.append("</${eltType}>")
        } else {
          html.append("<div class='${getClassStr(node)}'>\n")
          for( elt in node.Contents ) {
            addElt( html, depth + 1, elt )
          }
          html.append("</div>")          
        }
      }
    } else if( node typeis XmlSimpleValue ) {
      html.append( GosuEscapeUtil.escapeForHTML( node.StringValue, false ) )
    }
  }
  
  function maybeAddAnchor( html : StringBuilder, node : XmlElement ) {
    var id = getId( node )
    if( id != null ) {
      html.append( "<a name='${id}'></a>" )
    }
  }
  
  function getId( node : XmlElement ) : String {
    return node.getAttributeValue( "{http://www.w3.org/XML/1998/namespace}id" )
  }
  
  function getSimpleElementMapping( node : XmlElement ) : String {
    return SIMPLE_MAPPING.entrySet().firstWhere(\ m -> m.Value.contains(node.QName.LocalPart) ).Key
  }
  
  function getClassStr( node : gw.xml.XmlElement ) : String{
    var classStr = "spec-" + node.QName.LocalPart
    _classStrs.add( classStr )
    return classStr
  }
  
  function div( html : StringBuilder, clazz : String, content : String ) {
    html.append("<div class='${clazz}'>").append( content ).append( "</div>" )
  }
  
  function genHeader() : String {
    return "<html>\n" +
    "<head>\n" +
    "  <title>The Gosu Programming Language</title>\n" +
    "  <link rel=\"stylesheet\" type=\"text/css\" href=\"gosu.css\"/>\n" +
    "  <link rel=\"stylesheet\" type=\"text/css\" href=\"gosu-spec.css\"/>\n" +
    "  <SCRIPT language=\"JavaScript\" SRC=\"javascript/javascript.js\"></SCRIPT>\n" +
    "  <SCRIPT language=\"JavaScript\">\n" +
    "    var tab = \"spec\";\n" +
    "  </SCRIPT>\n" +
    "</head>\n" +
    "<body>\n" +
    "<!--#include virtual=\"header.html\" -->\n" +
    "<div class=\"content\">\n" +
    "  <div class=\"mainPanel_top\"></div>\n" +
    "  <div class=\"mainPanel_middle\">\n" +
    "    <div class=\"mainPanel_content\">\n" +
    "      <h1>Spec</h1>\n" +
    "\n"
  }
  
  function genFooter() : String {
    return "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"mainPanel_bottom\"></div>\n" +
    "</div>\n" +
    "</body>\n" +
    "</html>"
  }

}

uses gw.xml.XmlElement

var xml = new XmlElement( "root" )
xml.addChild( new XmlElement( "child" ) { : Text = "text" } )
xml.print()
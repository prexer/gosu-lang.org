uses gw.xsd.w3c.xmlschema.Schema
uses javax.xml.namespace.QName

var schema = new Schema()
schema.Element[0].Name = "root"
schema.Element[0].Type = new QName( "tRoot" )
schema.ComplexType[0].Name = "tRoot"
schema.ComplexType[0].Sequence.Element[0].Name = "child"
schema.ComplexType[0].Sequence.Element[0].Type = new QName( "tChild" )
schema.SimpleType[0].Name = "tChild"
schema.SimpleType[0].Restriction.Base = schema.$Namespace.qualify( "string" )
schema.SimpleType[0].Restriction.Enumeration[0].Value = "value1"
schema.SimpleType[0].Restriction.Enumeration[1].Value = "value2"
schema.SimpleType[0].Restriction.Enumeration[2].Value = "value3"
schema.print()

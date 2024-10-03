const args = process.argv.slice(2);
if (args.length < 3) {
  console.error("usage <lon> <lat> <dist-in-meters>");
  process.exit(-1);
}
const lon = parseFloat(args[0]);
const lat = parseFloat(args[1]);
const dist = parseFloat(args[2]);
const minLon = lon - dist;
const maxLon = lon + dist;
const minLat = lat - dist;
const maxLat = lat + dist;
console.log(`
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX geof: <http://www.opengis.net/def/function/geosparql/>
PREFIX geor: <http://www.opengis.net/def/rule/geosparql/>
PREFIX sf: <http://www.opengis.net/ont/sf#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT distinct ?place ?agenda
WHERE {
  ?geometry geo:asWKT ?wkt .
  ?loc a <http://www.w3.org/ns/locn#Location>; <http://www.w3.org/ns/locn#geometry> ?geometry;<http://www.w3.org/2000/01/rdf-schema#label> ?place.
  ?loc prov:wasDerivedFrom ?geoDerivedFrom.
  ?agenda a besluit:BehandelingVanAgendapunt; prov:wasDerivedFrom ?aDerived.
  FILTER(geof:sfWithin(?wkt, "<http://www.opengis.net/def/crs/EPSG/0/31370> POLYGON((${minLon} ${minLat}, ${minLon} ${maxLat}, ${maxLon} ${maxLat}, ${maxLon} ${minLat}, ${minLon} ${minLat}))"^^geo:wktLiteral) && ?aDerived = ?geoDerivedFrom)
 }
`);

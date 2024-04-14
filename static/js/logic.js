var geojson
let data=statesData
//Define Map
let myMap = L.map("map-id", {
  center: [38.8283, -98.5795],
  zoom: 5
});
// Adding the tile layer
tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
function getColor(d) {
  return d > 1000 ? '#720058' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#B53389' :
         d > 100  ? '#C54B8C' :
         d > 50   ? '#9370DB' :
         d > 20   ? '#D473D4' :
         d > 10   ? '#E0B0FF' :
                    '#F2C1D1';
}
function style(feature) {
  return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  layer.bringToFront();
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}
console.log(statesData)


// console.log(data)

 geojson = L.geoJson(statesData).addTo(myMap);
//L.geoJson(statesData, {style: style}).addTo(map);



    geojson = L.geoJson(statesData, {
      style: style
      //onEachFeature: onEachFeature
  }).addTo(myMap);

data['features'].forEach(element => {
  
  let id = element.id
  let geometry = element.geometry
  let state = element.properties.name
  let populationDensity= element.properties.density
  let type = element.type


 

  
  // console.log(element.geometry.coordinates)
  d3.csv('static/js/state_data.csv').then((x)=>{
    // console.log(x)
    let recreational = ''
    let yearRecreactional = ''
    let medical= ''
    let yearMedical = ''
   
    x.forEach(item=>{

      if(state === item.State){
        recreational += item.Recreational
        yearRecreactional += item['RecYear']
        medical+=item.Medical
        yearMedical += item['MedYear']
        
      
        // console.log(state, '', recreational, '',  yearRecreactional, '', medical, '', yearMedical)
        // console.log('recreational ', item.Recreational)
      }

      
    }
)

    cannabisdata= {
        'type': type,
        'id' : id, 
        'properties': {
          'state': state,
          'density':populationDensity,
          'recreationalstatus': recreational,
          'medicalstatus': medical,
          'legalmedically': yearMedical,
          'legalrecreationally': yearRecreactional
  
        },
        "geometry": geometry
      }
      
    console.log(cannabisdata)
    function onEachFeature(features,layer) { 
      // layer.on({
      //   mouseover: highlightFeature,
      //   mouseout: resetHighlight,
      //   click: zoomToFeature
      // });
    
          layer.bindPopup(`<h3>${features.properties.state}</h3><hr><p>Recreational Status: ${features.properties.recreationalstatus}<br>Medical Status: ${features.properties.medicalstatus}<br>Recreational Year: ${features.properties.legalmedically}<br>Medical Year: ${features.properties.legalrecreationally}<br>Population Density: ${features.properties.density}</p>`)
        }
 
   geojson = L.geoJson(cannabisdata,{
     onEachFeature: onEachFeature,
     style: style
    //  pointToLayer: function(feature,latlng){
    //   return L.circle(latlng,{radius: feature.properties.density,
    //   fillColor: getColor(feature.properties.density)})}
     }
  //  style: function(feature){
  //   return{color: getColor(feature.properties.density)}
    

     
    ).addTo(myMap);

  //  L.geoJson(features).addTo(myMap);
 
}


);


  } // end of initial for each looping through leaflet json data

  ) // end of for each method




  






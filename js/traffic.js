//last 24-hours of data from Fremont Bridge bike traffic
var dataURL =
  "https://data.seattle.gov/resource/4xy5-26gy.json?$order=date%20desc&$limit=24";

function parseAsJSON(response) {
  return response.json();
}

function handleError(err) {
  console.error(err);
  alert(err.message);
}

function renderRecord(record) {
  //create a <tr> and <td> elements for each property
  var tr = document.createElement("tr");

  var cell = document.createElement("td");
  var day = moment(record.date);
  cell.textContent = day.format("MMMM Do, h:mm:ss a");
  tr.appendChild(cell);

  var cell = document.createElement("td");
  cell.textContent = record.fremont_bridge_nb;
  tr.appendChild(cell);

  var cell = document.createElement("td");
  cell.textContent = record.fremont_bridge_sb;
  tr.appendChild(cell);

  return tr;
}

function renderTable(data) {
  var tbody = document.querySelector(".table tbody");
  tbody.textContent = "";

  //`data` is an array of objects
  console.log(data);

  //loop over the array calling renderRecord()
  data.forEach(function(item) {
    var row = renderRecord(item);
    //for each record, and appending the returned
    //<tr> to the <tbody>
    tbody.appendChild(row);
  });
  //...
}

//fetch the data
fetch(dataURL)
  .then(parseAsJSON)
  .then(renderTable)
  .catch(handleError);

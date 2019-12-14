function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function(){
      getApi();
      $('#recipies').on('change',function(){
          var recipes = $('#recipies').val();
          eachrecipies(recipes);
      })
});
function getApi(){
    $.ajax({
        dataType:'json',
        url: getUrl(),
        success: (data) => chooserecipies(data.recipes),
        error: () => console.log("can not get recipies"),
    });
}
var allData = [];
function chooserecipies(recipes ){
    allData = recipes;
    var option = "";
    recipes.forEach(item =>{
     option += `
     <option value="${item.id}">${item.name}</option>
     `;
 });
 $('#recipies').append(option);
}
$('#dobplacate').hide();
$('#hide').hide();
$('#hid').hide();
function eachrecipies(id){
    allData.forEach(recipes =>{
        if(recipes.id == id){
           //show reciies
           showrecipies(recipes.name, recipes.iconUrl);
           //show ingreadian
            showingreadian(recipes.ingredients);
            // show intruction
            showintruction(recipes.instructions);


        }
    });
    $('#dobplacate').show();
    $('#hide').show();
    $('#hid').show();
}
function showrecipies(name, img,){
var result = "";
result +=`
    <img src="${img}" width = "40%" class="float-right">
    <h3>${name}</h3><br><br><br>
  
`;
$('#recipis-result').html(result);
}

function showingreadian(ing){
    var ingreadian = "";
    ing.forEach(element =>{
            ingreadian += `
              <tr>
              <td><img src= "${element.iconUrl}" width="40%"></td>
                <td>${element.quantity}</td>
                <td>${element.unit[0]}</td>
                <td>${element.name}</td>
                
              </tr>
            `;
            $('#table').html(ingreadian); 
    });
}
function showintruction(int){
    var instruction = "";
    var step = int.split("<step>");
     for(let i= 1; i<step.length; i++){
        instruction +=`
         <p class="text-primary"> step ${i} : </p>
         <p>${step[i]}</p>
        `;

     }
     $('#intructions').html(instruction);
}




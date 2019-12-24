// get return url
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    getApi();
    $('#recipies').on('change', function () {
        var recipes = $('#recipies').val();
        eachrecipies(recipes);
    });
    //click on add
    $("#add").on('click', function () {
        var number = parseInt($("#member").val());
        sum(number);
    });
    // click on decresse 
    $("#minus").on('click', function () {
        var number = parseInt($("#member").val());
        min(number);
    });
});
//Get API
function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooserecipies(data.recipes),
        error: () => console.log("can not get recipies"),
    });
}
// Get all data of recipes
var allData = [];
function chooserecipies(recipes) {
    allData = recipes;
    var option = "";
    recipes.forEach(item => {
        option += `
     <option value="${item.id}"> 
     <h3>${item.name}</h3> 
     </option>
     `;
    });
    $('#recipies').append(option);
}

$('#dobplacate').hide();
$('#cards').hide();
$('#intss').hide();
$('#footer').hide();
//Get Each data
function eachrecipies(id) {
    allData.forEach(recipes => {
        if (recipes.id == id) {
            //show reciies
            showrecipies(recipes.name, recipes.iconUrl);
            //show ingreadian
            showingreadian(recipes.ingredients);
            // show intruction
            showintruction(recipes.instructions);
            //getperson
            contain = recipes;
            oldGuest = recipes.nbGuests;

            $('#dobplacate').show();
            $('#cards').show();
            $('#intss').show();
        }
    });
}
$('#table').table.val();
//Get recipies
function showrecipies(name, img, ) {
    var result = "";
    result += `
    <img src="${img}" width = "50%" class="float-right img-fluid">
    <h4 class="text-light">${name}</h4><br><br><br>
`;
    $('#recipis-result').html(result);
    var headerRecipies = `
<h3 class="text-light">Number of recipies</h3><br>
`;
    $('#rep').html(headerRecipies);
}
// Get ingreadian
function showingreadian(ing) {
    var ingreadian = "";
    var headeringreadian = `
    <h2 class="text-center text-danger">Ingredients</h2>
    `;
    $('#in').html(headeringreadian);
    ing.forEach(element => {
        ingreadian += `
              <tr>
              <td><img src= "${element.iconUrl}" width="20%"></td>
                <td>${element.quantity}</td>
                <td>${element.unit[0]}</td>
                <td>${element.name}</td>
                
              </tr>
            `;
        $('#table').html(ingreadian);
        $('#footer').show();
    });
}
// condition of sum
function sum(number) {
    var add = parseInt(number) + 1;
    if (add <= 15) {
        $("#member").val(add);
        getPerson(add);
    }
}
//condition of minus
function min(number) {
    var min = parseInt(number) - 1;
    if (min >= 1) {
        $("#member").val(min);
        getPerson($('#member').val());
    }
}
// Get Step instruction
function showintruction(int) {
    var instruction = "";
    var headerInstruction = `
    <h2 class="text-center text-danger">Instruction</h2>
    `;
    $('#ist').html(headerInstruction);
    var step = int.split("<step>");
    for (let i = 1; i < step.length; i++) {
        instruction += `
         <p class="text-primary"> step ${i} : </p>
         <p>${step[i]}</p>
        `;

    }
    $('#intructions').html(instruction);
}
// Get new Person
function getPerson(person) {
    var divide;
    var newQuanlity;
    var result = "";
    contain.ingredients.forEach(element => {
        var { quantity, iconUrl, name, unit } = element;
        divide = quantity / oldGuest;
        newQuanlity = divide * person;
        result += `
        <table class="striped">
            <tr>
            <td><img src="${iconUrl}" style="width:50px"></td>
            <td id='quantity'>${newQuanlity}</td>
            <td>${unit[0]}</td>
            <td>${name}</td>
            </tr>
        </table>
    `;
    });
    $("#table").html(result);
}






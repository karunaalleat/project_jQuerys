var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
$(document).ready( () => {
    $('#choose_me_baby').on('change', () => {
        var recipes = $('#choose_me_baby').val();
        chooseRecipe(recipes);
    } );
});

// get api [arrow function]
var getAPI = (api) => {
    $.ajax({
        dataType: 'json',
        url: api,
        success: (data) => getRecipes(data),
        error: () => console.error("Cannot request data")
    });
}

// get all recipe [name function]
function getRecipes(datas) {
    datas.recipes.forEach( recs => {
       // your recipe can get here example: recs.name
       var results = "";
       if(recs.id == 0){
        results += `
         <tr>
           <td><h2>${recs.name}</h2></td>
           <td><img src="${recs.iconUrl}" width="70%" class="img-fluid"></td>
           
           <td>
           <h2> <p>Number of persons</p> </h2>
           <div class="input-group mb-3" style="width:30% ">
            <div class="input-group-prepend">
                <button type="button" id="minus" >&minus;</button>
            </div>
            <input type="number" class="form-control text-center" value="0" disabled id="member" max="15"
                min="0">
            <div class="input-group-append">
                <button type="button" id="add" >&#x2b;</button>
            </div>
           </div>
           </td>
           </tr>
         `;
       }
       
        getIngrediant(recs); // get all ingrediant
        $('#recipies').append(results);
        var h = "";
        if(ingrediant == 2){
            h -= 1;
        }
        $('#recipies').append(h);
    });
}

// get all ingrediant [name function]
function getIngrediant(recipe) {
    recipe.ingredients.forEach(ing => {
        showIngrediantTable(ing);
    })
}

// display ingrediant in table [arrow function]
var showIngrediantTable = (show) => {
    var ingrediant = "";
    ingrediant += `
        <tr>
            <td><img src="${show.iconUrl}" width="25" class="img-fluid"></td>
            <td>${show.quantity}</td>
            <td>${show.unit[0]}</td>
            <td>${show.name}</td>
        </tr>
    `;
    $('#result').append(ingrediant);
}

// choose recipe from select [arrow function]
var chooseRecipe = (myRecipe) => {
    var onlyNumber = parseInt(myRecipe);
    switch(onlyNumber) {
        case 2:
            getAPI(url);
            //hideAlert();
            break;
        // case 1:
        //     // your code idea...
        //     demoOne();
        //     break;
        // case 2:
        //     // your code idea...
        //     demoTwo();
        //     break;
        default: console.warn("You choose nothing");
    }
} 

// Demo test click [arrow function] this just the option function I test only
// var demoOne = () => {
//     var show = "";
//     show += `
//         <div class="alert alert-success">
//             <strong>Good luck! </strong> try your best!
//         </div>
//     `;
//     $('#result').html(show);
// }
// var demoTwo = () => {
//     var show = "";
//     show += `
//         <div class="alert alert-warning">
//             <strong>Good luck! </strong> try your best!
//         </div>
//     `;
//     $('#result').html(show);
// }
// var hideAlert = () => {
//     $('.alert').hide();
// }
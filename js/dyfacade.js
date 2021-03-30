

//function to show and hide rating question for add form
function dyShowHideRatingQuestionInAddForm()
{
    if($("#dyChkRating").is(":checked")){
        $("#dyChkRating").attr('value','true');
        $("#dyRatingQuestions").show();
    }
    else
    {
        $("#dyChkRating").attr('value','false');
        $("#dyRatingQuestions").hide();
    }
    $("#dyChkRating").checkboxradio("refresh");
}

//function to show and hide rating question for edit form
function dyShowHideRatingQuestionInEditForm()
{
    if($("#dyEditChkRating").is(":checked")){
        $("#dyEditChkRating").attr('value','true');
        $("#dyEditRatingQuestions").show();
    }
    else
    {
        $("#dyEditChkRating").attr('value','false');
        $("#dyEditRatingQuestions").hide();
    }
    $("#dyEditChkRating").checkboxradio("refresh");
}
//function to show calculated rating in Add Form
function dyShowCalculatedRating() {
    var result = "";
    //get quality
    var quality = parseFloat($("#dyQuality").val());
    //get service
    var service = parseFloat($("#dyService").val());
    //get value
    var value = parseFloat($("#dyValue").val());
    result = dyGetOverallRating(quality,service,value) + "%";
    $("#dyRating").val(result);
}
//function to show calculated rating in Modify Form
function dyShowEditCalculatedRating(){
    var result = "";
    //get quality
    var quality = parseFloat($("#dyEditQuality").val());
    //get service
    var service = parseFloat($("#dyEditService").val());
    //get value
    var value = parseFloat($("#dyEditValue").val());
    result = dyGetOverallRating(quality,service,value) + "%";
    $("#dyEditRating").val(result);
}
// save Add form if it is valid and show records on review table
function dyAddFeedback(){
    //1. check validation
    if (dyValidate_AddForm()){
        //2. if validation is ok
        console.info("Form is valid");
        //      a) fetch info from form
        var businessName = $("#dyName").val();
        var typeId = $("#dyLocation").val();
        var reviewerEmail = $("#dyFormEmail").val();
        var reviewerComments = $("#dyComments").val();
        var reviewDate = $("#dyDate").val();
        var hasRating = $("#dyChkRating").val();
        var rating1 = $("#dyQuality").val();
        var rating2 = $("#dyService").val();
        var rating3 = $("#dyValue").val();

        //      b) call DAL function to insert

        options = [businessName, typeId, reviewerEmail, reviewerComments,
                  reviewDate, hasRating, rating1, rating2, rating3];

        function callback() {
                console.info("Success: Inserting records successfully");
        }
        Review.dyinsert(options,callback);
        alert("New Feedback Added");
        //refresh the page
        window.location.reload();

    }  //3. if not valid show errors
    else {
        console.info("Form is invalid");
    }
}
//generate a list of review
function dygetReviews()
{
    $("#dyFeedbackList").html("Empty");
    $("#dyFeedbackList").listview("refresh");
    var options=[];

    function callback(tx, results) {
        var htmlCode ="";

        for(var i = 0; i < results.rows.length; i++)
        {
            var row = results.rows[i];
            var overallRating = "";
            console.info("Id: " + row['id'] +
                          "Business Name: " + row['businessName'] +
                          "Type Id: " + row['typeId'] +
                          "Reviewer Email: " + row['reviewerEmail'] +
                          "Reviewer Comments: " + row['reviewerComments'] +
                          "Review Date: " + row['reviewDate'] +
                          "Has Rating: " + row['hasRating'] +
                          "Rating1: " + row['rating1'] +
                          "Rating2: " + row['rating2'] +
                          "Rating3: " + row['rating3']);

            if (row['hasRating'] == "true")
            {
                var quality = parseFloat(row['rating1']);
                var service = parseFloat(row['rating2']);
                var value = parseFloat(row['rating3']);
                overallRating = dyGetOverallRating(quality,service,value);
            }
            else {
                overallRating = "0";
            }
            htmlCode += "<li><a data-role='button' href='#' + data-row-id='" + row['id']+"'>" +
                "<h1>Business Name: " + row['businessName'] + "</h1>" +
                "<p>Reviewer Email: " + row['reviewerEmail']+"</p>" +
                "<p>Comments: " + row['reviewerComments']+"</p>" +
                "<p>Overall Rating: " + overallRating+"</p>" +
                "</a></li>"
        }
        var feedbackList = $("#dyFeedbackList");
        feedbackList.html(htmlCode);
        feedbackList.listview("refresh");

        function clickHandler(){
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href','#dyEditFeedbackPage');
        }
        $("#dyFeedbackList a").on("click",clickHandler);
    }

    Review.dyselectAll(options,callback);
}
//show current review
function dyshowCurrentReview()
{
    var id=localStorage.getItem("id");

    var options=[id];
    function callback(tx, results) {
        var row = results.rows[0];
        var overallRating = "";

        console.info("Id: " + row['id'] +
            "Business Name: " + row['businessName'] +
            "Type Id: " + row['typeId'] +
            "Reviewer Email: " + row['reviewerEmail'] +
            "Reviewer Comments: " + row['reviewerComments'] +
            "Review Date: " + row['reviewDate'] +
            "Has Rating: " + row['hasRating'] +
            "Rating1: " + row['rating1'] +
            "Rating2: " + row['rating2'] +
            "Rating3: " + row['rating3']);

        $("#dyEditName").val(row['businessName']);
        $("#dyEditLocation").val(row['typeId']);
        $("#dyEditLocation").selectmenu("refresh");
        $("#dyEditEmail").val(row['reviewerEmail']);
        $("#dyEditComments").val(row['reviewerComments']);
        $("#dyEditDate").val(row['reviewDate']);

        if (row['hasRating'] == 'true')
        {
            $("#dyEditChkRating").prop("checked",true);
            $("#dyEditRatingQuestions").show();
            $("#dyEditQuality").val(row['rating1']);
            $("#dyEditService").val(row['rating2']);
            $("#dyEditValue").val(row['rating3']);
            var quality = parseFloat(row['rating1']);
            var service = parseFloat(row['rating2']);
            var value = parseFloat(row['rating3']);
            overallRating = dyGetOverallRating(quality,service,value) + "%";
            $("#dyEditRating").val(overallRating);
        }
        else {
            $("#dyEditChkRating").prop("checked",false);
            $("#dyEditRatingQuestions").hide();
            $("#dyEditQuality").val("0");
            $("#dyEditService").val("0");
            $("#dyEditValue").val("0");
        }
        $("#dyEditForm :checkbox").checkboxradio("refresh");
    }

    Review.dyselect(options,callback);
}
//function to update valid feedback page
function dyupdateFeedback(){

    //1. check validation
    if (dyValidate_EditForm()){
        //2. if validation is ok
        console.info("Form is valid");
        //      a) fetch info from form
        var id = localStorage.getItem("id");
        var businessName = $("#dyEditName").val();
        var typeId = $("#dyEditLocation").val();
        var reviewerEmail = $("#dyEditEmail").val();
        var reviewerComments = $("#dyEditComments").val();
        var reviewDate = $("#dyEditDate").val();
        var hasRating = $("#dyEditChkRating").val();
        var rating1 ="";
        var rating2 ="";
        var rating3 ="";

        if (hasRating == 'true')
        {
            $("#dyEditChkRating").prop("checked",true);
            $("#dyEditRatingQuestions").show();
            rating1 = $("#dyEditQuality").val();
            rating2 = $("#dyEditService").val();
            rating3 = $("#dyEditValue").val();
        }
        else {
            $("#dyEditChkRating").prop("checked",false);
            $("#dyEditRatingQuestions").hide();
            rating1 = "0";
            rating2 = "0";
            rating3 = "0";
        }
        $("#dyEditForm :checkbox").checkboxradio("refresh");
        //      b) call DAL function to insert
        var options = [businessName, typeId, reviewerEmail, reviewerComments,
            reviewDate, hasRating, rating1, rating2, rating3,id];

        function callback() {
            console.info("Success: Updating records successfully");
            $(location).prop('href', "#dyViewFeedbackPage");
        }
        Review.dyupdate(options, callback);
        alert("Feedback updated successfully");

    }//3. if not valid show errors
    else {
        console.info("Form is invalid");
    }
}
//delete feedback
function dydeleteFeedback()
{
    var id =localStorage.getItem("id");

    var options=[id];
    function callback() {
        console.info("Record delete successfully");
        $(location).prop('href', "#dyViewFeedbackPage");
    }

    Review.dydelete(options, callback);
    alert("Feedback Deleted successfully");
}

//store the default email into local storage
function dyShowSaveDefaultEmail(){
    var email=$("#dyDefaultEmail").val();
    localStorage.setItem("DefaultEmail", email);
    alert("Default reviewer email saved.");
}

//get default email from local storage and show it on Add form
function dyShowDefaultEmailOnAddPage()
{
    var email = localStorage.getItem("DefaultEmail");
    var reviewerEmail = $("#dyFormEmail").val(email);
}

// load "Type" dropdown automatically from type table when the add feedback page is shown
function dyupdateTypesDropdown()
{
    dyloadTypeDropdown("#dyLocation");
}

// load "Type" dropdown automatically from type table when the Modify feedback page is shown
function dyupdateTypesDropdownInModifyPage()
{
    dyloadTypeDropdown("#dyEditLocation");
}
function dyloadTypeDropdown(dropdown)
{
    $(dropdown).html("Empty");
    $(dropdown).selectmenu("refresh");
    var options =[];

    function callback(tx,results) {
        var htmlCode = '';

        for( var i = 0; i < results.rows.length; i++)
        {
            var row = results.rows[i];

            console.info("Id: " + row['id'] +
                " Name: " + row['name']);
            if (row['name'] == "Others")
            {
                htmlCode+='<option value = "' + row['id']+ '" selected >' + row['name'] + '</option>';
            }
            else {
                htmlCode+='<option value = "' + row['id']+ '">' + row['name'] + '</option>';
            }
        }
        var type = $(dropdown);
        type = type.html(htmlCode);
        $(dropdown).selectmenu("refresh");
    }
    Type.dyselectAll(options,callback);
}

//clear database
function dyclearDatabase()
{
    var result = confirm("Really want to clear database?");
    if (result)
    {
        try{
            DB.dyDropTables();
            alert("Database cleared");
        }
        catch (ex){
            alert(ex);
        }
    }
}



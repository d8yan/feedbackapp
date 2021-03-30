

// call back showHideRatingQuestionInAddForm function
function dyChkRating_Click() {
    dyShowHideRatingQuestionInAddForm();
}

// call back dyShowCalculatedRating function
function dyRating_Change() {
    dyShowCalculatedRating();
}

//call back showHideRatingQuestionInEditForm function
function dyEditChkRating_Click() {
    dyShowHideRatingQuestionInEditForm();
}

//call back dyShowEditCalculatedRating function
function dyEditRating_Change() {
    dyShowEditCalculatedRating();
}

//call back dyAddFeedback
function dySave_Click() {
    dyAddFeedback();
}
//call back dyupdateFeedback
function dyUpdate_Click() {
    dyupdateFeedback();
}
//cal back dydeleteFeedback
function dyDelete_Click() {
    dydeleteFeedback();
}
//call back dyShowSaveDefaultEmail
function dySaveDefault_Click() {
    dyShowSaveDefaultEmail();
}
//call back dyclearDatabase
function dyClearDatabase_Click() {
    dyclearDatabase();
}
//call back dyShowDefaultEmailOnAddPage
function dyAddPageDefaultEmail_show() {
    dyShowDefaultEmailOnAddPage();
}
//call back dyupdateTypesDropdown
function dyAddPageType_show() {
    dyupdateTypesDropdown();
}
//call back dyupdateTypesDropdownInModifyPage
function dyReviewPageType_show() {
    dyupdateTypesDropdownInModifyPage();
}
//call back dygetReviews
function dyReviewPage_show() {
    dygetReviews();
}
//call back dyshowCurrentReview
function dyModifyPage_show() {
    dyshowCurrentReview();
}

//attachments of event handlers
function dyInit() {
    $("#dyChkRating").on("click",dyChkRating_Click);
    $("#dyRatingQuestions").on("change",dyRating_Change);
    $("#dyEditChkRating").on("click",dyEditChkRating_Click);
    $("#dyEditRatingQuestions").on("change",dyEditRating_Change);
    $("#dySaveBtn").on("click",dySave_Click);
    $("#dyUpdateBtn").on("click",dyUpdate_Click);
    $("#dyDeleteBtn").on("click",dyDelete_Click);
    $("#dySaveDefault").on("click",dySaveDefault_Click);
    $("#dyClearDatabase").on("click",dyClearDatabase_Click);

    $("#dyAddFeedbackPage").on("pageshow",dyAddPageDefaultEmail_show);
    $("#dyAddFeedbackPage").on("pageshow",dyAddPageType_show);
    $("#dyViewFeedbackPage").on("pageshow",dyReviewPage_show);
    $("#dyEditFeedbackPage").on("pageshow",dyReviewPageType_show);
    $("#dyEditFeedbackPage").on("pageshow",dyModifyPage_show);

}
function dyInitDB(){
    try{
        DB.dyCreateDatabase();
        if(db)
        {
            console.info("Creating tables...");
            DB.dyCreateTables();
        }
        else{
            console.error("Error: Cannot create tables: database does not exist!");
        }
    }catch (e)
    {
        console.error("Error: (Fatal) Error in dyInitDB(). Can not process");
    }
}
///execute callback function dyInit when document is ready
$(document).ready(function (){
    dyInit();
    dyInitDB();
})


//function to calculate overall rating in percentage
function dyGetOverallRating(quality,service,value){
    var result = ((quality + service + value) * 100/15).toString();
    return result;
}
// Add form validation function
function dyValidate_AddForm(){
    //1. Retrieve the ref of the form
    var f = $("#dyAddForm");
    //2. Call the validate() function on the form object and
    //   pass validation rules as an object
    f.validate({
        rules:{
            dyName:{
                required:true,
                minlength: 2,
                maxlength: 20
            },
            dyFormEmail:{
                required: true,
                email: true
            },
            dyDate:{
                required: true,
            },
            dyQuality:{
                required:"#dyChkRating:checked",
                qualitycheck: true
             },
            dyService:{
                required:"#dyChkRating:checked",
                servicecheck: true
            },
             dyValue:{
                 required:"#dyChkRating:checked",
                 valuecheck: true
             }
        },
        messages:{
            dyName:{
                required:"Business Name is required",
                minlength:"Length must be 2-20 characters long",
                maxlength:"Length must be 2-20 characters long"
            },
            dyFormEmail:{
                required: "Reviewer Email is required",
                email: "Please enter a valid email address"
            },
            dyDate:{
                required: "Review Date is required",
            },
            dyQuality:{
                required:"Value must be 0-5",
                qualitycheck: "Value must be 0-5"
            },
            dyService:{
                required:"Value must be 0-5",
                servicecheck: "Value must be 0-5"
            },
            dyValue:{
                required:"Value must be 0-5",
                valuecheck: "Value must be 0-5"
            }
        }
    });
    //3. return valid() on the form
    return f.valid();
}

//Edit form validation function
function dyValidate_EditForm(){
    //1. Retrieve the ref of the form
    var f = $("#dyEditForm");
    //2. Call the validate() function on the form object and
    //   pass validation rules as an object
    f.validate({
        rules:{
            dyEditName:{
                required:true,
                minlength: 2,
                maxlength: 20
            },
            dyEditEmail:{
                required: true,
                email: true
            },
            dyEditDate:{
                required: true,
            },
            dyEditQuality:{
                required:"#dyEditChkRating:checked",
                qualitycheck: true
            },
            dyEditService:{
                required:"#dyEditChkRating:checked",
                servicecheck: true
            },
            dyEditValue:{
                required:"#dyEditChkRating:checked",
                valuecheck: true
            }
        },
        messages:{
            dyEditName:{
                required:"Business Name is required",
                minlength:"Length must be 2-20 characters long",
                maxlength:"Length must be 2-20 characters long"
            },
            dyEditEmail:{
                required: "Reviewer Email is required",
                email: "Please enter a valid email address"
            },
            dyEditDate:{
                required: "Review Date is required",
            },
            dyEditQuality:{
                required:"Value must be 0-5",
                qualitycheck: "Value must be 0-5"
            },
            dyEditService:{
                required:"Value must be 0-5",
                servicecheck: "Value must be 0-5"
            },
            dyEditValue:{
                required:"Value must be 0-5",
                valuecheck: "Value must be 0-5"
            }
        }
    });
    //3. return valid() on the form
    return f.valid();
}

//function to check if inputs numbers are valid
function dyValidateRatingQuestions(value) {
    if ($.isNumeric(value)) {
        if (parseFloat(value) >= 0 && parseFloat(value) <= 5) {
            return true;
        }
    }
    return false;
}
//customized validation rule
jQuery.validator.addMethod(
    "qualitycheck",
    dyValidateRatingQuestions,
    "Value must be 0-5"
);
jQuery.validator.addMethod(
    "servicecheck",
    dyValidateRatingQuestions,
    "Value must be 0-5"
);
jQuery.validator.addMethod(
    "valuecheck",
    dyValidateRatingQuestions,
    "Value must be 0-5"
);

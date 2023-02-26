// TODO make this more readable
let verifyInfo = {
  cardholderName: false,
  cardNumbers: false,
  expDateMonth: false,
  expDateYear: false,
  cvc: false,
};



const getCardHolderName = () => {
  // Function gets the user's card holder name
  let userName = $("#card-name").val();
  let nameTest = /^[a-zA-Z]+ [a-zA-Z]+$/;

  if (userName == " ") {
    $("#cardholderName").text("FirstName LastName");
  }
  if (nameTest.test(userName) == true) {
    // validates cardholder name
    $("#cardholderName").text(userName);
    $("#name-error").css("display", "none");
    verifyInfo["cardholderName"] = true;
  } else {
    $("#name-error").css("display", "inline");
    $("#cardholderName").text("FirstName LastName");
    verifyInfo["cardholderName"] = false;
  }
};

const getCardNumbers = () => {
  // Function gets the user card numbers and validates it using the validate card function
  let userCardNum = $("#card-num").val();
  let x = userCardNum.replace(/\s/g, ""); // removes any trailing spaces
  if (x.length == 16) {
    $("#card-error").css("display", "none");
    $("#card-num").css("border", "1px solid #eeeeee");
    const formattedNums = x.match(/.{1,4}/g);
    $("#card-num").val(formattedNums.join(" "));
    $("#front-card-numbers").text(formattedNums.join(" "));
    verifyInfo["cardNumbers"] = true;
  } else {
    $("#card-error").css("display", "inline");
    $("#card-num").css("border", "1px solid red");
    $("#front-card-numbers").text("0000 0000 0000 0000");
    verifyInfo["cardNumbers"] = false;
  }
};

const getExpDateMonth = () => {
  let usrMonth = parseInt($("#mm").val());

  if (usrMonth <= 12 && usrMonth >= 1) {
    $("#mm-yy-error").css("display", "none");
    $("#exp-date-mm").text(usrMonth);
    $("#mm").css("border", "1px solid #eeeeee");
    verifyInfo["expDateMonth"] = true;
  } else {
    $("#mm-yy-error").css("display", "block").text("Invalid Month");
    $("#mm").css("border", "1px solid red");
    verifyInfo["expDateMonth"] = false;
  }
};

const getExpDateYear = () => {
  let usrYear = parseInt($("#yy").val());
  if (usrYear > 22 && usrYear.toString().length == 2) {
    $("#mm-yy-error").css("display", "none");
    $("#exp-date-yy").text(usrYear);
    $("#yy").css("border", "1px solid #eeeeee");
    verifyInfo["expDateYear"] = true;
  } else {
    $("#mm-yy-error").css("display", "block").text("Invalid Year");
    $("#yy").css("border", "1px solid red");
    verifyInfo["expDateYear"] = false;
  }
};

const getCVC = () => {
  let usrCVC = parseInt($("#cvc").val());
  if (usrCVC >= 100 && usrCVC <= 999) {
    $("#cvc-error").css("display", "none");
    $("#cvc").css("border", "1px solid #eeeeee");
    $("#card-back-cvc").text(usrCVC);
    verifyInfo["cvc"] = true;
  } else {
    $("#cvc-error").css("display", "block");
    $("#cvc").css("border", "1px solid red");
    verifyInfo["cvc"] = false;
  }
};

const resetTextBoxes = () => {
  // textboxes
  $("#card-name").val("");
  $("#card-num").val("");
  $("#mm").val("");
  $("#yy").val("");
  $("#cvc").val("");

  // cards
  $("#front-card-numbers").text("0000 0000 0000 0000");
  $("#cardholderName").text("FirstName LastName");
  $("#exp-date-mm").text("00");
  $("#exp-date-yy").text("00");
  $("#card-back-cvc").text("000");
};

// function toggles between thank you page and info page
const toggleHTML = () => {
  $(".thank-you-container").toggle();
  $(".form-container").toggle();
};

// event listener to check if all the values are true
const areAllValuesTrue = (object) => {
  return Object.values(object).every((value) => value === true);
};

// Event listener that only activates if all textboxes return true
$("#confirm-btn").click(() => {
  if (areAllValuesTrue(verifyInfo) == true) {
    toggleHTML();
  }
});

$("#continue-btn").click(() => {
  toggleHTML();
  resetTextBoxes();
});

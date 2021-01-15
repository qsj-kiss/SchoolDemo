
function numeralExtends(deposit){
    var myNumeral = numeral(deposit);
    return myNumeral.format("0.00");
}

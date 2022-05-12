(function(){
  "use strict";
  var toolsLib = require("../tools");

  exports.Order = function(globals){
    var tools = new toolsLib.Tools(globals);

    this.placeOrder = function(restaurantId, tray, tip, deliveryTime, firstName, lastName, address, creditCard, user, createUser, callback){
      var params = [
        restaurantId
      ];

      if (deliveryTime != "ASAP"){
        var delivery_date = String(deliveryTime.getMonth() + 1) + "-" +  String(deliveryTime.getDate());
        var delivery_time = deliveryTime.getHours() + ":" + deliveryTime.getMinutes();
      }else{
        var delivery_date = "ASAP";
        var delivery_time = "";
      }

      var data = {
        tray: tray.buildTrayString(),
        tip: tip,
        delivery_date: delivery_date,
        delivery_time: delivery_time,
        first_name: firstName,
        last_name: lastName,
        addr: address.addr,
        city: address.city,
        state: address.state,
        zip: address.zip,
        phone: address.phone,
        card_name: creditCard.name,
        card_number: creditCard.number,
        card_cvc: creditCard.cvc,
        card_expiry: creditCard.formatExpirationDate(),
        card_bill_addr: creditCard.billAddress.addr,
        card_bill_addr2: creditCard.billAddress.addr2,
        card_bill_city: creditCard.billAddress.city,
        card_bill_state: creditCard.billAddress.state,
        card_bill_zip: creditCard.billAddress.zip,
        type: "res"
      };

      var uriString = tools.buildUriString("/o", params);

      if (createUser){
        data.em       = user.email;
        data.pw       = user.password;
        tools.makeApiRequest(globals.orderUrl, uriString, "POST",  data, {}, callback);
      }else if (user.password){
        tools.makeAuthenticatedApiRequest(globals.orderUrl, uriString, "POST", data, {}, user.email, user.password, callback);
      }else{
        data.em = user.email;
        tools.makeApiRequest(globals.orderUrl, uriString, "POST",  data, {}, callback);
      }
    }
  }

})();

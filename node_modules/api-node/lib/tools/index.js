(function(){
  "use strict";
  var https       = require("https"),
      crypto      = require("crypto"),
      querystring = require("querystring");


  exports.Tools = function(globals){

    /*
     * Base function to make a request to the ordr.in api
     * host is the base uri, somehting like r-test.ordr.in
     * uri is a full uri string, so everthing after ordr.in
     * method is either GET or POST
     * data is any additional data to be included in the request body or query string
     * headers are additional headers beyond the X-NAAMA-Authentication
     */
    this.makeApiRequest = function(host, uri, method, data, headers, callback){
      headers["X-NAAMA-CLIENT-AUTHENTICATION"] = "id=\"" + globals.apiKey + "\", version=\"1\"";
      data = querystring.stringify(data);

      if (method != "GET"){
        headers["Content-Type"]   = 'application/x-www-form-urlencoded';
        headers["Content-Length"] = data.length;
      }else if (data.length != 0){
        uri += "?" + data;
      }

      var requestOptions = {
        host: host,
        port: 443,
        path: uri,
        method: method,
        headers: headers
      };

      var req = https.request(requestOptions, function(res){

        if (res.statusCode == 404){ // node doesn't consider a 404 an error, but we need to call the callback with an error object
          callback({error: 404, msg: "This most likely happened because you made a request with a user who doesn't exist, or a credit card / address that doesn't exist."}, null);
          return;
        }

        var data = "";
        res.on("data", function(chunk){
          data += chunk;
        });
        res.on("end", function(){
          if (data === "Unauthorized"){
            callback({
              error: 401,
              msg: "That user account doesn't exist, or you attempted to create an account that already exists"
            }, null);
            return;
          }
          callback(false, JSON.parse(data));
        });
      });
      if (method != "GET"){
        req.write(data);
      }
      req.end();

      req.on("error", function(error){
        callback(error); // for now just pass node's error through
      });
    }

    /*
     * Function to handle all authenticated requests
     * all params are the same as the makeApiRequest function except:
     * user: the user's email address
     * pass: a SHA256 hash of the users password
     */

    this.makeAuthenticatedApiRequest = function(host, uri, method, data, headers, user, pass, callback){
      var hash = crypto.createHash("SHA256");
      var hash = hash.update(pass + user + uri).digest("hex");

      headers["X-NAAMA-AUTHENTICATION"] = "username=\"" + user + "\", response=\"" + hash + "\", version=\"1\"";
      this.makeApiRequest(host, uri, method, data, headers, callback);
    }

    this.buildUriString = function(baseUri, params){
      for (var i = 0; i < params.length; i++){
        baseUri += "/" + encodeURIComponent(params[i]);
      }
      return baseUri;
    }
  };
}());

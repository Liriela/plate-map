var plateLayOutWidget = plateLayOutWidget || {};

(function($, fabric) {

  plateLayOutWidget.engine = function(THIS) {
    // Methods which look after data changes and stack up accordingly
    // Remember THIS points to plateLayOutWidget and 'this' points to engine
    return {
      engine: {

        derivative: {},

        colorCounter: {},

        processChange: function(tile) {

          if($.isEmptyObject(this.derivative)) {
            // this block is executed at the very first time.
            this.createDerivative(tile);
            return {
              "action": "New Circle"
            };
          }

          var derivativeLength = this.derivative.length;
          var wellData  = tile["wellData"];

          for(var i in this.derivative) {

            if(THIS.compareObjects(this.derivative[i], wellData)) {
              // createDerivative() may not be needed, but if we call this method here we have derivatives having
              // all the data about filled circles.
              this.createDerivative(tile);
              return {
                "action": "Copy Color",
                "colorStops": THIS.allTiles[i].circle.colorStops
              };
            }
          }

          this.createDerivative(tile);

          if(tile.circle) {
            var color = tile.circle.colorStops[0];
            if(this.colorCounter[color] === THIS.colorCounter[color]) {
              return {
                "action": "Keep Color"
              };
            }
            return {
              "action": "New Color"
            };
          }

          return {
            "action": "New Circle"
          };

        },

        createDerivative: function(tile) {

          var tempDer = {};
          $.extend(true, tempDer, tile.wellData);
          this.derivative[tile.index] = tempDer;
        },

        _getFreeColor: function() {

          for(var color in this.colorCounter) {
            if(this.colorCounter[color] === 0) return color;
          }
          return false;
        }

      }
    }
  }
})(jQuery, fabric);

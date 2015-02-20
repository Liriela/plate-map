var plateLayOutWidget = plateLayOutWidget || {};

(function($, fabric) {

  plateLayOutWidget.overlay = function() {
    // overlay holds all the methods to put the part just above the canvas which contains all those
    // 'completion percentage' annd 'copy crieteria' button etc ...
    return {

      copyCrieteria: {},

      _createOverLay: function() {

        var that = this;
        this.overLayTextContainer = this._createElement("<div></div>").addClass("plate-setup-overlay-text-container");
        $(this.overLayTextContainer).html("Completion Percentage:");
        $(this.overLayContainer).append(this.overLayTextContainer);
        this.overLayButtonContainer = this._createElement("<div></div>").addClass("plate-setup-overlay-button-container");
        $(this.overLayContainer).append(this.overLayButtonContainer);

        this.clearCrieteriaButton = this._createElement("<button />").addClass("plate-setup-button");
        $(this.clearCrieteriaButton).text("Clear Criteria");
        $(this.overLayButtonContainer).append(this.clearCrieteriaButton);

        this.copyCrieteriaButton = this._createElement("<button />").addClass("plate-setup-button");
        $(this.copyCrieteriaButton).text("Copy Criteria");
        $(this.overLayButtonContainer).append(this.copyCrieteriaButton);

        this.pasteCrieteriaButton = this._createElement("<button />").addClass("plate-setup-button");
        $(this.pasteCrieteriaButton).text("Paste Criteria");
        $(this.overLayButtonContainer).append(this.pasteCrieteriaButton);

        $(this.clearCrieteriaButton).click(function(evt) {
          that.clearCrieteria();
        });

        $(this.copyCrieteriaButton).click(function(evt) {
          console.log(this);
        });

        $(this.pasteCrieteriaButton).click(function(evt) {
          console.log(this);
        });

      },

      clearCrieteria: function() {

        if(this.allSelectedObjects) {
          var noOfSelectedObjects = this.allSelectedObjects.length;
          for(var objectIndex = 0;  objectIndex < noOfSelectedObjects; objectIndex++) {

            var tile = this.allSelectedObjects[objectIndex];
            // Restore the original data.
            tile["wellData"] = $.extend(true, {}, this.allWellData);
            tile["unitData"] = $.extend(true, {}, this.allUnitData);
            tile["selectedWellAttributes"] = {};

            /*if(this.engine.unCheckedWell != null) {
              //alert("boom 1");
              if(this.engine.unCheckedWell.index == tile.index) {
                //alert("boom 2");
                this.engine.unCheckedWell = null;
              }
            }*/
            /*if(this.engine.unCheckedWellIndexes[tile.index]) {
              delete this.engine.unCheckedWellIndexes[tile.index];
            }*/
            this.engine._manageUnCheckedWellIndexes(tile);

            if(tile.circle) {
              // that works like a charm, we remove circle from canvas and delete the reference from
              // tile/well object.
              this.mainFabricCanvas.remove(tile.circle);
              this.mainFabricCanvas.remove(tile.circleCenter);
              this.mainFabricCanvas.remove(tile.circleText);

              -- this.engine.colorCounter[tile.circle.colorStops[0]];




              delete this.engine.derivative[tile.index];
              delete tile.circle;
              delete tile.circleCenter;
              delete tile.circleText;
            }

          }
          if(this.engine._checkRollBack() === "rollback" && this.tooManyColorsApplyed) {
            this.engine._rollBack();

          } else {
            this.colorToIndex = {};
            this._selectTilesFromRectangle(0, 7, 11, this.CLICK);
            this.allSelectedObject = null;
            //this.mainFabricCanvas.renderAll();
          }
          this._addForMultiselect();
          this.mainFabricCanvas.trigger("object:selected", this.allSelectedObjects);
        } else {
          alert("Please select any well");
        }

      }
    };
  }
})(jQuery, fabric);

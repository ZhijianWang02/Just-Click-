$(document).ready(function () {
    var money = 0;
    ///clicks
    var clicks = 0; //logs
    var addClicks = 1; //logplus
    var autoClicks = 0; //autologplus
    var autoClickerCost = 15;
    var autoClickerGive = 2; //autochopperprice
    var clickPrice = 1; //logprice
    var autoClickerCount = 0;
  
    //research
    var researchCount = 0; //pickaxes
    var researchCost = 200; //pickaxeprice
    var researchPoints = 0; //stone
    var researchGive = 1;
    var addRP = 1; //stoneplus
    ///
    var menu = "menus";
  
    setInterval(function () {
      if (autoClickerCount > 0) {
        //makes sure there are autoclickers
        clicks += autoClickerGive;
        changeInventory();
        changeMarket();
      }
    }, 1000);
  
    $("#click").click(function () {
      clicks += addClicks;
      changeInventory();
      changeMarket();
    });
  
    $("#Research").click(function () {
      if (researchCount == 0) {
        alert("You'll need to unlock this first!");
      } else {
        researchPoints += addRP * researchGive; //times the standard +1 research button press with the give, will need to change this later maybe if adding more features
        changeInventory();
      }
    });
  
    $("#sell1C").click(function () {
      clicks--;
      money += clickPrice;
      changeInventory();
      changeMarket();
    });
  
    $("#sell10C").click(function () {
      clicks -= 10;
      money += clickPrice * 10;
      changeInventory();
      changeMarket();
    });
  
    $("#sellAllC").click(function () {
      money += clickPrice * clicks;
      clicks = 0;
      changeInventory();
      changeMarket();
    });
  
    $("#autoClicker").click(function () {
      if (money < autoClickerCost) {
        alert("Hey! You don't have enough money for that!");
      } else {
        money -= autoClickerCost;
        autoClickerCount++;
  
        autoClickerCost = autoClickerCost * 1.5;
        autoClickerCost = Math.round(autoClickerCost); //times and adds up cost
  
        autoClickerGive = autoClickerGive * 1.25;
        autoClickerGive = Math.round(autoClickerGive); //same but with give
  
        autoClicks++;
  
        $("#autoClicker").html("Buy 1 Auto Clicker for " + autoClickerCost);
  
        changeInventory();
        changeMarket();
      }
    });
  
    $("#buyRB").click(function () {
      if (money < researchCost) {
        alert("Hey! You don't have enough money for that!");
      } else {
        money -= researchCost;
  
        researchCost = researchCost * 1.75; //muti vaule may change
        researchCost = Math.round(researchCost); //times and adds up cost
  
        researchGive = researchGive * 1.5;
        researchGive = Math.round(researchGive); //same with with give
  
        researchCount++;
  
        if (researchCount >= 1) {
          $("#buyRB").html("Upgrade Research Button for " + researchCost + " ?");
        } else if (researchCount >= 10) {
          $("#buyRB").html(
            "Upgrade Research Button Again " + researchCost + " ??"
          );
        } else {
          $("#buyRB").html("Stop Upgrading This Please " + researchCost + "???");
        }
  
        changeInventory();
        changeMarket();
      }
    });
  
    $("#visit").click(function () {
      menu = switchMenu("marketplace");
      changeMarket();
    });
  
    $("#return").click(function () {
      menu = switchMenu("menus");
    });
  
    function changeInventory() {
      $("#money").html("Money: $" + money);
  
      if (clicks == 1) {
        $("#clicks").html("You've got " + clicks + " click");
      } else {
        $("#clicks").html("You've got " + clicks + " clicks");
      }
  
      if (autoClickerCount > 0) {
        $("#clickers").html(
          "You've got " +
            autoClickerCount +
            " Auto Clickers giving you " +
            autoClickerGive +
            " Clicks each second"
        );
      }
      if (researchCount > 0) {
        $("#RP").html(
          "You've got " +
            researchPoints +
            " Research Points, gaining " +
            researchGive +
            " every click (" +
            researchCount +
            " upgrades)"
        );
      } else {
        $("#RP").html("");
      }
    }
  
    function changeMarket() {
      if (clicks > 0) {
        $("#sellAllC").css("display", "block");
      } else {
        $("#sellAllC").css("display", "none");
      }
      if (clicks >= 1) {
        $("#sell1C").css("display", "block");
      } else {
        $("#sell1C").css("display", "none");
      }
      if (clicks >= 10) {
        $("#sell10C").css("display", "block");
      } else {
        $("#sell10C").css("display", "none");
      }
  
      if (money >= autoClickerCost) {
        $("#autoClicker").css("display", "block");
      } else {
        $("#autoClicker").css("display", "none");
      }
  
      if (autoClickerCount >= 5) {
        $("#buyRB").css("display", "block");
      } else {
        $("#buyRB").css("display", "none");
      }
    }
  
    function switchMenu(show) {
      $("." + menu).css("display", "none");
      $("." + show).css("display", "block");
      return show;
    }
  });
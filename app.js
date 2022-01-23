$(document).ready(function () {
    var money = 0;
    ///clicks
    var clicks = 0; 
    var addClicks = 1;
    var autoClickerCost = 15;
    var autoClickerGive = 2; //autoclickerprice
    var clickPrice = 1;
    var autoClickerCount = 0;
    var betterAutoClickerCost = 200;
    var betterAutoClickerBonus = 0;
    var betterAutoClickerCount = 0;
    var totalAutoClickerBonus = 1;

    //research
    var researchCount = 0; 
    var researchCost = 200; 
    var researchPoints = 0;
    var researchGive = 10;
    var addRP = 1; 
    ///
    var menu = "menus";
  
    setInterval(function() {
      if (autoClickerCount > 0){//makes sure there are autoclickers
        totalAutoClickerBonus = autoClickerGive *  ( 1 + betterAutoClickerBonus)
        // the plus 1 to betterautoclickerbonus should turn the 0.05 to a 1.05 that that the give can actully get the bonus and not just 0.05 which would make it smaller
        clicks += totalAutoClickerBonus//times the give by the bonus which should give the increased give i hope
        changeInventory();
        changeMarket();
      }
    }, 1000);
  
    $("#click").click(function(){
      clicks += addClicks;
      changeInventory();
      changeMarket();
    });
  
    $("#Research").click(function(){
      if (researchCount == 0) {
        alert("You'll need to unlock this first!");
      }   
      else{
        researchPoints += addRP * researchGive; //times the standard +1 research button press with the give, will need to change this later maybe if adding more features
        changeInventory();
      }
    });
  
    $("#sell1C").click(function(){
      clicks--;
      money += clickPrice;
      changeInventory();
      changeMarket();
    });
  
    $("#sell10C").click(function(){
      clicks -= 10;
      money += clickPrice * 10;
      changeInventory();
      changeMarket();
    });
  
    $("#sellAllC").click(function(){
      money += clickPrice * clicks;
      clicks = 0;
      changeInventory();
      changeMarket();
    });
  
    $("#autoClicker").click(function(){
      if(money < autoClickerCost){
        alert("Hey! You don't have enough money for that!");
      } 
      else{
        money -= autoClickerCost;
        autoClickerCount++;
  
        autoClickerCost = autoClickerCost * 1.5;
        autoClickerCost = Math.round(autoClickerCost); //times and adds up cost
  
        autoClickerGive = autoClickerGive * 1.25;
        autoClickerGive = Math.round(autoClickerGive); //same but with give
  
        $("#autoClicker").html("Buy 1 Auto Clicker for $" + autoClickerCost);
  
        changeInventory();
        changeMarket();
      }
    });
  
    $("#buyRB").click(function(){
      if(researchCount == 0){
        if(money < researchCost){
          alert("Hey! You don't have enough money for that!");
        }
        else{
          money -= researchCost;

          researchCost = researchCost * 1.75; //muti vaule may change
          researchCost = Math.round(researchCost); //times and adds up cost

          $("#buyRB").html("Upgrade Research Button for $" + researchCost + " ?");

          researchCount++;
        }
      }
      else{
        if(money < researchCost){
          alert("Hey! You don't have enough money for that!");
        }
        else{
          money -= researchCost;

          researchCost = researchCost * 1.50; //muti vaule may change
          researchCost = Math.round(researchCost); //times and adds up cost
  
          researchGive = researchGive * 1.5;
          researchGive = Math.round(researchGive); //same with with give
  
          researchCount++;
  
          $("#buyRB").html("Upgrade Research Button for $" + researchCost + " ?");

          changeInventory();
          changeMarket();
        }
      }
    });

    $("#betterAutoClicker").click(function(){
      if(researchPoints < betterAutoClickerCost){
        alert("Hey! You don't have enough RP for that!");
      } 
      else{
        researchPoints -= betterAutoClickerCost;
  
        betterAutoClickerCost = betterAutoClickerCost * 1.50; //muti vaule may change
        betterAutoClickerCost = Math.round(betterAutoClickerCost); //times and adds up cost
  
        betterAutoClickerBonus = betterAutoClickerBonus + .05;
        betterAutoClickerBonus = Math.round(betterAutoClickerBonus * 100) / 100;

        totalAutoClickerBonus = autoClickerGive * betterAutoClickerBonus;
        totalAutoClickerBonus = Math.round(betterAutoClickerBonus * 100) / 100;

        betterAutoClickerCount++;
  
        if(betterAutoClickerCount >= 1){
          $("#betterAutoClicker").html("Improve Research Button by 5% for " + betterAutoClickerCost + " RP?");
        } 
        else if(betterAutoClickerCount >= 10){
          $("#betterAutoClicker").html("Improve Research Button by 5% Again " + betterAutoClickerCost + " RP??");
        } 
        else{
          $("#betterAutoClicker").html("Stop Improving Research Button by 5% Please " + betterAutoClickerCost + " RP???");
        }
  
        changeInventory();
        changeMarket();
      }
    });
  
    $("#visit").click(function(){
      menu = switchMenu("marketplace");
      changeMarket();
    });
  
    $("#return").click(function(){
      menu = switchMenu("menus");
    });
  
    function changeInventory(){
      $("#money").html("Money: $" + Math.round(money * 100) / 100);
  
      if(clicks == 1) {
        $("#clicks").html("You've got " + Math.round(clicks * 100) / 100 + " click");
      } 
      else{
        $("#clicks").html("You've got " + Math.round(clicks * 100) / 100 + " clicks");
      }
  
      if(autoClickerCount > 0){
        $("#clickers").html("You've got " + autoClickerCount + " Auto Clickers giving you " + Math.round(totalAutoClickerBonus * 100) / 100 + " Clicks each second");
      }

      if(researchPoints > 0){
        if(researchCount == 1){
          $("#RP").html( "You've got " + Math.round(researchPoints * 100) / 100 + " Research Points, gaining " + Math.round(researchGive * 100) / 100 + " every click (no upgrades)");
        }
        else{
          $("#RP").html( "You've got " + Math.round(researchPoints * 100) / 100 + " Research Points, gaining " + Math.round(researchGive * 100) / 100 + " every click (" + (researchCount - 1) + " upgrades)");
        }
        
      } 
      else{
        $("#RP").html("");
      }

      if(betterAutoClickerCount > 0){
        $("#betterAutoClickerCount").html( "You've upgraded the Auto Clicker " + betterAutoClickerCount + " time(s) granting you a " + Math.round(betterAutoClickerBonus * 100)  + "% bonus");
      } 
      else{
        $("#betterAutoClickerCount").html("");
      }
    }
  
    function changeMarket(){
      if (clicks > 0){
        $("#sellAllC").css("display", "block");
      } 
      else{
        $("#sellAllC").css("display", "none");
      }
      if (clicks >= 1){
        $("#sell1C").css("display", "block");
      } 
      else{
        $("#sell1C").css("display", "none");
      }
      if (clicks >= 10){
        $("#sell10C").css("display", "block");
      } 
      else{
        $("#sell10C").css("display", "none");
      }
  
      if (money >= autoClickerCost){
        $("#autoClicker").css("display", "block");
      } 
      else{
        $("#autoClicker").css("display", "none");
      }

      if (autoClickerCount >= 10){
        $("#betterAutoClicker").css("display", "block");
      } 
      else{
        $("#betterAutoClicker").css("display", "none");
      }
  
      if (autoClickerCount >= 5){
        $("#buyRB").css("display", "block");
      } 
      else{
        $("#buyRB").css("display", "none");
      }
    }
  
    function switchMenu(show){
      $("." + menu).css("display", "none");
      $("." + show).css("display", "block");
      return show;
    }
  });
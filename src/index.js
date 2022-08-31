import $ from 'jquery';


// This function stores our state.

const storeState = () => {
  let currentState = { soil: 0, light: 10, water: 0 };
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

// return (stateChangeFunction = state => state) => {

// const plant = {
//   soil: 0,
//   water: 0,
//   light: 0
// }

//original player variables
const player1 = storeState();
const player2 = storeState();

//new player objects
// let player1 = {...state, light: 10};
// let player2 = {...state, light: 10};
// const player2 = {light: 5};

//
// const player1DecreaseP2 = storeState();
// const player2DecreaseP1 = storeState();



// const myCat = {
//   name: "Murphy",
//   age: 1
// }

// const myCatGotOlder = {...myCat, age: 2}

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  console.log(prop);
  return (value) => {
    return (state) => ({
      ...state, 
      [prop]: (state[prop] || 0) + value
    });
  }
} 

const changeState2 = (prop) => {
  console.log(prop);
  return (value) => {
    return (state) => ({
      ...state, 
      [prop]: (state[prop] || 0) + value
    });
  }
} 

// const changeState1 = (prop) => {
  
// }

// const plantNew = {...state, water: 5};
// We create four functions using our function factory. We could easily create many more.
const giveLight = changeState("light")(5);
const takeLight = changeState("light")(-5);

const giveLight2 = changeState2("light")(5);
const takeLight2 = changeState2("light")(-5);

const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

$(document).ready(function () {

  // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.


  // This function doesn't actually do anything useful in this application — it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-state').click(function () {
    // We just need to call player1Increase() without arguments to see our current state.
    const currentState = player1();
    // $('#current-soil-value').text(`Soil State: ${currentState.soil}`);
    // $('#current-water-value').text(`Water State: ${currentState.water}`);
    $('#current-light-value').text(`Light State: ${currentState.light}`);
    $('#current-takeLight-value').text(`Current Take Light State: ${currentState.takeLight}`);
  });

  // $('#feed').click(function () {
  //   const newState = player1(blueFood);
  //   $('#soil-value').text(`Soil: ${newState.soil}`);
  // });

  // $('#water').click(function () {
  //   const newState = player1(superWater);
  //   $('#water-value').text(`Water: ${newState.water}`);
  // });

  $('#light').click(function () {
    const newPlant = player1(giveLight);
    $('#light-value').text(`Light: ${newPlant.light}`);
    console.log(newPlant, "player 1 light");
  });
// decrease
  $('#takeLight').click(function () {
    const newPlant = player1(takeLight2);
    $('#light-value1').text(`Light: ${newPlant.light}`);
    console.log(newPlant, "take from player 2 light");
  });



  // $("#new-plant").click(function(){
  //   var newState = {soil: 1, light: 3, water: -3}
  //   const stateChangeFunction = storeState(newState);
  //   console.log(newState);
  // });

  // $('#feed1').click(function () {
  //   const newState = player2(blueFood);
  //   $('#soil-value1').text(`Soil: ${newState.soil}`);
  // });

  // $('#water1').click(function () {
  //   const newState = player2(superWater);
  //   $('#water-value1').text(`Water: ${newState.water}`);
  // });

  $('#light1').click(function () {
    const newState = player2(giveLight2);
    $('#light-value1').text(`Light: ${newState.light}`);
  });
// decrease
  $('#takeLight1').click(function () {
    const newState = player2(takeLight);
    $('#light-value').text(`Light: ${newState.light}`);
    console.log(newState, "take light from player 1");
  });

  $('#show-state1').click(function () {
    // We just need to call stateControl() without arguments to see our current state.
    const newState = player2();
    // $('#current-soil-value1').text(`Soil State: ${newState.soil}`);
    // $('#current-water-value1').text(`Water State: ${newState.water}`);
    $('#current-light-value1').text(`Current Light State: ${newState.light}`);
    $('#current-takeLight-value1').text(`Take Light State: ${newState.takeLight}`);
  });
});


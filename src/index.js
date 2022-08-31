import $ from 'jquery';


// This function stores our state.

const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  }
}

// const plant = {
//   soil: 0,
//   water: 0,
//   light: 0
// }

const player1Increase = storeState();
const player2Increase = storeState();
//
const player1DecreaseP2 = storeState();
const player2DecreaseP1 = storeState();

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    })
  }
}

// const plantNew = {...state, water: 5};
// We create four functions using our function factory. We could easily create many more.
const giveLight = changeState("light")(5);
const takeLight = changeState("takeLight")(-5);

const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

$(document).ready(function () {

  // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.


  // This function doesn't actually do anything useful in this application — it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-state').click(function () {
    // We just need to call player1Increase() without arguments to see our current state.
    const currentState = player1Increase();
    $('#current-soil-value').text(`Soil State: ${currentState.soil}`);
    $('#current-water-value').text(`Water State: ${currentState.water}`);
    $('#current-light-value').text(`Light State: ${currentState.light}`);
  });

  $('#feed').click(function () {
    const newState = player1Increase(blueFood);
    $('#soil-value').text(`Soil: ${newState.soil}`);
  });

  $('#water').click(function () {
    const newState = player1Increase(superWater);
    $('#water-value').text(`Water: ${newState.water}`);
  });

  $('#light').click(function () {
    const newState = player1Increase(giveLight);
    $('#light-value').text(`Light: ${newState.light}`);
    console.log(newState);
  });
// decrease
  $('#takeLight').click(function () {
    const newState = player1DecreaseP2(giveLight);
    $('#light-value').text(`Light: ${newState.light}`);
    console.log(newState);
  });



  // $("#new-plant").click(function(){
  //   var newState = {soil: 1, light: 3, water: -3}
  //   const stateChangeFunction = storeState(newState);
  //   console.log(newState);
  // });

  $('#feed1').click(function () {
    const newState = player2Increase(blueFood);
    $('#soil-value1').text(`Soil: ${newState.soil}`);
  });

  $('#water1').click(function () {
    const newState = player2Increase(superWater);
    $('#water-value1').text(`Water: ${newState.water}`);
  });

  $('#light1').click(function () {
    const newState = player2Increase(giveLight);
    $('#light-value1').text(`Light: ${newState.light}`);
  });

  $('#show-state1').click(function () {
    // We just need to call stateControl() without arguments to see our current state.
    const newState = player2Increase();
    $('#current-soil-value1').text(`Soil State: ${newState.soil}`);
    $('#current-water-value1').text(`Water State: ${newState.water}`);
    $('#current-light-value1').text(`Light State: ${newState.light}`);
  });
});


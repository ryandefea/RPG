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

const stateControl = storeState();
const stateControl2 = storeState();

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

const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

$(document).ready(function () {

  // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.


  // This function doesn't actually do anything useful in this application — it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-state').click(function () {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl();
    $('#current-soil-value').text(`Soil State: ${currentState.soil}`);
    $('#current-water-value').text(`Water State: ${currentState.water}`);
    $('#current-light-value').text(`Light State: ${currentState.light}`);
  });

  $('#feed').click(function () {
    const newState = stateControl(blueFood);
    $('#soil-value').text(`Soil: ${newState.soil}`);
  });

  $('#water').click(function () {
    const newState = stateControl(superWater);
    $('#water-value').text(`Water: ${newState.water}`);
  });

  $('#light').click(function () {
    const newState = stateControl(giveLight);
    $('#light-value').text(`Light: ${newState.light}`);
    console.log(newState);
  });



  // $("#new-plant").click(function(){
  //   var newPlant = {soil: 1, light: 3, water: -3}
  //   const stateChangeFunction = storeState(newPlant);
  //   console.log(newPlant);
  // });

  $('#feed1').click(function () {
    const newPlant = stateControl2(blueFood);
    $('#soil-value1').text(`Soil: ${newPlant.soil}`);
  });

  $('#water1').click(function () {
    const newPlant = stateControl2(superWater);
    $('#water-value1').text(`Water: ${newPlant.water}`);
  });

  $('#light1').click(function () {
    const newPlant = stateControl2(giveLight);
    $('#light-value1').text(`Light: ${newPlant.light}`);
  });

  $('#show-state1').click(function () {
    // We just need to call stateControl() without arguments to see our current state.
    const newPlant = stateControl2();
    $('#current-soil-value1').text(`Soil State: ${newPlant.soil}`);
    $('#current-water-value1').text(`Water State: ${newPlant.water}`);
    $('#current-light-value1').text(`Light State: ${newPlant.light}`);
  });
});


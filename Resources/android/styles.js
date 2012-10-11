"use strict";

module.exports = {
  windowBar: {
    barColor: 'black',
    barImage: '/images/navbar_leather.png',
    backgroundColor: 'white'
  },
  buttonPrimary: {
    height: '40dp',
    color: 'white',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 2,
    backgroundGradient: {
      type: 'linear',
      colors: ['#777', '#000001'],
      startPoint: {x: 0, y: 0},
      endPoint: {x: 0, y: '20dp'},
      backfillEnd: true
    }
  },
  buttonSecondary: {
    height: '40dp',
    color: '#444',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 2,
    backgroundGradient: {
      type: 'linear',
      colors: ['#eee', '#ccc'],
      startPoint: {x: 0, y: 0},
      endPoint: {x: 0, y: '20dp'},
      backfillEnd: true
    }
  },
  buttonSmall: {
    height: '30dp',
    color: '#444',
    font: {fontSize: '14dp'},
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 2,
    backgroundGradient: {
      type: 'linear',
      colors: ['#eee', '#ccc'],
      startPoint: {x: 0, y: 0},
      endPoint: {x: 0, y: '20dp'},
      backfillEnd: true
    }
  }
};

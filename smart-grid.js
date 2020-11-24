const smartgrid = require('smart-grid')

const settings = {
  filename: '_smart-grid',
  outputStyle: 'sass',
  columns: 12,
  offset: '30px',
  mobileFirst: false,
  container: {
    fields: '15px'
  },
  breakPoints: {
    xl: {
      width: '1200px'
    },
    lg: {
      width: '992px'
    },
    md: {
      width: '768px'
    },
    sm: {
      width: '576px'
    },
    xs: {
      width: '320px'
    }
  },
  mixinNames: {
    container: 'container'
  }
  // detailedCalc : true,
}

smartgrid('./assets', settings)

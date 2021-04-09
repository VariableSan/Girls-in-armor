export default (context, inject) => {
  const breakpoints = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1280
  }
  inject('breakpoints', breakpoints)
}

// wrapper function to catch errrors
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

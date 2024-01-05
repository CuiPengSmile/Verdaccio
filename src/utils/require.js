const executor = (req, payload) => {
  if (req) {
    req.keys().forEach(key => {
      const register = req(key).default;
      register(payload);
    });
  }
};

export { executor };

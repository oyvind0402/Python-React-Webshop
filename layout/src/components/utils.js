const formatNOK = (value) => {
  return value.toLocaleString("en", {
    style: "currency",
    currency: "NOK",
  });
};

export { formatNOK };

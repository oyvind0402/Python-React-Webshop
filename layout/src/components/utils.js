const formatNOK = (value) => {
  return value.toLocaleString({
    style: "currency",
    currency: "NOK",
  });
};

export { formatNOK };

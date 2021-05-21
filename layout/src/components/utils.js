const formatNOK = (value) => {
  try {
    return value.toLocaleString("nb", {
      style: "currency",
      currency: "NOK",
    });
  } catch {
    console.log("Value is ", value);
  }
};

export { formatNOK };

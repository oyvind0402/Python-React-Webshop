const formatNOK = (value) => {
  try {
    return value.toLocaleString("nb", {
      style: "currency",
      currency: "NOK",
    });
  } catch {}
};

export { formatNOK };

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

//FIX Not fully functional
const disableBtn = (btnId) => {
  document.querySelector("#" + btnId).setAttribute("disabled", "disabled");
  document.getElementById(btnId).classList.add("disabled-btn");
};

const enableBtn = (btnId) => {
  document.querySelector("#" + btnId).removeAttribute("disabled");
  document.getElementById(btnId).classList.remove("disabled-btn");
};

export { formatNOK, enableBtn, disableBtn };

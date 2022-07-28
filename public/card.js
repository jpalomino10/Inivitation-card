document.getElementById("enviar_button").onclick = () => {
  let valueEle = document.getElementById("msg_yes").textContent;
  let asistence;
  let description = document.getElementById(
    "exampleFormControlTextarea1"
  ).value;
  if (valueEle === "Asistiré") {
    asistence = true;
  } else {
    asistence = false;
  }
  sendInvitationJSON({ asistence, description }).then((res) => {
    console.log("res", res);
    if (res.data.asistence == true) {
      window.location.href = "https://tcdoc-30c70.web.app/respuesta.html";
    } else {
      window.location.href = "https://tcdoc-30c70.web.app/respuesta_no.html";
    }
  });
};

document.getElementById("asistire_button").onclick = () => {
  let ele = document.getElementById("msg_yes");
  ele.textContent = "Asistiré";
  ele.classList.replace("danger", "primary");
};

document.getElementById("no_asistire_button").onclick = () => {
  let ele = document.getElementById("msg_yes");
  ele.textContent = "No Asistiré";
  ele.classList.replace("primary", "danger");
};

async function sendInvitationJSON(data) {
  const contact = JSON.parse(localStorage.getItem("contact"));
  console.log("contact", contact.id);
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      asistence: data.asistence,
      description: data.description,
    }),
  };
  const response = await fetch(
    `https://us-central1-tcdoc-30c70.cloudfunctions.net/app/api/contacts/answer/${contact.id}`,
    requestOptions
  );
  return { response, data };
}

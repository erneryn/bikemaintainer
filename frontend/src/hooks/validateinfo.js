export default function validateinfo(values) {
  let errors = {};
  console.log(values.name)
  if (!values.name.trim()) {
    errors.name = "Name Required!";
  }

  if (!values.email) {
    errors.email = "Email Required!";
  } else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      values.email
    )
  ) {
    errors.email = "Email Invalid!";
  }

  if (!values.no_handphone) errors.no_handphone = "Phone Number Required!";
  if (!values.bike_name) errors.bike_name = "Bike Brand Required!";
  if (!values.frame) errors.frame = "Frame detail Required!";
  if (!values.crankset) errors.crankset = "Crankset Required!";
  if (!values.bb) errors.bb = "Bottom Bracket Required!";
  if (!values.chain) errors.chain = "Chain Required!";
  if (!values.rd) errors.rd = "Rear Derailleur Required!";
  if (!values.fd) errors.fd = "Rear Required!";
  if (!values.shifter) errors.shifter = "Shifter Required!";
  if (!values.cassete) errors.cassete = "Cassete Required!";
  if (!values.saddle) errors.saddle = "Saddle Required!";
  if (!values.handlebars) errors.handlebars = "Handlebars Required!";
  if (!values.brake) errors.brake = "brake Required!";
  if (!values.ws) errors.ws = "wheelset Required!";
  if (!values.tire) errors.tire = "tire Required!";
  return errors;
}

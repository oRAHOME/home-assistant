const { apiClient } = require("../utils/helpers");

const controlLights = async (req, res) => {
  const {
    action,
    deviceName,
    brightness = "", // 0-255
    color = "", // [255, 255, 255]
    effect = "", // "effect_colorloop"
  } = req.body;

  if (!action || !deviceName) {
    console.error("Missing parameters.");
    return res
      .status(400)
      .json({ success: false, error: "Missing parameters." });
  }

  // define home assistant service based on action
  let service = "";
  switch (action) {
    case "on":
      service = "turn_on";
      break;
    case "off":
      service = "turn_off";
      break;
    default:
      return res.status(400).json({ success: false, error: "Invalid action." });
  }

  // prepare the payload
  const payload = { entity_id: `light.${deviceName}` };

  // if action is "on", add brightness, color and effect to the payload
  if (action === "on") {
    if (brightness) payload.brightness = brightness;
    if (color) payload.color = color;
    if (effect) payload.effect = effect;
  }

  try {
    const response = await apiClient.post(`services/light/${service}`, payload);

    if (response.status !== 200) {
      console.error(`Error: ${response.data}`);
      return res
        .status(response.status)
        .json({ success: false, error: response.data });
    }

    console.log(`Light ${deviceName}: '${action}' command sent successfully.`);
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { controlLights };

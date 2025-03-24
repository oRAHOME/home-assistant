const { apiClient } = require("../utils/helpers");

const controlTv = async (req, res) => {
  const { action, deviceName } = req.body;

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
    case "play":
      service = "play_media";
      break;
    case "pause":
      service = "media_pause";
      break;
    case "stop":
      service = "media_stop";
      break;
    default:
      return res.status(400).json({ success: false, error: "Invalid action." });
  }

  try {
    const response = await apiClient.post(`services/media_player/${service}`, {
      entity_id: `media_player.${deviceName}`,
    });

    if (response.status !== 200) {
      console.error(`Error: ${response.data}`);
      return res
        .status(response.status)
        .json({ success: false, error: response.data });
    }

    console.log(`TV ${deviceName}: ${action} command sent successfully.`);
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { controlTv };

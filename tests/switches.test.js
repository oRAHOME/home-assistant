const { controlSwitch } = require("../controllers/switches");
const { apiClient } = require("../utils/helpers");
const mockResponse = require("./mockResponse");

jest.mock("../utils/helpers", () => ({
    apiClient: {
        post: jest.fn(),
    },
})) 

describe("controlSwitch", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it ("returns 400 if parameneters are missing", async () => {
        const req = {
            body: {
                action: "",
                deviceName: "",
            }
        }

        const res = mockResponse();

        await controlSwitch(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: "Missing parameters."
        })
    }) 

    it("returns 400 if action is invalid", async () => {
        const req = {
            body: {
                action: "turn_on",
                deviceName: "light_switch",
            }
        }
    
        const res = mockResponse();
    
        await controlSwitch(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: "Invalid action."
        })
    })

    it ("returns 200 if action was successful", async () => {
        const req = {
            body: {
                action: "on",
                deviceName: "light_switch",
            }
        }
        const res = mockResponse();
        apiClient.post.mockResolvedValue({
            status: 200,
            data: "Ok"
        })

        await controlSwitch(req, res);

        expect(apiClient.post).toHaveBeenCalledWith("services/switch/turn_on", {
            entity_id: "switch.light_switch",
        })

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: "Ok"
        })
    })

    it("testing error control", async () => {
        const req = {
          body: {
            action: "off",
            deviceName: "light_switch",
          },
        }
        const res = mockResponse()
    
        apiClient.post.mockRejectedValue(new Error("Network error"))
    
        await controlSwitch(req, res)
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          error: "Network error",
        })
      })
})
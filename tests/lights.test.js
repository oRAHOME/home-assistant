const { controlLights } = require("../controllers/lights")
const { apiClient } = require("../utils/helpers");
const mockResponse = require("./mockResponse");


jest.mock("../utils/helpers", () => ({
    apiClient: {
        post: jest.fn(),
    }
}))

describe("controlLights", () => {
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

        await controlLights(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: "Missing parameters."
        })
    }) 
    it("returns 400 if action is invalid", async () => {
        const req = {
            body: {
                action: "flip",
                deviceName: "lamp",
            }
        }
    
        const res = mockResponse();
    
        await controlLights(req, res);
    
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
                deviceName: "lamp",
                brightness: 255,
                color: [255, 255, 255],
                effect: "colorloop",
            }
        }
        const res = mockResponse();
        apiClient.post.mockResolvedValue({
            status: 200,
            data: "Ok"
        })

        await controlLights(req, res);

        expect(apiClient.post).toHaveBeenCalledWith("services/light/turn_on", {
            entity_id: "light.lamp",
            brightness: 255,
            color: [255, 255, 255],
            effect: "colorloop"
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
            deviceName: "lamp",
          },
        }
        const res = mockResponse()
    
        apiClient.post.mockRejectedValue(new Error("Network error"))
    
        await controlLights(req, res)
    
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          error: "Network error",
        })
      })
})



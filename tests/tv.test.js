const {controlTv} = require('../controllers/tv');
const { apiClient } = require('../utils/helpers');
const mockResponse = require('./mockResponse');

jest.mock('../utils/helpers', () => ({
    apiClient: {
        post: jest.fn(),
    },
}))

describe('controlTV', () => {
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

        await controlTv(req, res);

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
                deviceName: "television",
            }
        }
    
        const res = mockResponse();
    
        await controlTv(req, res);
    
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
                deviceName: "television",
            }
        }
        const res = mockResponse();
        apiClient.post.mockResolvedValue({
            status: 200,
            data: "Ok"
        })

        await controlTv(req, res);

        expect(apiClient.post).toHaveBeenCalledWith("services/media_player/turn_on", {
            entity_id: "media_player.television",
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
            deviceName: "television",
          },
        }
        const res = mockResponse()
    
        apiClient.post.mockRejectedValue(new Error("Network error"))
    
        await controlTv(req, res)
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          error: "Network error",
        })
      })
})
import { getProfileService } from "../services/userService.js";

export const getProfile = async (req, res) => {
    const result = await getProfileService(req.existingUser.id);

    if (!result.success) {
        return res.status(404).json(result);
    }

    return res.status(200).json(result);
};
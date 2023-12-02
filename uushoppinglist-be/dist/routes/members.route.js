"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../middlewares/authorization");
const profiles_1 = require("../types/enums/profiles");
const members_controller_1 = require("../controllers/members.controller");
const router = (0, express_1.Router)({ mergeParams: true });
router.post('/', (0, authorization_1.restrict)([profiles_1.Profiles.OWNER]), members_controller_1.addMember);
router.delete('/:id', (0, authorization_1.restrict)([profiles_1.Profiles.OWNER]), members_controller_1.deleteMember);
exports.default = router;
//# sourceMappingURL=members.route.js.map
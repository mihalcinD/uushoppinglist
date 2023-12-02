"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lists_controller_1 = require("../controllers/lists.controller");
const authorization_1 = require("../middlewares/authorization");
const profiles_1 = require("../types/enums/profiles");
const router = (0, express_1.Router)();
router.get('/', lists_controller_1.getLists);
router.get('/:listID', (0, authorization_1.restrict)([profiles_1.Profiles.OWNER, profiles_1.Profiles.MEMBER]), lists_controller_1.getList);
router.post('/', lists_controller_1.createList);
router.patch('/:listID', (0, authorization_1.restrict)([profiles_1.Profiles.OWNER]), lists_controller_1.patchList);
router.delete('/:listID', (0, authorization_1.restrict)([profiles_1.Profiles.OWNER]), lists_controller_1.deleteList);
exports.default = router;
//# sourceMappingURL=lists.route.js.map
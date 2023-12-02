"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_controller_1 = require("../controllers/items.controller");
const authorization_1 = require("../middlewares/authorization");
const profiles_1 = require("../types/enums/profiles");
const router = (0, express_1.Router)({ mergeParams: true });
router.post('/', (0, authorization_1.restrict)([profiles_1.Profiles.OWNER, profiles_1.Profiles.MEMBER]), items_controller_1.createItem);
router.patch('/:id', (0, authorization_1.restrict)([profiles_1.Profiles.OWNER, profiles_1.Profiles.MEMBER]), items_controller_1.patchItem);
router.delete('/:id', (0, authorization_1.restrict)([profiles_1.Profiles.OWNER, profiles_1.Profiles.MEMBER]), items_controller_1.deleteItem);
exports.default = router;
//# sourceMappingURL=items.route.js.map
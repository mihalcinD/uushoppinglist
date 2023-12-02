"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.membersRoute = exports.itemsRoute = exports.listRoute = void 0;
var lists_route_1 = require("./lists.route");
Object.defineProperty(exports, "listRoute", { enumerable: true, get: function () { return __importDefault(lists_route_1).default; } });
var items_route_1 = require("./items.route");
Object.defineProperty(exports, "itemsRoute", { enumerable: true, get: function () { return __importDefault(items_route_1).default; } });
var members_route_1 = require("./members.route");
Object.defineProperty(exports, "membersRoute", { enumerable: true, get: function () { return __importDefault(members_route_1).default; } });

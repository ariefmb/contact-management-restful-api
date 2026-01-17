import { Router } from "express";
import { AddressRouter } from "./address.route.js";
import { AuthRouter } from "./auth.route.js";
import { ContactRouter } from "./contact.route.js";
import { GuestRouter } from "./guest.route.js";
import { UserRouter } from "./user.route.js";

export const routes = Router()

const _routes = [
    ['/users', AuthRouter],
    ['/users', UserRouter],
    ['/guest/contacts', GuestRouter],
    ['/contacts', ContactRouter],
    ['/contacts', AddressRouter]
]

_routes.forEach(route => {
    const [url, router] = route
    routes.use(url, router)
})
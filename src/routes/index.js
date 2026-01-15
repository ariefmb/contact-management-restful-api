import { Router } from "express";
import { AddressRouter } from "./address.route.js";
import { AuthRouter } from "./auth.route.js";
import { ContactRouter } from "./contact.route.js";
import { GuestRouter } from "./guest.route.js";

export const routes = Router()

const _routes = [
    ['/users', AuthRouter],
    ['/guest/contacts', GuestRouter],
    ['/contacts', ContactRouter],
    ['/contacts/:contactId/addresses', AddressRouter]
]

_routes.forEach(route => {
    const [url, router] = route
    routes.use(url, router)
})
import guestService from "../service/guest-service.js"

const getList = async (req, res, next) => {
    try {
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size,
        }

        const result = await guestService.getList(request)
        res.status(200).json({
            data: result.data,
            paging: result.paging
        })
    } catch (error) {
        next(error)
    }
}

export default { getList }
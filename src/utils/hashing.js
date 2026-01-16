import bcrypt from 'bcrypt'

export const hashing = (data) => {
    return bcrypt.hashSync(data, 10)
}

export const verifyHashedData = (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword)
}
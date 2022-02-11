import del from "del";

export const clean = (cb) => {
    return del('dist').then(() => {
        cb()
    })
};

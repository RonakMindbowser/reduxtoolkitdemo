import { toast } from "react-toastify";

export const isValidEmail = email => {
    if (email.length > 320) return false;
    let expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return expression.test(String(email).toLowerCase());
};


export const isValidPassword = password => {
    if (password == '' || password == undefined || password == null) return false;
    if (password.length < 8 || password.length > 20) return false;
    var regularExpression = /^(?=.*[0-9])/;
    return regularExpression.test(String(password));
};

export const isEmptyOrNull = input => {
    return input === null || input === undefined || input === '';
};

export const toastType = {
    i: toast.TYPE.INFO,
    w: toast.TYPE.WARNING,
    s: toast.TYPE.SUCCESS,
    e: toast.TYPE.ERROR,
    d: toast.TYPE.DEFAULT
}

export const showCustomToast = (message, type = toastType.d) => {
    if (type == toastType.i) {
        toast.info(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
    else if (type == toastType.e) {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
    else if (type == toastType.w) {
        toast.warn(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
    else if (type == toastType.s) {
        toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
    else {
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
}

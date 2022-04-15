export default function validate(values) {

    let errors = {}

    if (!values.email) {
        errors.email = "Email is empty"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "email address is invalid"
    }
    if (!values.password) {
        errors.password = "Password is required"
    } else if (values.password.length < 8) {
        errors.password = "Password is incorrent."
    }
    return errors;
}
const isEmpty = ( s )=>
{
    return !s.trim();
}

const isValidEmail = (email)=>
{
    email = email.trim();

    return email.endsWith("@gmail.com")
}

const isValidPassword = (password)=>
{
    password = password.trim();

    if( password.length < 8 )
    {
        return false;
    }

    const allowedChars = /^[A-Za-z0-9_!@#$%^&*?<>.,-]+$/;

    // Contains a character not in our list (like a space)
    if( !allowedChars.test(password) )
    {
        return false;
    }

    // check for digit
    const hasDigit = /\d/.test(password);

    // check for uppercase
    const hasUpperCase = /[A-Z]/.test(password)

    // check for lowercase
    const hasLowerCase = /[a-z]/.test(password)

    // check for special char
    const hasSpecialChar = /[_!@#$%^&*?<>.,-]/.test(password)

    return hasDigit && hasSpecialChar && hasUpperCase && hasLowerCase
}

module.exports = {
    isEmpty,
    isValidEmail,
    isValidPassword
}
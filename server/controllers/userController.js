
// @desc    Register a User
// route    POST /api/users
// @access  Public
const registerUser = (req, res) => {
    res.json({message: 'Register a User'});
}

// @desc    Authenticate a User
// route    POST /api/users/auth
// @access  Public
const AuthUser = (req, res) => {
    res.json({message: 'login user'});
}

// @desc    Logout User
// route    POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    res.json({message: 'logout user'});
}

// @desc    Get user main page
// route    GET /api/users/main
// @access  Private
const getUserMainPage = (req, res) => {
    res.json({message: 'main page'});
}
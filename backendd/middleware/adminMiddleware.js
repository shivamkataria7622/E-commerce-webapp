// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        // Check if user has admin role
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required'
            });
        }

        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Middleware to check if user is admin or accessing their own resource
exports.isAdminOrOwner = (userIdParam) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
            }

            const resourceUserId = req.params[userIdParam] || req.body[userIdParam];

            // Allow if admin or if user is accessing their own resource
            if (req.user.role === 'admin' || req.user.userId === resourceUserId) {
                return next();
            }

            res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        } catch (error) {
            console.error('Admin/Owner middleware error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error'
            });
        }
    };
};

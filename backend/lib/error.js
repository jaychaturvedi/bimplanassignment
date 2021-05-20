"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertError = exports.SupportError = exports.FeaturesError = exports.IssuesError = exports.FeedbackError = exports.BikeError = exports.RideError = exports.UserError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.MotoVoltError = void 0;
class MotoVoltError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.name = "MOTOVOLT_ERROR";
        this.errorCode = errorCode;
    }
}
exports.MotoVoltError = MotoVoltError;
class BadRequestError extends MotoVoltError {
    constructor(m) {
        super(m, 400);
        this.name = 'BAD_REQUEST_EROR';
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends MotoVoltError {
    constructor(m) {
        super(m, 401);
        this.name = 'UNAUTHORIZED_ERROR';
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends MotoVoltError {
    constructor(m) {
        super(m, 403);
        this.name = 'FORBIDDEN_ERROR';
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends MotoVoltError {
    constructor(m) {
        super(m, 404);
        this.name = 'NOT_FOUND_ERROR';
    }
}
exports.NotFoundError = NotFoundError;
class UserError extends MotoVoltError {
    constructor(m) {
        super(m, 1000);
        this.name = 'USER_ERROR';
    }
}
exports.UserError = UserError;
class RideError extends MotoVoltError {
    constructor(m) {
        super(m, 2000);
        this.name = 'RIDE_ERROR';
    }
}
exports.RideError = RideError;
class BikeError extends MotoVoltError {
    constructor(m) {
        super(m, 3000);
        this.name = 'BIKE_ERROR';
    }
}
exports.BikeError = BikeError;
class FeedbackError extends MotoVoltError {
    constructor(m) {
        super(m, 4000);
        this.name = 'FEEDBACK_ERROR';
    }
}
exports.FeedbackError = FeedbackError;
class IssuesError extends MotoVoltError {
    constructor(m) {
        super(m, 5000);
        this.name = 'ISSUES_ERROR';
    }
}
exports.IssuesError = IssuesError;
class FeaturesError extends MotoVoltError {
    constructor(m) {
        super(m, 6000);
        this.name = 'FEATURES_ERROR';
    }
}
exports.FeaturesError = FeaturesError;
class SupportError extends MotoVoltError {
    constructor(m) {
        super(m, 7000);
        this.name = 'SUPPORT_ERROR';
    }
}
exports.SupportError = SupportError;
class AlertError extends MotoVoltError {
    constructor(m) {
        super(m, 8000);
        this.name = 'ALERT_ERROR';
    }
}
exports.AlertError = AlertError;

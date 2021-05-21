export abstract class MotoVoltError extends Error {
  public errorCode: number;
  constructor(message: string, errorCode: number) {
    super(message);
    this.name = "INTERNAL_ERROR";
    this.errorCode = errorCode;
  }
}

export class BadRequestError extends MotoVoltError {
  constructor(m: string) {
    super(m, 400);
    this.name = 'BAD_REQUEST_EROR';
  }
}

export class UnauthorizedError extends MotoVoltError {
  constructor(m: string) {
    super(m, 401);
    this.name = 'UNAUTHORIZED_ERROR';
  }
}

export class ForbiddenError extends MotoVoltError {
  constructor(m: string) {
    super(m, 403);
    this.name = 'FORBIDDEN_ERROR';
  }
}

export class NotFoundError extends MotoVoltError {
  constructor(m: string) {
    super(m, 404);
    this.name = 'NOT_FOUND_ERROR';
  }
}

export class PostsError extends MotoVoltError {
  constructor(m: string) {
    super(m, 1000);
    this.name = 'POSTS_ERROR'
  }
}
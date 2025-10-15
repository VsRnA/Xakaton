export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, code?: string) {
    super(400, message, code);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized', code?: string) {
    super(401, message, code);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden', code?: string) {
    super(403, message, code);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, code?: string) {
    super(404, message, code);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string, code?: string) {
    super(409, message, code);
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message: string, code?: string) {
    super(422, message, code);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = 'Internal Server Error', code?: string) {
    super(500, message, code);
  }
}

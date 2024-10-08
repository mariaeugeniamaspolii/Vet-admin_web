const LOGS = {
  DB_CONNECTED: "Successfully connect to MongoDB",
  DB_CONNECT_ERROR: "Connection error",
  CONNECTED: (port) => `Server is running on port ${port}`,
  HOST: (port) => `Host http://localhost:${port}/`,
};

const MESSAGE = {
  BAD_REQUEST: "BAD_REQUEST",
  CATCH_SERVER: "CATCH_SERVER",
  CREATED: "OK_CREATED",
  DELETED: "DELETED",
  DUPLICATED_EMAIL: "DUPLICATED_EMAIL",
  DUPLICATED_USERNAME: "DUPLICATED_USERNAME",
  FORBIDDEN: "FORBIDDEN",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  INVALID_TOKEN: "INVALID_TOKEN",
  MISSING_INFO: "MISSING_INFO",
  MODIFIED: "MODIFIED",
  NOT_FOUND: "NOT_FOUND",
  OK: "OK",
  PONG: "pong 🏓",
  SERVER_UNKNOWN: "SERVER_UNKNOWN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  UNAUTHORIZED: "UNAUTHORIZED",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  UNKNOWN_ROUTE: "UNKNOWN_ROUTE",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  USER_NOT_FOUND: "USER_NOT_FOUND",
};

const STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = { LOGS, MESSAGE, STATUS };

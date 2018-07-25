export function requestInterceptor(req) {
  if (!req.headers["Accept"]) {
    req.headers["Accept"] = "application/json";
  }

  if (req.body && !req.headers["Content-Type"]) {
    req.headers["Content-Type"] = "application/json";
  }
}

export function HttpError(code, message = "Shits Broke") {
  const err = new Error(message);
  err.code = code;
  return err;
}

//*response console
const response = {
  success: (res, data, message) => {
    const result = {
      success: true,
      code: 200,
      status: "Success",
      message,
      data,
    };
    res.json(result);
  },
  failed: (res, data, message) => {
    const failed = {
      success: false,
      code: 402,
      status: "Bad request",
      message,
      data,
    };
    res.json(failed);
  },
  errorServer: (res, data, message) => {
    const failed = {
      success: false,
      code: 500,
      status: "ERROR",
      message: message,
      data: data,
    };
    res.json(failed);
  },
  successWithMeta: (res, data, meta, message) => {
    const result = {
      message,
      success: true,
      code: 200,
      meta,
      data,
    };
    res.json(result);
  },
  tokenResult: (res, data, message) => {
    const result = {
      message,
      code: 200,
      data,
    };
    res.json(result);
  },
  tokenResultErr: (res, data, message) => {
    const result = {
      message,
      success: true,
      code: 500,
      data,
    };
    res.json(result);
  },
  tokenResultExpired: (res, data, message) => {
    const result = {
      message,
      success: true,
      code: 405,
      data,
    };
    res.json(result);
  },
};
module.exports = response;

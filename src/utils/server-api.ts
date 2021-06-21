import { NextApiRequest, NextApiResponse } from "next";

interface MethodResponse {
  status: number;
  data?: any;
}

interface HandleMethods {
  DELETE?: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<MethodResponse>;
  GET?: (req: NextApiRequest, res: NextApiResponse) => Promise<MethodResponse>;
  POST?: (req: NextApiRequest, res: NextApiResponse) => Promise<MethodResponse>;
  PUT?: (req: NextApiRequest, res: NextApiResponse) => Promise<MethodResponse>;
}

const STATUS_CODES = {
  error: 400,
  method_invalid: 407,
  success: 200,
};

const ServerApi =
  (req: NextApiRequest, res: NextApiResponse) =>
  async (handleMethods: HandleMethods): Promise<void> => {
    const { method } = req;
    const handleMethodKeys = Object.keys(handleMethods);
    const defaultData = { message: "OK" };
    let response = { data: defaultData, status: STATUS_CODES.success };

    if (handleMethodKeys.includes(method)) {
      try {
        response = await handleMethods[method](req, res);
      } catch (err) {
        response = {
          data: { message: err.message },
          status: STATUS_CODES.error,
        };
      }
    } else {
      response = {
        data: { message: "Method not implemented" },
        status: STATUS_CODES.method_invalid,
      };
    }

    res.status(response.status).json(response.data || defaultData);
  };

export default ServerApi;

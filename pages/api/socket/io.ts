import { Server as Netserver } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIo } from "socket.io";

import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: Netserver = res.socket.server as any;
    const io = new ServerIo(httpServer, {
      path: path,
      //@ts-ignore
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;

import Peer from "peerjs";

export default function (ctx, inject) {
  if (process.client) {
    inject("peerjs", () => new Peer());
  }
}

import ims_api from "./ims_api";

export type Message = {
    sender: String;
    text: String;
  };

  const getAllMessages =async () => {
    const messages = await ims_api.getAllMessages()
    return messages
  }

  const saveMessage =async (msg:Message) => {
    await ims_api.addMessage(msg)
  }


  export default  {
    getAllMessages,
    saveMessage
  }
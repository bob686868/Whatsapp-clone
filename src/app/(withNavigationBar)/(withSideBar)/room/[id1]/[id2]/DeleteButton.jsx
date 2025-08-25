import { handleDeleteMessage } from "./formActions.js";
export default function DeleteButton({
  setOptimisticMessages,
  messageId,
  contactId,
}) {
  async function deleteHandler() {
    setOptimisticMessages({ type: "delete", id: messageId });
    await handleDeleteMessage(messageId, contactId);
  }
  return (
<div className="flex">
  <button
    onClick={deleteHandler}
    className="bg-red-500 ml-auto text-white rounded-sm p-1 cursor-pointer hover:bg-red-400"
  >
    Delete
  </button>
</div>

  );
}

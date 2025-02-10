import { showSuccessToast } from "../components/ToastNotification";

export default function Test() {
  const handleClick = () => {
    showSuccessToast('Button clicked! Showing toast notification');
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Show Toast Notification
      </button>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import { askTripQuestion } from "../services/api";

export default function ChatAssistant({ tripContext }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! Ask me anything about your itinerary — timings, alternatives, budget, you name it.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const nextMessages = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await askTripQuestion({
        tripContext,
        messages: nextMessages,
        question,
      });
      if (!response.success || !response.answer) {
        throw new Error(response.error || "Couldn't get an answer.");
      }
      setMessages((prev) => [...prev, { role: "assistant", content: response.answer }]);
    } catch (err) {
      toast.error(err.message);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process that. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-cyan-500 text-white shadow-lg grid place-items-center text-xl"
        aria-label="Open AI trip assistant"
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm h-[28rem] glass-card flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold">
              Trip Assistant
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-primary-500 text-white rounded-br-sm"
                      : "bg-slate-100 dark:bg-slate-800 rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm w-fit flex items-center gap-1.5">
                  <FiLoader className="animate-spin" /> Thinking...
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="p-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your trip..."
                className="input-field flex-1 py-2"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-10 h-10 shrink-0 rounded-xl bg-primary-500 text-white grid place-items-center disabled:opacity-50"
              >
                <FiSend size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

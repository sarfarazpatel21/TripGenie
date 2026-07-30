import { FiDownload, FiCopy, FiShare2, FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";
import jsPDF from "jspdf";

function buildPlainTextSummary(trip, formData) {
  const lines = [];
  lines.push(`Trip to ${formData?.destination || "your destination"}`);
  lines.push(`${formData?.days || ""} days • ${formData?.travellers || ""} traveller(s)`);
  lines.push("");
  lines.push("SUMMARY");
  lines.push(trip.summary || "");
  lines.push("");
  lines.push("DAY-WISE ITINERARY");
  (trip.itinerary || []).forEach((day) => {
    lines.push(`Day ${day.day}: ${day.title || ""}`);
    (day.activities || []).forEach((a) => {
      lines.push(`  - ${a.time ? a.time + " " : ""}${a.activity}${a.location ? ` (${a.location})` : ""}`);
    });
  });
  lines.push("");
  lines.push("TRAVEL TIPS");
  (trip.travel_tips || []).forEach((tip) => lines.push(`- ${tip}`));
  return lines.join("\n");
}

export default function TripActionsBar({ trip, formData, isFavourite, onToggleFavourite }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildPlainTextSummary(trip, formData));
      toast.success("Itinerary copied to clipboard!");
    } catch {
      toast.error("Couldn't copy to clipboard.");
    }
  };

  const handleShare = async () => {
    const text = buildPlainTextSummary(trip, formData);
    if (navigator.share) {
      try {
        await navigator.share({ title: `Trip to ${formData?.destination}`, text });
      } catch {
        // user cancelled share — no-op
      }
    } else {
      handleCopy();
    }
  };

  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const margin = 48;
      const maxWidth = 595 - margin * 2;
      let y = margin;

      const addText = (text, fontSize = 11, bold = false) => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line) => {
          if (y > 780) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += fontSize * 1.4;
        });
      };

      addText(`Trip to ${formData?.destination || ""}`, 20, true);
      addText(`${formData?.days || ""} days • ${formData?.travellers || ""} traveller(s) • ${formData?.budget_type || ""}`, 11);
      y += 8;

      addText("Summary", 14, true);
      addText(trip.summary || "N/A");
      y += 6;

      addText("Day-wise Itinerary", 14, true);
      (trip.itinerary || []).forEach((day) => {
        addText(`Day ${day.day}: ${day.title || ""}`, 12, true);
        (day.activities || []).forEach((a) => {
          addText(`• ${a.time ? a.time + " - " : ""}${a.activity}${a.location ? ` (${a.location})` : ""}`);
        });
        y += 4;
      });

      addText("Travel Tips", 14, true);
      (trip.travel_tips || []).forEach((tip) => addText(`• ${tip}`));

      doc.save(`trip-${(formData?.destination || "itinerary").replace(/\s+/g, "-").toLowerCase()}.pdf`);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Couldn't generate PDF.");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={handleDownloadPdf} className="btn-secondary text-sm px-4 py-2.5">
        <FiDownload /> Download PDF
      </button>
      <button onClick={handleCopy} className="btn-secondary text-sm px-4 py-2.5">
        <FiCopy /> Copy
      </button>
      <button onClick={handleShare} className="btn-secondary text-sm px-4 py-2.5">
        <FiShare2 /> Share
      </button>
      <button
        onClick={onToggleFavourite}
        className={`btn-secondary text-sm px-4 py-2.5 ${
          isFavourite ? "!text-rose-500 !border-rose-200" : ""
        }`}
      >
        <FiHeart fill={isFavourite ? "currentColor" : "none"} />
        {isFavourite ? "Favourited" : "Favourite"}
      </button>
    </div>
  );
}

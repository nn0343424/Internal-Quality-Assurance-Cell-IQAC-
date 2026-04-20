import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function AuditorReview() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [reviewStatus, setReviewStatus] = useState("");
  const [comment, setComment] = useState("");

  const { facultyId } = useParams();

  useEffect(() => {
    fetchDocs();
  }, [facultyId]);

  const fetchDocs = async () => {
    try {
      setLoading(true);

      const res = facultyId
        ? await API.get(`/auditor/documents/faculty/${facultyId}`)
        : await API.get("/auditor/new-documents");

      setDocs(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (doc, status) => {
    setSelectedDoc(doc);
    setReviewStatus(status);
    setComment("");
  };

  const submitReview = async () => {
    if (!comment.trim()) {
      toast.error("Comment is required");
      return;
    }

    try {
      await API.post(`/auditor/new-review-document/${selectedDoc._id}`, {
        status: reviewStatus,
        comment,
      });

      toast.success("Review submitted");
      setSelectedDoc(null);
      fetchDocs();
    } catch (err) {
      console.error(err);
      toast.error("Review failed");
    }
  };

  return (
    <>
      <Navbar title="Auditor Review Panel" />

      <div className="p-6 bg-gray-100 min-h-screen">

        {loading ? (
          <div className="text-center text-gray-600 py-20">
            Loading documents...
          </div>
        ) : docs.length === 0 ? (
          <div className="text-center text-gray-500">
            No documents found
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-4">

            {docs.map((doc) => (
              <div
                key={doc._id}
                className="bg-white p-5 rounded-xl shadow flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-700">
                    {doc.documentType}
                  </h3>

                  <StatusBadge status={doc.status} />
                </div>

                <div className="text-sm text-gray-600">
                  <p><b>Faculty:</b> {doc.faculty?.name || "N/A"}</p>
                  <p><b>Email:</b> {doc.faculty?.email || "N/A"}</p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() =>
                      window.open(
                        `https://docs.google.com/gview?url=${doc.fileUrl}&embedded=true`,
                        "_blank"
                      )
                    }
                    className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                  >
                    View PDF
                  </button>

                  <button
                    disabled={doc.status !== "Submitted"}
                    onClick={() => openModal(doc, "Verified")}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded disabled:bg-gray-300"
                  >
                    Approve
                  </button>

                  <button
                    disabled={doc.status !== "Submitted"}
                    onClick={() => openModal(doc, "Needs Correction")}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded disabled:bg-gray-300"
                  >
                    Reject
                  </button>
                </div>

                {doc.auditorComment && (
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <b>Comment:</b> {doc.auditorComment}
                  </div>
                )}
              </div>
            ))}

          </div>
        )}

        {/* 🔹 Modal */}
        {selectedDoc && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">

              <h3 className="text-lg font-semibold mb-3">
                Add Review Comment
              </h3>

              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter comment..."
                className="w-full border p-2 rounded mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={submitReview}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
}

/* 🔹 Status Badge */
function StatusBadge({ status }) {
  let style = "bg-orange-100 text-orange-600";

  if (status === "Verified") {
    style = "bg-green-100 text-green-700";
  } else if (status === "Needs Correction") {
    style = "bg-red-100 text-red-600";
  }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${style}`}>
      {status}
    </span>
  );
}
"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface FeedbackSectionProps {
  onReset: () => void
  landmarksFilename: string | null
}

export function FeedbackSection({ onReset, landmarksFilename }: FeedbackSectionProps) {
  const [feedback, setFeedback] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!landmarksFilename) {
        setError("No landmarks data available")
        setLoading(false)
        return
      }

      try {
        const response = await fetch("http://localhost:5000/generate_feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            landmarks_filename: landmarksFilename,
          }),
        })

        if (!response.ok) {
          throw new Error(`Failed to generate feedback: ${response.status}`)
        }

        const data = await response.json()
        setFeedback(data.feedback)
      } catch (err: any) {
        console.error("Error fetching feedback:", err)
        setError(err.message || "Failed to generate feedback")
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [landmarksFilename])

  // Fallback feedback items for when landmarks are not available
  const fallbackFeedbackItems = [
    {
      type: "positive",
      title: "Excellent arm positioning",
      description:
        "Your arm extensions and positions closely match the reference video, showing good control and form.",
    },
    {
      type: "improvement",
      title: "Timing adjustment needed",
      description: "Your movements are slightly behind the beat. Try to anticipate the rhythm more.",
    },
    {
      type: "positive",
      title: "Good posture",
      description: "You maintain proper posture throughout most of the routine.",
    },
    {
      type: "improvement",
      title: "Foot placement",
      description: "Your foot placement could be more precise during turns. Focus on landing positions.",
    },
  ]

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-jakarta font-medium text-[#333333] mb-3">AI Feedback</h1>
          <p className="text-[#666666]">Analyzing your performance with AI...</p>
        </motion.div>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-[#b8a2db] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#666666]">Generating personalized feedback...</p>
        </div>
      </div>
    )
  }

  if (error || !landmarksFilename) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-jakarta font-medium text-[#333333] mb-3">AI Feedback</h1>
          <p className="text-[#666666]">Here's how you can improve your performance</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#fff5f5] border border-[#e25c5c] text-[#e25c5c] p-4 rounded-lg mb-6"
          >
            <p className="font-medium">Unable to generate AI feedback</p>
            <p className="text-sm mt-1">{error}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden mb-10"
        >
          <div className="p-8 border-b border-[#f0f0f0] bg-[#f9f7fc]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-6xl font-light text-[#333333]">
                  --<span className="text-3xl">%</span>
                </div>
                <div className="text-[#666666] text-sm mt-1">Match score (unavailable)</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#f0f0f0]">
            {fallbackFeedbackItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="p-6 bg-white flex gap-4 items-start"
              >
                <div
                  className={`
                  p-2 rounded-full mt-0.5
                  ${item.type === "positive" ? "bg-[#f0f9f0] text-[#6bb86b]" : "bg-[#fff9f0] text-[#e6a23c]"}
                `}
                >
                  {item.type === "positive" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                </div>
                <div>
                  <h3
                    className={`
                    font-medium text-base mb-1
                    ${item.type === "positive" ? "text-[#6bb86b]" : "text-[#e6a23c]"}
                  `}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`
                    text-sm
                    ${item.type === "positive" ? "text-[#4d8a4d]" : "text-[#b88230]"}
                  `}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onReset}
              className="bg-[#b8a2db] hover:bg-[#a28bc9] px-10 py-3 rounded-full text-white shadow-sm"
            >
              Start New Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-jakarta font-medium text-[#333333] mb-3">AI Feedback</h1>
        <p className="text-[#666666]">Here's how you can improve your performance based on AI analysis</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-8 rounded-2xl shadow-sm mb-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-5 w-5 text-[#b8a2db]" />
          <h3 className="font-jakarta font-medium text-[#333333] text-lg">AI-Generated Feedback</h3>
        </div>

        <div className="prose prose-sm max-w-none text-[#666666] whitespace-pre-wrap">
          {feedback}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex justify-center"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onReset}
            className="bg-[#b8a2db] hover:bg-[#a28bc9] px-10 py-3 rounded-full text-white shadow-sm"
          >
            Start New Session
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

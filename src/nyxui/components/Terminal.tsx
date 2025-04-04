"use client"
import React, { useState, useEffect } from "react"
import { Terminal as TerminalIcon } from "lucide-react"

export type TerminalProps = {
  bgColor?: string;
  textColor?: string;
  command?: string;
  commandMessage?: string;
  processingSteps?: string[];
  finalMessage?: string;
  stepDelay?: number;
  icon?: React.ReactNode;
  promptSymbol?: string;
  inputPlaceholder?: string;
  outputHeight?: string;
  className?: string;
}

const InteractiveTerminal: React.FC<TerminalProps> = ({
  bgColor = "bg-gray-900",
  textColor = "text-green-400",
  command = "help",
  commandMessage = "Enter this command:",
  processingSteps = ["Processing command..."],
  finalMessage = "Command executed successfully!",
  stepDelay = 1000,
  icon = <TerminalIcon className="mr-2" />,
  promptSymbol = "$",
  inputPlaceholder = "Type your command here...",
  outputHeight = "h-80",
}) => {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step > 0 && step <= processingSteps.length) {
      setOutput((prev) => [...prev, processingSteps[step - 1]])
      const timer = setTimeout(() => setStep(step + 1), stepDelay)
      return () => clearTimeout(timer)
    } else if (step > processingSteps.length) {
      setOutput((prev) => [...prev, finalMessage])
    }
  }, [step, processingSteps, finalMessage, stepDelay])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (input === command) {
      setStep(1)
      setInput("")
    } else {
      setOutput((prev) => [...prev, `Command not recognized: ${input}`])
      setInput("")
    }
  }

  const resetTerminal = () => {
    setOutput([])
    setStep(0)
  }

  return (
      <div className={`max-w-4xl mx-auto p-3 md:p-6 ${bgColor} ${textColor} rounded-md shadow-lg font-mono`}>
        <div className="mb-4 p-2 bg-gray-800 rounded flex items-center justify-between">
          <div className="flex items-center">
            {icon}
            <span>
              {commandMessage} <strong>{command}</strong>
            </span>
          </div>
          {step > 0 && (
            <button 
              onClick={resetTerminal}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            >
              Reset
            </button>
          )}
        </div>
        <div className={`${outputHeight} mb-4 p-2 bg-black rounded overflow-y-auto`}>
          {output.map((line, index) => (
            <pre key={index} className="whitespace-pre-wrap">
              {line}
            </pre>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <span className="mr-2">{promptSymbol}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent focus:outline-none"
            placeholder={inputPlaceholder}
          />
        </form>
        <style jsx>{`
          @keyframes blink {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
          input::after {
            content: '|';
            animation: blink 1s infinite;
          }
          pre {
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
  )
}

export default InteractiveTerminal
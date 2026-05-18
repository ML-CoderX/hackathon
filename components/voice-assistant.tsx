'use client'

import { useState } from 'react'
import { Mic, Send, X } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'

export function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant'; text: string }>>([])

  const handleStartListening = () => {
    setIsListening(true)
    // Simulate speech recognition
    setTimeout(() => {
      setTranscript('Tell me about wheat farming')
      setIsListening(false)
    }, 2000)
  }

  const handleSendMessage = () => {
    if (!transcript.trim()) return

    const userMessage = { type: 'user' as const, text: transcript }
    setMessages([...messages, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Wheat farming requires well-drained loamy soil with pH 6-7. Plant in winter season for best results.',
        'Recommended crop rotation includes legumes. Water every 30-40 days during growing season.',
        'Current wheat price is ₹2,450 per quintal. You can check mandi prices for best selling opportunities.',
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { type: 'assistant', text: randomResponse }])
    }, 1000)

    setTranscript('')
  }

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="fixed bottom-6 right-6 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 z-40"
      >
        <Mic className="w-5 h-5" />
      </Button>

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-20 right-6 w-96 max-w-[calc(100vw-24px)] border-border shadow-xl z-40">
          <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center rounded-t-lg">
            <h3 className="font-semibold">Farm Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="opacity-80 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-card">
            {messages.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Ask me anything about farming, crops, or market prices
              </p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-secondary text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 bg-card rounded-b-lg">
            {transcript && (
              <p className="text-sm text-muted-foreground mb-2 p-2 bg-secondary/40 rounded">
                {transcript}
              </p>
            )}
            <div className="flex gap-2">
              <Button
                onClick={handleStartListening}
                disabled={isListening}
                variant={isListening ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
              >
                <Mic className="w-4 h-4 mr-1" />
                {isListening ? 'Listening...' : 'Record'}
              </Button>
              <Button onClick={handleSendMessage} size="sm" className="flex-1 bg-primary text-primary-foreground">
                <Send className="w-4 h-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

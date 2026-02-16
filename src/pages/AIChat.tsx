import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Trash2, Bot, User } from "lucide-react";
import { getGreeting, getAIResponse } from "@/lib/ai-chat";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  time: string;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: getGreeting(), sender: "bot", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { id: crypto.randomUUID(), text: input, sender: "user", time: now };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = { id: crypto.randomUUID(), text: getAIResponse(input), sender: "bot", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">AI Wellness Coach</h1>
        <p className="text-muted-foreground">Ask me about nutrition, exercise, BMI, sleep, and more!</p>
      </div>

      <Card className="shadow-lg h-[600px] flex flex-col">
        <CardHeader className="flex-row items-center justify-between border-b py-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="h-8 w-8 rounded-full gradient-wellness flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            Wellness Coach
            <span className="h-2 w-2 rounded-full bg-success" />
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setMessages([{ id: "1", text: getGreeting(), sender: "bot", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }])}>
            <Trash2 className="h-4 w-4 mr-1" /> Clear
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(m => (
            <div key={m.id} className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              {m.sender === "bot" && (
                <div className="h-7 w-7 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-1">
                  <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.sender === "user"
                  ? "gradient-primary text-primary-foreground rounded-br-md"
                  : "bg-muted rounded-bl-md"
              }`}>
                <p>{m.text}</p>
                <span className={`text-[10px] mt-1 block ${m.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</span>
              </div>
              {m.sender === "user" && (
                <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </CardContent>

        <div className="border-t p-3 flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask about health, nutrition, exercise..."
            className="flex-1"
          />
          <Button onClick={send} className="gradient-primary text-primary-foreground">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

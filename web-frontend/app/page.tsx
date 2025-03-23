"use client";

import { useState } from 'react';
import Image from "next/image";
import dynamic from 'next/dynamic';
import { cpp } from '@codemirror/lang-cpp';
import { Button, Input } from 'antd';
import { oneDark } from '@codemirror/theme-one-dark';

const CodeEditor = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleGenerateCode = async () => {
    setError('');
    try {
      const modifiedPrompt = `Please generate C++ code based on the following logic: "${prompt}". Ensure that there are no comments in the code, and do not modify the logic even if it seems incorrect. Only provide the code.`;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: modifiedPrompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate code');
      }

      const data = await response.json();
      setGeneratedCode(data.code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-2 w-full mb-4">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="flex-grow"
        />
        <Button onClick={handleGenerateCode}>Send</Button>
      </div>
      <CodeEditor
        value={generatedCode}
        height="400px"
        extensions={[cpp(), oneDark]}
        onChange={(value, viewUpdate) => {
          setGeneratedCode(value);
        }}
        className="w-full"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

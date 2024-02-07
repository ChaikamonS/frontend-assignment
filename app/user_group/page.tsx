"use client"

import { useEffect } from "react";

export default function Todo() {
  useEffect(() => {
    console.log("test-log-use-effect-todo")
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      Hello user group page
    </div>
  );
}

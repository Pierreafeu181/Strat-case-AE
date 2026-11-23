"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IcCheck } from "./Icons";

export type Notify = (message: string) => void;

/** One toast at a time. Every message is a demo notice: nothing is sent anywhere. */
export function useToast() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback<Notify>((message) => {
    if (timer.current) clearTimeout(timer.current);
    setMsg(message);
    setShow(true);
    timer.current = setTimeout(() => setShow(false), 2600);
  }, []);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const node = (
    <div className={`toast${show ? " show" : ""}`} role="status" aria-live="polite">
      <IcCheck />
      <span>
        <b>Demo only</b> · {msg}
      </span>
    </div>
  );
  return { notify, node };
}
